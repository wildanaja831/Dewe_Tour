package resultdto

type ErrorResult struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type SuccesResult struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}
