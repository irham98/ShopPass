package db

import (
	"cloud.google.com/go/firestore"
	"context"
	"github.com/indomie-syndicate/ultra-hackathon/shop-pass/internal/definition"
	"time"
)

type (
	UserRepository struct {
		client     *firestore.Client
		collection string
	}

	SeasonRepository struct {
		client     *firestore.Client
		collection string
	}
)

func NewUserRepository(client *firestore.Client) *UserRepository {
	return &UserRepository{
		client:     client,
		collection: "users",
	}
}

func NewSeasonRepository(client *firestore.Client) *SeasonRepository {
	return &SeasonRepository{
		client:     client,
		collection: "seasons",
	}
}

func (r *UserRepository) GetUserData(ctx context.Context, userId string) (*definition.User, error) {
	dsnap, err := r.client.Collection(r.collection).Doc(userId).Get(ctx)
	if err != nil {

		return nil, err
	}

	var user definition.User
	if err := dsnap.DataTo(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) UpdateUserData(ctx context.Context, id string, new *definition.User) error {
	_, err := r.client.Collection(r.collection).Doc(id).Set(ctx, new)
	if err != nil {
		return err
	}

	return nil
}

func (r *SeasonRepository) GetSeasonData(ctx context.Context, seasonId string) (*definition.Season, error) {
	dsnap, err := r.client.Collection(r.collection).Doc(seasonId).Get(ctx)
	if err != nil {
		return nil, err
	}

	var season definition.Season
	if err := dsnap.DataTo(&season); err != nil {
		return nil, err
	}

	return &season, nil
}

func (r *SeasonRepository) GetSeasonsData(ctx context.Context) (*definition.Season, error) {
	now := time.Now().Local()
	iter := r.client.Collection(r.collection).
		Where("start_time", "<=", now).
		Documents(ctx)

	var season definition.Season

	for {
		doc, err := iter.Next()
		if err != nil {
			return nil, err
		}
		if err := doc.DataTo(&season); err != nil {
			return nil, err
		}
		if season.EndTime.Before(now) {
			continue
		} else {
			break
		}
	}

	return &season, nil
}
