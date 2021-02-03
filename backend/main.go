package main

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/indomie-syndicate/ultra-hackathon/shop-pass/internal/db"
	"github.com/indomie-syndicate/ultra-hackathon/shop-pass/internal/logic"
	"log"
	"os"
)

func main() {
	ctx := context.Background()

	client, err := db.NewFirebaseFirestore(ctx, "./res/shoppass-firebase.json")
	exitOnErr(err)

	defer func() {
		err := client.Close()
		exitOnErr(err)
	}()

	userRepo := db.NewUserRepository(client)
	seasonRepo := db.NewSeasonRepository(client)

	handler := logic.NewHandler(userRepo, seasonRepo)

	err = handler.StartSeason(ctx)
	exitOnErr(err)

	app := gin.New()
	app.Use(CORSMiddleware())
	app.Use(gin.Logger())

	app.GET("/season", GetSeason(ctx, handler))
	user := app.Group("/user")
	{
		user.GET("/data", GetUser(ctx, handler))
		user.POST("/push", PushSignal(ctx, handler))
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	err = app.Run(fmt.Sprintf("%v", port))
	exitOnErr(err)
}

func exitOnErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
