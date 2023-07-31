package routes

import (
	"dewe-tour/handlers"
	"dewe-tour/pkg/middleware"
	"dewe-tour/pkg/mysql"
	"dewe-tour/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	tripRepository := repositories.RepositoryTrip(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository, tripRepository)

	e.GET("/transactions", h.FindTransaction)
	e.GET("/transaction/:id", h.GetTransactionById)
	e.GET("/my-transaction", middleware.Auth(h.MyTransaction))
	e.GET("/getpayment/:id", h.GetPayment)
	e.POST("/notification", h.Notification)
	e.POST("/transaction", middleware.Auth(h.CreateTranscation))
}
