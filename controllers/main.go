package controllers

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

// Home goes to index.html file from ./../dist
func (c *MainController) Home() {
	c.TplName = "index.html"
}
