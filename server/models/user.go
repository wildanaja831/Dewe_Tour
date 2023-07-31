package models

import "time"

type User struct {
	ID        int       `json:"id"`
	Fullname  string    `json:"fullname" gorm:"type: varchar(255)"`
	Email     string    `json:"email" gorm:"type: varchar(255)"`
	Password  string    `json:"password" gorm:"type: varchar(255)"`
	Phone     string    `json:"phone" gorm:"type: varchar(255)"`
	Address   string    `json:"address" gorm:"type: varchar(255)"`
	Gender string `json:"gender" gorm:"type: varchar(255)"`
	Role      string    `json:"role" gorm:"default:'user'"`
	Image     string    `json:"image" gorm:"default:'https://res.cloudinary.com/dpffqxdty/image/upload/v1690365096/dumbmerch/Default-Profile-Icon.png'"`
	CreatedAt time.Time `json:"-"`
	UpdateAt  time.Time `json:"-"`
}

type UserTransaction struct {
	ID        int       `json:"-"`
	Fullname  string    `json:"fullname"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Address   string    `json:"address"`
	Gender string `json:"gender"`
}

func (UserTransaction) TableName() string {
	return "users"
}