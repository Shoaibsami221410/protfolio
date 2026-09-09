// Coin Manager - 2D screen-space Y positions
const CoinManager = {
    coins: [],
    spawnY: -50,
    playerY: 650, // Must match Renderer.playerY

    patterns: [
        // Single coin
        [{ lane: 0, yOff: 0 }],
        [{ lane: -1, yOff: 0 }],
        [{ lane: 1, yOff: 0 }],

        // Line of 3 straight
        [
            { lane: 0, yOff: 0 },
            { lane: 0, yOff: -40 },
            { lane: 0, yOff: -80 }
        ],

        // Diagonal left to right
        [
            { lane: -1, yOff: 0 },
            { lane: 0, yOff: -40 },
            { lane: 1, yOff: -80 }
        ],

        // Diagonal right to left
        [
            { lane: 1, yOff: 0 },
            { lane: 0, yOff: -40 },
            { lane: -1, yOff: -80 }
        ],

        // Arc pattern
        [
            { lane: -1, yOff: 0 },
            { lane: 0, yOff: -30 },
            { lane: 1, yOff: -30 },
            { lane: 0, yOff: -60 },
            { lane: -1, yOff: -90 }
        ],

        // All lanes
        [
            { lane: -1, yOff: 0 },
            { lane: 0, yOff: 0 },
            { lane: 1, yOff: 0 }
        ],

        // Long line of 5
        [
            { lane: 0, yOff: 0 },
            { lane: 0, yOff: -35 },
            { lane: 0, yOff: -70 },
            { lane: 0, yOff: -105 },
            { lane: 0, yOff: -140 }
        ]
    ],

    reset() {
        this.coins = [];
    },

    update(speed, deltaTime) {
        const moveAmount = speed * deltaTime;

        this.coins.forEach(coin => {
            coin.screenY += moveAmount;
        });

        // Remove off-screen or collected coins
        this.coins = this.coins.filter(c => c.screenY < 850 && !c.collected);
    },

    spawn() {
        // Don't spawn if recent coins still near top
        if (this.coins.length > 0) {
            const lowestY = Math.min(...this.coins.filter(c => !c.collected).map(c => c.screenY));
            if (lowestY < 100) return;
        }

        if (Math.random() > 0.04) return;

        const pattern = this.patterns[Math.floor(Math.random() * this.patterns.length)];
        const laneShift = Math.floor(Math.random() * 3) - 1;

        pattern.forEach(coinDef => {
            let lane = coinDef.lane + laneShift;
            lane = Math.max(-1, Math.min(1, lane));

            this.coins.push({
                lane: lane,
                screenY: this.spawnY + coinDef.yOff,
                collected: false,
                value: 1
            });
        });
    },

    checkCollection(playerBox, hasMagnet = false) {
        let collected = 0;
        const py = this.playerY;
        const collectDist = hasMagnet ? 120 : 35;
        const laneRange = hasMagnet ? 2 : 0;

        this.coins.forEach(coin => {
            if (coin.collected) return;

            if (Math.abs(coin.screenY - py) > collectDist) return;

            const laneDiff = Math.abs(coin.lane - playerBox.lane);
            if (laneDiff <= laneRange) {
                coin.collected = true;
                collected += coin.value;
            }
        });

        return collected;
    },

    getCoins() {
        return this.coins.filter(c => !c.collected);
    }
};
