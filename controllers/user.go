package controllers

import (
	"beego-vuejs-starter-kit/models"
	"encoding/json"
	"log"
	"strconv"

	"github.com/astaxie/beego"
)

type UserController struct {
	beego.Controller
}

// GetUsers returns a list of users
func (c *UserController) GetUsers() {
	c.Data["json"] = models.GetUsers()
	c.ServeJSON()
}

// GetUser returns a user by id
func (c *UserController) GetUser() {
	ID := c.Ctx.Input.Param(":id")

	userID, err := strconv.Atoi(ID)

	if err != nil {
		log.Fatal("UserID error")
	}

	c.Data["json"] = models.GetUser(userID)
	c.ServeJSON()
}

// AddUser adds a new user
func (c *UserController) AddUser() {
	var user models.User
	json.Unmarshal(c.Ctx.Input.RequestBody, &user)
	c.Data["json"] = models.AddUser(&user)
	c.ServeJSON()
}

// UpdateUser updates existing user by id
func (c *UserController) UpdateUser() {
	var user models.User
	json.Unmarshal(c.Ctx.Input.RequestBody, &user)
	c.Data["json"] = models.UpdateUser(&user)
	c.ServeJSON()
}

// DeleteUser deletes existing user by id
func (c *UserController) DeleteUser() {
	ID := c.Ctx.Input.Param(":id")

	userID, err := strconv.Atoi(ID)

	if err != nil {
		log.Fatal("UserID error")
	}

	if models.DeleteUser(userID) {
		c.Abort("204")
	}

	c.Abort("404")
}
