package errors

//CustomError is the base for all other CustomError types
type CustomError struct {
	Message string
}

//MissingFieldError is an error for missing fields
type MissingFieldError CustomError

func (e MissingFieldError) Error() string {
	return "'" + e.Message + "' field is required."
}

//InvalidFieldError is an error for invalid fields
type InvalidFieldError CustomError

func (e InvalidFieldError) Error() string {
	return "Invalid field " + e.Message
}
