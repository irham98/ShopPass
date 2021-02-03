package main

import (
	"context"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/indomie-syndicate/ultra-hackathon/shop-pass/internal/logic"
	"net/http"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func GetUser(ctx context.Context, handler *logic.Handler) func(c *gin.Context) {
	return func(c *gin.Context) {
		query := c.Request.URL.Query()
		id := query.Get("id")
		user, err := handler.GetUser(ctx, id)
		if err != nil {
			c.String(http.StatusInternalServerError, err.Error())
			return
		}
		c.JSON(http.StatusOK, user)
	}
}

func GetSeason(ctx context.Context, handler *logic.Handler) func(c *gin.Context) {
	return func(c *gin.Context) {
		query := c.Request.URL.Query()
		id := query.Get("id")
		season, err := handler.GetSeason(ctx, id)
		if err != nil {
			c.String(http.StatusInternalServerError, err.Error())
			return
		}
		c.JSON(http.StatusOK, season)
	}
}

type Signal struct {
	Command int             `json:"cmd"`
	Payload json.RawMessage `json:"payload"`
}

func PushSignal(ctx context.Context, handler *logic.Handler) func(c *gin.Context) {
	return func(c *gin.Context) {
		var signal Signal
		err := c.BindJSON(&signal)
		if err != nil {
			c.String(http.StatusBadRequest, err.Error())
			return
		}
		err = handler.HandleCommand(ctx, signal.Command, signal.Payload)
		if err != nil {
			c.String(http.StatusInternalServerError, err.Error())
			return
		}
		c.Status(http.StatusOK)
	}
}
