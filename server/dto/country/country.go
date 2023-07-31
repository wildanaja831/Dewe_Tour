package countrydto

type CreateCountry struct {
	Name string `json:"name" form:"name" validator:"required"`
}

type CountryResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
