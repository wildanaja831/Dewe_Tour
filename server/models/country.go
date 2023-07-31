package models

import "time"

type Country struct {
	ID        int       `json:"id"`
	Name      string    `json:"name" gorm:"type: varchar(255)"`
	CreatedAt time.Time `json:"-"`
	UpdateAt  time.Time `json:"-"`
}
