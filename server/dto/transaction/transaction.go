package transactiondto

type CreateTransactionRequest struct {
	CounterQty int `json:"counterQty"`
	TripId     int `json:"tripId"`
}
