package tripdto

type TripRequest struct {
	Title          string `json:"title" form:"title" validate:"required"`
	CountryID      int    `json:"country_id" form:"country_id" validate:"required"`
	Accomodation   string `json:"accomodation" form:"accomodation" validate:"required"`
	Transportation string `json:"transportation" form:"transportation" validate:"required"`
	Eat            string `json:"eat" form:"eat" validate:"required"`
	Day            int    `json:"day" form:"day" validate:"required"`
	Night          int    `json:"night" form:"night" validate:"required"`
	DateTrip       string `json:"dateTrip" form:"dateTrip" validate:"required"`
	Price          int    `json:"price" form:"price" validate:"required"`
	Quota          int    `json:"quota" form:"quota" validate:"required"`
	Description    string `json:"description" form:"description" validate:"required"`
	Image          string `json:"image" form:"image" validate:"required"`
}

type TripResponse struct {
	Title          string `json:"title"`
	CountryID      int    `json:"country_id"`
	Accomodation   string `json:"accomodation"`
	Transportation string `json:"transportation"`
	Eat            string `json:"eat"`
	Day            int    `json:"day"`
	Night          int    `json:"night"`
	DateTrip       string `json:"dateTrip"`
	Price          int    `json:"price"`
	Quota          int    `json:"quota"`
	Description    string `json:"description"`
	Image          string `json:"image"`
}
