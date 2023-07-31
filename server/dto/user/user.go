package userdto

type UserResponse struct {
	ID int `json:"id"`
}

type UpdateProfileRequest struct {
	Image string `json:"image" form:"image" validate:"required"`
}
