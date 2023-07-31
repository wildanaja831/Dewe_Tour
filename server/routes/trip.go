package routes

import (
	"dewe-tour/handlers"
	"dewe-tour/pkg/middleware"
	"dewe-tour/pkg/mysql"
	"dewe-tour/repositories"

	"github.com/labstack/echo/v4"
)

func TripRoutes(e *echo.Group) {
	tripRepository := repositories.RepositoryTrip(mysql.DB)
	h := handlers.HandlerTrip(tripRepository)

	e.GET("/trips", h.FindTrip)
	e.GET("/trip/:id", h.GetTripById)
	e.GET("/trip", h.FilterTrip)
	e.POST("/trip", middleware.UploadFile(h.CreateTrip))
	e.PATCH("/trip/:id", middleware.UploadFile(h.EditTrip))
	e.DELETE("/trip/:id", h.DeleteTrip)
}
