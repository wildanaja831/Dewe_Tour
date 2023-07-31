package repositories

import (
	"dewe-tour/models"

	"gorm.io/gorm"
)

type CountryRepository interface {
	CreateCountry(country models.Country) (models.Country, error)
	UpdateCountry(country models.Country) (models.Country, error)
	DeleteCountry(country models.Country) (models.Country, error)
	FindCountry() ([]models.Country, error)
	GetCountryById(ID int) (models.Country, error)
}

func RepositoryCountry(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateCountry(country models.Country) (models.Country, error) {
	err := r.db.Create(&country).Error

	return country, err
}

func (r *repository) FindCountry() ([]models.Country, error) {
	var countries []models.Country
	err := r.db.Find(&countries).Error

	return countries, err
}

func (r *repository) GetCountryById(ID int) (models.Country, error) {
	var countries models.Country
	err := r.db.First(&countries, ID).Error

	return countries, err
}

func (r *repository) UpdateCountry(country models.Country) (models.Country, error) {
	err := r.db.Save(&country).Error

	return country, err
}

func (r *repository) DeleteCountry(country models.Country) (models.Country, error) {
	err := r.db.Delete(&country).Scan(&country).Error

	return country, err
}
