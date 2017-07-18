package main


//MissingFieldError is an error for missing fields
type MissingFieldError struct{
  s string
}

func (e MissingFieldError) Error() string{
  return "'" + e.s + "' field is required."
}

//InvalidFieldError is an error for invalid fields
type InvalidFieldError struct{
  s string
}

func (e InvalidFieldError) Error() string{
  return "Invalid field " + e.s
}
