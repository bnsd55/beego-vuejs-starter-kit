package main

import (
	_ "beego-vuejs-starter-kit/routers"

	"github.com/astaxie/beego"
)

func main() {
	beego.BConfig.WebConfig.ViewsPath = "dist"
	beego.Run()
}
