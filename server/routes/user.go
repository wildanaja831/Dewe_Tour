package routes

import (
	"dewe-tour/handlers"
	"dewe-tour/pkg/middleware"
	"dewe-tour/pkg/mysql"
	"dewe-tour/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	UserRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(UserRepository)

	e.GET("/users", h.FindUser)
	e.GET("/user/:id", h.GetUserById)
	e.GET("/myUser", middleware.Auth(h.GetMyUser))
	e.DELETE("/user/:id", h.DeleteUser)
	e.PATCH("/edit-user", middleware.Auth(middleware.UploadFile(h.UpdateProfile)))
}
