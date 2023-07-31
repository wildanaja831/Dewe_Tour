package models

type Transaction struct {
	ID         int             `json:"id"`
	CounterQty int             `json:"counterQty" gorm:"type: int"`
	Total      int             `json:"total" gorm:"type: int"`
	Status     string          `json:"status" gorm:"default:'Waiting Payment'"`
	TripId     int             `json:"-" gorm:"type: int"`
	Trip       Trip            `json:"trip" gorm:"foreignKey:TripId"`
	UserId     int             `json:"-" form:"user_id"`
	User       UserTransaction `json:"user" gorm:"foreignKey:UserId`
}
