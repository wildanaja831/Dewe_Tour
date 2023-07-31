package models

import "time"

type Trip struct {
	ID             int       `json:"id"`
	Title          string    `json:"title" gorm:"type: varchar(255)"`
	CountryID      int       `json:"country_id" gorm:"type: int"`
	Country        Country   `json:"country" gorm:"foreignKey:CountryID"`
	Accomodation   string    `json:"accomodation" gorm:"type: varchar(255)"`
	Transportation string    `json:"transportation" gorm:"type: varchar(255)"`
	Eat            string    `json:"eat" gorm:"type: varchar(255)"`
	Day            int       `json:"day" gorm:"type: int"`
	Night          int       `json:"night" gorm:"type: int"`
	DateTrip       string    `json:"dateTrip" gorm:"type: varchar(255)"`
	Price          int       `json:"price" gorm:"type: int"`
	Quota          int       `json:"quota" gorm:"type: int"`
	Description    string    `json:"description" gorm:"type: varchar(255)"`
	Image          string    `json:"image" gorm:"type: varchar(255)"`
	Income int `json:"income" gorm :"type: int"`
	TotalBuyer int `json:"total_buyer" gorm :"type: int"`
	CreatedAt      time.Time `json:"-"`
	UpdateAt       time.Time `json:"-"`
}
