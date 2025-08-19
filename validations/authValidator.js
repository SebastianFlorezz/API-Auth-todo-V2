const patterns = {
    name: /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
    email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
}

const errorMessages = {
    name: "Name must contain only letters, spaces, hyphens, and apostrophes",
    email: "Please enter a valid email address",
    password: "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
}


const validators = {
    name: (name) => patterns.name.test(name),
    email: (email) => patterns.email.test(email),
    password: (password) => patterns.password.test(password)
}

const validate = (field, value) => {
  if (!validators[field](value)) {
    return { isValid: false, message: errorMessages[field] }
  }
  return { isValid: true }
}

const validateName = (name) => validate('name', name)
const validateEmail = (email) => validate('email', email)
const validatePassword = (password) => validate('password', password)


module.exports = {
  validate,
  validateName,
  validateEmail,
  validatePassword
}