package routes

import (
	"dewe-tour/handlers"
	"dewe-tour/pkg/mysql"
	"dewe-tour/repositories"

	"github.com/labstack/echo/v4"
)

func CountryRoutes(e *echo.Group) {
	countryRepository := repositories.RepositoryCountry(mysql.DB)
	h := handlers.HandlerCountry(countryRepository)

	e.GET("/country", h.FindCountry)
	e.GET("/country/:id", h.GetCountryById)
	e.POST("/country", h.CreateCountry)
	e.PATCH("/country/:id", h.UpdateCountry)
	e.DELETE("/country/:id", h.DeleteCountry)
}
