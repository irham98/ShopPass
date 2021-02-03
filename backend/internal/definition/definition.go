package definition

import "time"

type (
	User struct {
		CurrentTier     int                         `firestore:"current_tier" json:"current_tier"`
		Points          int                         `firestore:"points" json:"points"`
		Premium         bool                        `firestore:"premium" json:"premium"`
		Claims          map[string]*ClaimType       `firestore:"claims" json:"claims"`
		MissionProgress map[string]*MissionProgress `firestore:"mission_progress" json:"mission_progress"`
	}

	ClaimType struct {
		Free    int8 `firestore:"free" json:"free"`
		Premium int8 `firestore:"premium" json:"premium"`
	}

	MissionProgress struct {
		Current   float64 `firestore:"current" json:"current"`
		Completed bool    `firestore:"completed" json:"completed"`
	}

	RewardData struct {
		Free    Reward `firestore:"free" json:"free"`
		Premium Reward `firestore:"premium" json:"premium"`
	}

	Reward struct {
		Name        string `firestore:"name" json:"name"`
		Type        string `firestore:"type,omitempty" json:"type,omitempty"`
		Description string `firestore:"description,omitempty" json:"description,omitempty"`
	}

	Season struct {
		StartTime   time.Time `firestore:"start_time" json:"start_time"`
		EndTime     time.Time `firestore:"end_time" json:"end_time"`
		MaxTiers    int       `firestore:"max_tiers" json:"max_tiers"`
		TotalPoints int       `firestore:"total_points" json:"total_points"`
		Tiers       []Tier    `firestore:"tiers" json:"tiers"`
		Missions    []Mission `firestore:"missions" json:"missions"`
	}

	Tier struct {
		Id        int          `firestore:"id" json:"id"`
		Threshold int          `firestore:"threshold" json:"threshold"`
		Type      string       `firestore:"type" json:"type"`
		Rewards   []RewardData `firestore:"rewards" json:"rewards"`
	}

	Mission struct {
		Id            int             `firestore:"id" json:"id"`
		TotalProgress int             `firestore:"total_progress" json:"total_progress"`
		Tags          map[string]bool `firestore:"tags" json:"tags"`
		Description   string          `firestore:"description" json:"description"`
		Type          string          `firestore:"type" json:"type"`
		Points        int             `firestore:"points" json:"points"`
	}
)
