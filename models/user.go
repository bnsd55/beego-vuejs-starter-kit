package models

// User represents user
type User struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Gender    string `json:"gender"`
	Email     string `json:"email"`
}

var users []*User

func init() {
	users = append(users, &User{
		ID:        153634,
		FirstName: "Hmid",
		LastName:  "Hamidi",
		Email:     "Ben@gmail.com",
		Gender:    "Female",
	}, &User{
		ID:        345352,
		FirstName: "Omer",
		LastName:  "Hanina",
		Email:     "Omer@gmail.com",
		Gender:    "Male",
	}, &User{
		ID:        744353,
		FirstName: "Noam",
		LastName:  "Manyfler",
		Email:     "Noam@gmail.com",
		Gender:    "Male",
	}, &User{
		ID:        445733,
		FirstName: "Maor",
		LastName:  "Tambal",
		Email:     "Maor@gmail.com",
		Gender:    "Female",
	}, &User{
		ID:        224545,
		FirstName: "Or",
		LastName:  "Daniel",
		Email:     "Or@gmail.com",
		Gender:    "Female",
	})
}

// GetUsers returns all users
func GetUsers() []*User {
	return users
}

// GetUser returns user
// @returns a specific user by id
func GetUser(userID int) *User {

	for _, user := range users {
		if user.ID == userID {
			return user
		}
	}

	return nil
}

// AddUser adds a new user to the list
// @returns pointer to a user object if user was added successfully otherwise null
func AddUser(user *User) *User {
	users = append(users, user)

	return user
}

// UpdateUser updates a specific user
// @returns pointer to a updated user if user was updated successfully otherwise null
func UpdateUser(user *User) *User {

	for _, currentUser := range users {
		if currentUser.ID == user.ID {
			currentUser = user
			return currentUser
		}
	}

	return nil
}

// DeleteUser deletes a specific user by id
// @returns true if user was deleted successfully otherwise false
func DeleteUser(userID int) bool {
	user := GetUser(userID)

	for _, currentUser := range users {
		if currentUser.ID == user.ID {
			currentUser = nil
			return true
		}
	}

	return false
}
