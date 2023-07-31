package handlers

import (
	"context"
	resultdto "dewe-tour/dto/result"
	tripdto "dewe-tour/dto/trip"
	"dewe-tour/models"
	"dewe-tour/repositories"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerTrip struct {
	TripRepository repositories.TripRepository
}

func HandlerTrip(TripRepository repositories.TripRepository) *handlerTrip {
	return &handlerTrip{TripRepository}
}

func (h *handlerTrip) FindTrip(c echo.Context) error {
	trips, err := h.TripRepository.FindTrip()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range trips {
		imagePath := os.Getenv("PATH_FILE") + p.Image
		trips[i].Image = imagePath
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: trips})
}

func (h *handlerTrip) GetTripById(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid ID! Please input id as number."})
	}

	trips, err := h.TripRepository.GetTripById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	trips.Image = os.Getenv("PATH_FILE") + trips.Image

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: trips})
}

func (h *handlerTrip) EditTrip(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid ID! Please input id as number."})
	}

	countryId, _ := strconv.Atoi(c.FormValue("country_id"))
	day, _ := strconv.Atoi(c.FormValue("day"))
	night, _ := strconv.Atoi(c.FormValue("night"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	quota, _ := strconv.Atoi(c.FormValue("quota"))
	dataFile := c.Get("dataFile").(string)

	request := tripdto.TripRequest{
		Title:          c.FormValue("title"),
		CountryID:      countryId,
		Accomodation:   c.FormValue("accomodation"),
		Transportation: c.FormValue("transportation"),
		Eat:            c.FormValue("eat"),
		Day:            day,
		Night:          night,
		DateTrip:       c.FormValue("dateTrip"),
		Price:          price,
		Quota:          quota,
		Description:    c.FormValue("description"),
		Image:          dataFile,
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	trips, err := h.TripRepository.GetTripById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "dumbmerch"})

	if err != nil {
		fmt.Println(err.Error())
	}

	if request.Title != "" {
		trips.Title = request.Title
	}

	if request.CountryID != 0 {
		trips.CountryID = request.CountryID
	}

	if request.Accomodation != "" {
		trips.Accomodation = request.Accomodation
	}

	if request.Transportation != "" {
		trips.Transportation = request.Transportation
	}

	if request.Eat != "" {
		trips.Eat = request.Eat
	}

	if request.Day != 0 {
		trips.Day = request.Day
	}

	if request.Night != 0 {
		trips.Night = request.Night
	}

	if request.DateTrip != "" {
		trips.DateTrip = request.DateTrip
	}

	if request.Price != 0 {
		trips.Price = request.Price
	}

	if request.Quota != 0 {
		trips.Quota = request.Quota
	}

	if request.Description != "" {
		trips.Description = request.Description
	}

	if request.Image != "" {
		trips.Image = resp.SecureURL
	}

	data, err := h.TripRepository.EditTrip(trips)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: data})
}

func (h *handlerTrip) CreateTrip(c echo.Context) error {
	countryId, _ := strconv.Atoi(c.FormValue("country_id"))
	day, _ := strconv.Atoi(c.FormValue("day"))
	night, _ := strconv.Atoi(c.FormValue("night"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	quota, _ := strconv.Atoi(c.FormValue("quota"))
	dataFile := c.Get("dataFile").(string)

	request := tripdto.TripRequest{
		Title:          c.FormValue("title"),
		CountryID:      countryId,
		Accomodation:   c.FormValue("accomodation"),
		Transportation: c.FormValue("transportation"),
		Eat:            c.FormValue("eat"),
		Day:            day,
		Night:          night,
		DateTrip:       c.FormValue("dateTrip"),
		Price:          price,
		Quota:          quota,
		Description:    c.FormValue("description"),
		Image:          dataFile,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "dumbmerch"})
	if err != nil {
		fmt.Println(err.Error())
	}

	trips := models.Trip{
		Title:          request.Title,
		CountryID:      request.CountryID,
		Accomodation:   request.Accomodation,
		Transportation: request.Transportation,
		Eat:            request.Eat,
		Day:            request.Day,
		Night:          request.Night,
		DateTrip:       request.DateTrip,
		Price:          request.Price,
		Quota:          request.Quota,
		Description:    request.Description,
		Image:          resp.SecureURL,
	}

	data, err := h.TripRepository.CreateTrip(trips)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: convertCreateTrip(data)})
}

func (h *handlerTrip) DeleteTrip(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid ID! Please input id as number."})
	}

	station, err := h.TripRepository.GetTripById(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TripRepository.DeleteTrip(station)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: data})
}

func (h *handlerTrip) FilterTrip(c echo.Context) error {
	country := c.QueryParam("country")

	countrys, err := h.TripRepository.GetCoutryByName(country)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	data, err := h.TripRepository.FilterTrip(countrys.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccesResult{Status: "Success", Data: data})
}

func convertCreateTrip(t models.Trip) tripdto.TripResponse {
	return tripdto.TripResponse{
		Title:          t.Title,
		CountryID:      t.CountryID,
		Accomodation:   t.Accomodation,
		Transportation: t.Transportation,
		Eat:            t.Eat,
		Day:            t.Day,
		Night:          t.Night,
		DateTrip:       t.DateTrip,
		Price:          t.Price,
		Quota:          t.Quota,
		Description:    t.Description,
		Image:          t.Image,
	}
}
