package definition

type (
	UserId string

	LoginPayload struct {
		UserId `json:"user_id"`
	}

	ClaimPayload struct {
		UserId     `json:"user_id"`
		TierLevel  int  `json:"tier_level"`
		Premium    bool `json:"premium"`
		RewardType int  `json:"reward_type"`
		Index      int  `json:"index"`
	}

	PurchasePayload struct {
		UserId    `json:"user_id"`
		Amount    float64 `json:"amount"`
		ItemCount int     `json:"item_count"`
	}

	UpgradePassPayload struct {
		UserId `json:"user_id"`
	}
)
