package repositories

import (
	"dewe-tour/models"

	"gorm.io/gorm"
)

type TripRepository interface {
	CreateTrip(trip models.Trip) (models.Trip, error)
	GetTripById(ID int) (models.Trip, error)
	EditTrip(trip models.Trip) (models.Trip, error)
	DeleteTrip(trip models.Trip) (models.Trip, error)
	FilterTrip(countryId int) ([]models.Trip, error)
	FindTrip() ([]models.Trip, error)
	GetCoutryByName(country string) (models.Country, error)
}

func RepositoryTrip(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Create(&trip).Preload("Country").First(&trip).Error

	return trip, err
}

func (r *repository) FindTrip() ([]models.Trip, error) {
	var trip []models.Trip
	err := r.db.Preload("Country").Find(&trip).Error

	return trip, err
}

func (r *repository) GetTripById(ID int) (models.Trip, error) {
	var trip models.Trip
	err := r.db.Preload("Country").First(&trip, ID).Error

	return trip, err
}

func (r *repository) EditTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Preload("Country").Save(&trip).Error

	return trip, err
}

func (r *repository) DeleteTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Delete(&trip).Scan(&trip).Error

	return trip, err
}

func (r *repository) FilterTrip(countryId int) ([]models.Trip, error) {
	var trips []models.Trip
	err := r.db.Where("country_id=?", countryId).Preload("Country").Find(&trips).Error

	return trips, err
}

func (r *repository) GetCoutryByName(country string) (models.Country, error){
	var countrys models.Country
	err := r.db.Where("name=?", country).First(&countrys).Error

	return countrys, err
}
