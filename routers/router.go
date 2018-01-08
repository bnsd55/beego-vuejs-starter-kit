package routers

import (
	"beego-vuejs-starter-kit/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.DelStaticPath("/static")
	beego.SetStaticPath("//", "dist")

	// /api namespace
	apiNS := beego.NewNamespace("/api",

		// Handle user requests
		beego.NSRouter("/users", &controllers.UserController{}, "get:GetUsers"),
		beego.NSRouter("/users/:id([0-9]+)", &controllers.UserController{}, "get:GetUser"),
		beego.NSRouter("/users", &controllers.UserController{}, "post:AddUser"),
		beego.NSRouter("/users", &controllers.UserController{}, "put:UpdateUser"),
		beego.NSRouter("/users/:id([0-9]+)", &controllers.UserController{}, "delete:DeleteUser"),
	)

	beego.AddNamespace(apiNS)
}
