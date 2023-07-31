package handlers

import (
	resultdto "dewe-tour/dto/result"
	transactiondto "dewe-tour/dto/transaction"
	"dewe-tour/models"
	"dewe-tour/repositories"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
	TripRepository        repositories.TripRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository, TripRepository repositories.TripRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository, TripRepository}
}

func (h *handlerTransaction) FindTransaction(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindTransaction()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Get All Transaction Success", Data: transactions})
}

func (h *handlerTransaction) GetTransactionById(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid ID! Please input id as number."})
	}

	transactions, err := h.TransactionRepository.GetTransactionById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Get Transaction By ID Success", Data: transactions})
}

func (h *handlerTransaction) MyTransaction(c echo.Context) error {
	transaction := c.Get("userLogin")
	transactionId := transaction.(jwt.MapClaims)["id"].(float64) 

	transactions, err := h.TransactionRepository.MyTransaction(int(transactionId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Get Transaction By ID Success", Data: transactions})
}

func (h *handlerTransaction) CreateTranscation(c echo.Context) error {
	userId := c.Get("userLogin")
	id := userId.(jwt.MapClaims)["id"].(float64)
	counterQty, _ := strconv.Atoi(c.FormValue("counterQty"))
	tripId, _ := strconv.Atoi(c.FormValue("trip_id"))

	request := transactiondto.CreateTransactionRequest {
		CounterQty: counterQty,
		TripId: tripId,
	}

	var transactionIsMatch = false
	var transactionsId int
	for !transactionIsMatch {
	transactionsId = int(time.Now().Unix())
	transactionData, _ := h.TransactionRepository.GetTransactionById(transactionsId)
	if transactionData.ID == 0 {
		transactionIsMatch = true
	}
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	trip, _ := h.TripRepository.GetTripById(request.TripId)
	total := request.CounterQty * trip.Price

	transaction := models.Transaction{
		ID: transactionsId,
		CounterQty: request.CounterQty,
		Total:      total,
		TripId:     request.TripId,
		UserId: int(id),
	}

	data, err := h.TransactionRepository.CreateTranscation(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: data})
}

func (h *handlerTransaction) GetPayment(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransactionById(id)
	fmt.Println(transaction)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(transaction.ID),
			GrossAmt: int64(transaction.Trip.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: transaction.User.Fullname,
			Email: transaction.User.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)
	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: snapResp})
}

func (h *handlerTransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_Id, _ := strconv.Atoi(orderId)

	transaction, err := h.TransactionRepository.GetTransactionById(order_Id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	trip, err := h.TripRepository.GetTripById(transaction.TripId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	trip.Income = trip.Income + transaction.Total
	trip.TotalBuyer = trip.TotalBuyer + transaction.CounterQty

	fmt.Println("ini payload maszehh", notificationPayload)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			h.TransactionRepository.UpdateTransaction("Waiting Payment", order_Id)
		} else if fraudStatus == "accept" {
			SendMail("Approve", transaction)
			h.TransactionRepository.UpdateTransaction("Approve", order_Id)
		}
	} else if transactionStatus == "settlement" {
		SendMail("Approve", transaction)
		h.TransactionRepository.UpdateTransaction("Approve", order_Id)
	} else if transactionStatus == "deny" {
		h.TransactionRepository.UpdateTransaction("Failed", order_Id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		h.TransactionRepository.UpdateTransaction("Failed", order_Id)
	} else if transactionStatus == "Waiting Payment" {
		h.TransactionRepository.UpdateTransaction("Fending", order_Id)
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: notificationPayload})
}

func SendMail(status string, transaction models.Transaction) {

	if status != transaction.Status && (status == "Approve") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "Dewe Tour <dewe.tour@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var ticket = strconv.Itoa(transaction.ID)
		var price = strconv.Itoa(transaction.Trip.Price)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
		<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
		  h1 {
		  color: brown;
		  }
		</style>
		</head>
		<body>
		<h2>Product payment :</h2>
		<ul style="list-style-type:none;">
		  <li>Name : %s</li>
		  <li>Total payment: Rp.%s</li>
		  <li>Status : <b>%s</b></li>
		</ul>
		</body>
	  </html>`, ticket, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.User.Email)
	}
}