package logic

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/indomie-syndicate/ultra-hackathon/shop-pass/internal/definition"
	"strconv"
)

func (h *Handler) HandleCommand(ctx context.Context, command int, payload json.RawMessage) (err error) {
	switch command {
	case definition.DailyLoginCommand:
		login := &definition.LoginPayload{}
		_ = json.Unmarshal(payload, login)
		err = h.handleLogin(ctx, login)
	case definition.ClaimCommand:
		claim := &definition.ClaimPayload{}
		err = json.Unmarshal(payload, claim)
		err = h.handleClaim(ctx, claim)
	case definition.UpgradePassCommand:
		upgrade := &definition.UpgradePassPayload{}
		err = json.Unmarshal(payload, upgrade)
		err = h.handleUpgrade(ctx, upgrade)
	case definition.PurchaseItemCommand:
		purchase := &definition.PurchasePayload{}
		err = json.Unmarshal(payload, purchase)
		err = h.handlePurchase(ctx, purchase)
	default:
		err = errors.New("no commands found")
	}

	return
}

func (h *Handler) handleLogin(ctx context.Context, login *definition.LoginPayload) error {
	if user, err := h.userRepo.GetUserData(ctx, string(login.UserId)); err != nil {
		return err
	} else {
		missions := h.findEligibleMissions("login")
		//fmt.Printf("%v", missions)
		for _, m := range missions {
			val := strconv.Itoa(m.Id)
			if progress, ok := user.MissionProgress[val]; ok {
				if progress.Completed {
					continue
				}
				progress.Current++
				if progress.Current >= float64(m.TotalProgress) {
					progress.Completed = true
					user.Points += m.Points
				}
				user.MissionProgress[val] = progress
			}
		}
		return h.userRepo.UpdateUserData(ctx, string(login.UserId), user)
	}
}

func (h *Handler) handleClaim(ctx context.Context, claim *definition.ClaimPayload) error {
	if user, err := h.userRepo.GetUserData(ctx, string(claim.UserId)); err != nil {
		return err
	} else {
		if claim.TierLevel > user.CurrentTier {
			return errors.New("user have not reached this tier")
		}
		if claim.Premium && !user.Premium {
			return errors.New("user is free user and item is premium reward")
		}
		val := strconv.Itoa(claim.TierLevel)
		if claim.Premium {
			if user.Claims[val].Premium >= 0 {
				return errors.New("already claimed")
			}
			user.Claims[val].Premium = int8(claim.Index)
		} else {
			if user.Claims[val].Free >= 0 {
				return errors.New("already claimed")
			}
			user.Claims[val].Free = int8(claim.Index)
		}

		return h.userRepo.UpdateUserData(ctx, string(claim.UserId), user)
	}
}

func (h *Handler) handleUpgrade(ctx context.Context, upgrade *definition.UpgradePassPayload) error {
	if user, err := h.userRepo.GetUserData(ctx, string(upgrade.UserId)); err != nil {
		return err
	} else {
		if user.Premium {
			return errors.New("already premium pass user")
		}
		user.Premium = true

		return h.userRepo.UpdateUserData(ctx, string(upgrade.UserId), user)
	}
}

func (h *Handler) handlePurchase(ctx context.Context, purchase *definition.PurchasePayload) error {
	if user, err := h.userRepo.GetUserData(ctx, string(purchase.UserId)); err != nil {
		return err
	} else {
		missions := h.findEligibleMissions("purchase")
		for _, m := range missions {
			val := strconv.Itoa(m.Id)
			if progress, ok := user.MissionProgress[val]; ok {
				if progress.Completed {
					continue
				}
				if _, ok := m.Tags["count"]; ok {
					progress.Current += float64(purchase.ItemCount)
				} else if _, ok := m.Tags["amount"]; ok {
					progress.Current += purchase.Amount
				}

				if progress.Current >= float64(m.TotalProgress) {
					progress.Completed = true
					user.Points += m.Points
				}

				user.MissionProgress[val] = progress
			}
		}
		return h.userRepo.UpdateUserData(ctx, string(purchase.UserId), user)
	}
}

func (h *Handler) findEligibleMissions(key string) []definition.Mission {
	var ret []definition.Mission
	for _, m := range h.currentSeason.Missions {
		//fmt.Printf("%v", m)
		if _, ok := m.Tags[key]; ok {
			ret = append(ret, m)
		}
	}
	return ret
}
