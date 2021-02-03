package db

import (
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

func NewFirebaseFirestore(ctx context.Context, path string) (*firestore.Client, error) {
	sa := option.WithCredentialsFile(path)
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		return nil, err
	}

	return app.Firestore(ctx)
}
