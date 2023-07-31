package database

import (
	"dewe-tour/models"
	"dewe-tour/pkg/mysql"
	"fmt"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Country{},
		&models.Trip{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed!!")
	}

	fmt.Println("Migration Succes!!")
}
