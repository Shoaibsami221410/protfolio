// Obstacle Manager - 2D screen-space Y positions
const ObstacleManager = {
    obstacles: [],
    spawnY: -200, // Spawn above the screen
    minSpawnGap: 250, // Minimum pixel gap between obstacles
    playerY: 650, // Must match Renderer.playerY

    // Obstacle types
    types: {
        train: {
            hitH: 140, // Collision height
            canJumpOver: false,
            canSlideUnder: false
        },
        barrier_low: {
            hitH: 20,
            canJumpOver: true,
            canSlideUnder: false
        },
        barrier_high: {
            hitH: 45,
            canJumpOver: false,
            canSlideUnder: true
        }
    },

    reset() {
        this.obstacles = [];
    },

    update(speed, deltaTime) {
        // Move obstacles downward at constant speed (pixels per frame)
        const moveAmount = speed * deltaTime;

        this.obstacles.forEach(obstacle => {
            obstacle.screenY += moveAmount;
        });

        // Remove obstacles that go off the bottom
        this.obstacles = this.obstacles.filter(o => o.screenY < 900);
    },

    spawn(difficulty) {
        // Don't spawn if latest obstacle is still too close to top
        if (this.obstacles.length > 0) {
            const highestY = Math.min(...this.obstacles.map(o => o.screenY));
            if (highestY < this.minSpawnGap) {
                return;
            }
        }

        // Random spawn chance based on difficulty
        if (Math.random() > 0.03 + difficulty * 0.008) return;

        // Choose obstacle type
        const typeRoll = Math.random();
        let type;
        if (typeRoll < 0.5) {
            type = 'train';
        } else if (typeRoll < 0.75) {
            type = 'barrier_low';
        } else {
            type = 'barrier_high';
        }

        // Choose lane(s)
        const lanes = this.chooseLanes(difficulty);

        lanes.forEach(lane => {
            this.obstacles.push({
                type: type,
                lane: lane,
                screenY: this.spawnY,
                ...this.types[type]
            });
        });
    },

    chooseLanes(difficulty) {
        const lanes = [];
        const numBlocked = difficulty > 5 ? (Math.random() < 0.3 ? 2 : 1) : 1;

        const availableLanes = [-1, 0, 1];

        for (let i = 0; i < numBlocked; i++) {
            if (availableLanes.length === 0) break;
            const index = Math.floor(Math.random() * availableLanes.length);
            lanes.push(availableLanes.splice(index, 1)[0]);
        }

        return lanes;
    },

    checkCollision(playerBox) {
        const py = this.playerY;
        const playerHalfH = 35; // Approximate player hitbox half-height

        for (const obstacle of this.obstacles) {
            // Check lane
            if (obstacle.lane !== playerBox.lane) continue;

            // Check Y overlap (obstacle center vs player center)
            const obstacleHalfH = obstacle.hitH / 2;
            const overlapY = Math.abs(obstacle.screenY - py) < (obstacleHalfH + playerHalfH);
            if (!overlapY) continue;

            // Check if player avoided the obstacle
            if (obstacle.canJumpOver && playerBox.isJumping && playerBox.y < -40) {
                continue;
            }
            if (obstacle.canSlideUnder && playerBox.isRolling) {
                continue;
            }

            return true;
        }

        return false;
    },

    getObstacles() {
        return this.obstacles;
    }
};
