package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	CountryRoutes(e)
	AuthRoutes(e)
	UserRoutes(e)
	TripRoutes(e)
	TransactionRoutes(e)
}
