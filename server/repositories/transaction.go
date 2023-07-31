package repositories

import (
	"dewe-tour/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTranscation(transaction models.Transaction) (models.Transaction, error)
	FindTransaction() ([]models.Transaction, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
	GetTransactionById(ID int) (models.Transaction, error)
	MyTransaction(ID int) ([]models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTranscation(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Preload("Trip").Preload("Trip.Country").Preload("User").First(&transaction).Error

	return transaction, err
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Trip").Preload("Trip.Country").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransactionById(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Trip").Preload("Trip.Country").Preload("User").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) MyTransaction(ID int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Where("user_id=?", ID).Preload("Trip").Preload("Trip.Country").Preload("User").Find(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.First(&transaction, orderId)

	if status != transaction.Status && status == "Approve" {
		r.db.First(&transaction, transaction.ID)
	}
	transaction.Status = status
	err := r.db.Save(&transaction).Error

	return transaction, err
}