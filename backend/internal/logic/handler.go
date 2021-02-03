package logic

import (
	"context"
	"github.com/indomie-syndicate/ultra-hackathon/shop-pass/internal/db"
	"github.com/indomie-syndicate/ultra-hackathon/shop-pass/internal/definition"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"strconv"
	"time"
)

type (
	Handler struct {
		userRepo      *db.UserRepository
		seasonRepo    *db.SeasonRepository
		currentSeason *definition.Season
	}
)

func NewHandler(u *db.UserRepository, s *db.SeasonRepository) *Handler {
	return &Handler{u, s, nil}
}

func (h *Handler) StartSeason(ctx context.Context) error {
	season, err := h.seasonRepo.GetSeasonsData(ctx)
	if err != nil {
		return err
	}

	h.currentSeason = season
	//fmt.Printf("%v", h.currentSeason)
	go h.Run(ctx) //start check of season
	return nil
}

func (h *Handler) Run(ctx context.Context) {
	for {
		if h.currentSeason.EndTime.Before(time.Now().Local()) {
			if season, err := h.seasonRepo.GetSeasonsData(ctx); err != nil {
				break
			} else {
				h.currentSeason = season
			}
		}
	}
}

func (h *Handler) createNewUser(ctx context.Context, id string) (*definition.User, error) {
	claims := make(map[string]*definition.ClaimType)
	missionProgress := make(map[string]*definition.MissionProgress)

	for _, tier := range h.currentSeason.Tiers {
		str := strconv.Itoa(tier.Id)
		claims[str] = &definition.ClaimType{
			Free:    -1,
			Premium: -1,
		}
	}

	for _, mission := range h.currentSeason.Missions {
		str := strconv.Itoa(mission.Id)
		missionProgress[str] = &definition.MissionProgress{
			Current:   0,
			Completed: false,
		}
	}

	newUser := &definition.User{
		CurrentTier:     0,
		Points:          0,
		Premium:         false,
		Claims:          claims,
		MissionProgress: missionProgress,
	}
	err := h.userRepo.UpdateUserData(ctx, id, newUser)
	if err != nil {
		return nil, err
	}

	return h.userRepo.GetUserData(ctx, id)
}

func (h *Handler) GetUser(ctx context.Context, id string) (*definition.User, error) {
	user, err := h.userRepo.GetUserData(ctx, id)
	if status.Code(err) == codes.NotFound {
		return h.createNewUser(ctx, id)
	} else {
		return user, err
	}
}

func (h *Handler) GetSeason(ctx context.Context, id string) (*definition.Season, error) {
	return h.seasonRepo.GetSeasonData(ctx, id)
}
