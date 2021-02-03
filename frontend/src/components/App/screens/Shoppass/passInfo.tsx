const passInfo = {
  end_time: '1 January 2021 at 00:00:00 UTC+8',
  start_time: '31 January 2021 at 23:59:59 UTC+8',
  tiers: [
    {
      type: 'normal',
      threshold: 50,
      id: 1,
      rewards: [
        {
          free: { name: '' },
          premium: { description: 'Get 10 Shopee coins.', name: 'Coins' },
        },
      ],
    },
    {
      rewards: [
        {
          premium: { description: 'Get 15 Shopee coins.', name: 'Coins' },
          free: { name: 'Coins', description: 'Get 15 Shopee coins.' },
        },
      ],
      id: 2,
      threshold: 100,
      type: 'normal',
    },
    {
      type: 'normal',
      rewards: [
        {
          premium: { name: 'Coins', description: 'Get 20 Shopee coins.' },
          free: { name: '' },
        },
      ],
      threshold: 300,
      id: 3,
    },
    {
      type: 'normal',
      id: 4,
      threshold: 500,
      rewards: [
        {
          premium: { name: 'Coins', description: 'Get 25 Shopee coins.' },
          free: { name: '' },
        },
      ],
    },
    {
      id: 5,
      threshold: 1000,
      rewards: [
        {
          free: { description: 'Get 50 Shopee coins.', name: 'Coins' },
          premium: {
            name: 'Fleet Footwork',
            description: 'Get 10% off delivery fee for normal delivery.',
          },
        },
        {
          free: { name: 'Coins', description: 'Get 50 Shopee coins.' },
          premium: {
            description: 'Get 10% off delivery fee for express delivery.',
            name: 'The Flash',
          },
        },
        {
          free: { description: 'Get 50 Shopee coins.', name: 'Coins' },
          premium: { name: 'Coins', description: 'Get 200 Shopee coins.' },
        },
      ],
      type: 'milestone',
    },
    {
      threshold: 1250,
      type: 'normal',
      rewards: [
        {
          premium: { name: 'Voucher', description: 'Get $5 voucher.' },
          free: { name: '' },
        },
      ],
      id: 6,
    },
    {
      id: 7,
      type: 'normal',
      threshold: 1500,
      rewards: [
        {
          premium: { name: 'Coins', description: 'Get 30 Shopee coins.' },
          free: { name: '' },
        },
      ],
    },
    {
      threshold: 1750,
      rewards: [
        {
          premium: { description: 'Get 30 Shopee coins.', name: 'Coins' },
          free: { name: 'Coins', description: 'Get 30 Shopee coins.' },
        },
      ],
      type: 'normal',
      id: 8,
    },
    {
      type: 'normal',
      threshold: 2000,
      id: 9,
      rewards: [
        {
          free: { name: '' },
          premium: { description: 'Get 50 Shopee coins.', name: 'Coins' },
        },
      ],
    },
    {
      threshold: 3000,
      rewards: [
        {
          free: { name: 'Coins', description: 'Get 500 Shopee coins.' },
          premium: {
            name: 'The Native',
            description: 'Get a 2% discount for all orders from local sellers.',
          },
        },
        {
          free: {
            name: 'Shopee Bear',
            description: 'Get a cute teddy bear from Shopee.',
          },
          premium: {
            description:
              'Get a 2% discount for all orders from overseas sellers.',
            name: 'The Traveller',
          },
        },
        {
          free: { name: 'Voucher', description: 'Get a 10$ voucher.' },
          premium: {
            name: 'The Collector',
            description:
              'Baskets with more than 5 item types get a 3% discount.',
          },
        },
      ],
      type: 'milestone',
      id: 10,
    },
    {
      id: 11,
      threshold: 3500,
      rewards: [
        {
          free: { name: 'Coins', description: 'Get 100 Shopee coins.' },
          premium: { description: 'Get a 5$ voucher.', name: 'Voucher' },
        },
      ],
      type: 'normal',
    },
    {
      id: 12,
      type: 'normal',
      threshold: 4000,
      rewards: [
        {
          premium: {
            name: 'Delivery Discount',
            description:
              'Delivery fee for the next 3 orders is 0, capped at 15$.',
          },
          free: { name: 'Coins', description: 'Get 100 Shopee coins.' },
        },
      ],
    },
    {
      threshold: 5000,
      type: 'normal',
      rewards: [
        {
          premium: {
            description: 'Get 300 Shopee coins.',
            name: 'Coins',
          },
          free: { name: 'Voucher', description: 'Get a 10$ voucher.' },
        },
      ],
      id: 13,
    },
    {
      type: 'normal',
      threshold: 6000,
      rewards: [
        {
          premium: {
            description: 'Receive a special-edition flask from Shopee.',
            name: 'Shopee Flask',
          },
          free: { name: 'Voucher', description: 'Get a 30$ voucher.' },
        },
      ],
      id: 14,
    },
    {
      rewards: [
        {
          free: {
            description: 'Earn 15% more Shopee coins.',
            name: 'Coin Enthusiast',
          },
          premium: {
            name: 'Big Game Hunter',
            description: 'Get 4% discount for orders that are above SGD100.',
          },
        },
        {
          premium: {
            name: 'Microscopic Vision',
            description: 'Get 4% discount for orders below SGD25.',
          },
          free: {
            description: 'Vouchers are 10% more effective.',
            name: 'Ticket Master',
          },
        },
        {
          premium: {
            description: 'Get 2.5% discount on all orders.',
            name: 'Master of the Deal',
          },
          free: {
            description: 'Get an exquisite cutlery set from Shopee.',
            name: 'Shopee Cutlery Set',
          },
        },
      ],
      threshold: 7500,
      id: 15,
      type: 'milestone',
    },
  ],
  missions: [
    {
      tags: { login: true },
      id: 1,
      type: 'normal',
      total_progress: 7,
      description: 'login daily for the week',
      points: 100,
    },
    {
      type: 'normal',
      total_progress: 10,
      points: 40,
      description: 'purchase 10 items',
      id: 2,
      tags: { count: true, purchase: true },
    },
    {
      id: 3,
      description: 'purchase a $100 worth of items',
      total_progress: 100,
      type: 'normal',
      tags: { amount: true, purchase: true },
      points: 120,
    },
  ],
  max_tiers: 15,
  season: 1,
};

export default passInfo;
