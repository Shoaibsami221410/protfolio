// Power-up Manager - 2D screen-space Y positions
const PowerupManager = {
    powerups: [],
    spawnY: -50,
    playerY: 650,
    lastSpawnTime: 0,
    minSpawnInterval: 10000,

    types: {
        magnet: {
            name: 'Coin Magnet',
            icon: '🧲',
            color: '#ff4444',
            duration: 8000,
            effect: 'magnet'
        },
        multiplier: {
            name: '2x Multiplier',
            icon: '×2',
            color: '#ffaa00',
            duration: 10000,
            effect: 'multiplier'
        },
        jetpack: {
            name: 'Jetpack',
            icon: '🚀',
            color: '#00aaff',
            duration: 5000,
            effect: 'jetpack'
        },
        sneakers: {
            name: 'Super Sneakers',
            icon: '👟',
            color: '#00ff88',
            duration: 8000,
            effect: 'sneakers'
        },
        shield: {
            name: 'Shield',
            icon: '🛡',
            color: '#aa44ff',
            duration: 5000,
            effect: 'invincible'
        }
    },

    activeEffects: {
        magnet: false,
        magnetEndTime: 0,
        multiplier: false,
        multiplierEndTime: 0,
        multiplierValue: 1
    },

    reset() {
        this.powerups = [];
        this.lastSpawnTime = 0;
        this.activeEffects = {
            magnet: false,
            magnetEndTime: 0,
            multiplier: false,
            multiplierEndTime: 0,
            multiplierValue: 1
        };
    },

    update(speed, deltaTime) {
        const moveAmount = speed * deltaTime;
        const now = Date.now();

        this.powerups.forEach(powerup => {
            powerup.screenY += moveAmount;
        });

        this.powerups = this.powerups.filter(p => p.screenY < 850 && !p.collected);

        if (this.activeEffects.magnet && now > this.activeEffects.magnetEndTime) {
            this.activeEffects.magnet = false;
        }

        if (this.activeEffects.multiplier && now > this.activeEffects.multiplierEndTime) {
            this.activeEffects.multiplier = false;
            this.activeEffects.multiplierValue = 1;
        }
    },

    spawn() {
        const now = Date.now();

        if (now - this.lastSpawnTime < this.minSpawnInterval) return;
        if (Math.random() > 0.005) return;

        const typeKeys = Object.keys(this.types);
        const typeKey = typeKeys[Math.floor(Math.random() * typeKeys.length)];
        const type = this.types[typeKey];
        const lane = Math.floor(Math.random() * 3) - 1;

        this.powerups.push({
            type: typeKey,
            lane: lane,
            screenY: this.spawnY,
            collected: false,
            ...type
        });

        this.lastSpawnTime = now;
    },

    checkCollection(playerBox, player) {
        const py = this.playerY;
        let collected = null;

        this.powerups.forEach(powerup => {
            if (powerup.collected) return;

            if (Math.abs(powerup.screenY - py) > 40) return;
            if (powerup.lane !== playerBox.lane) return;

            powerup.collected = true;
            collected = powerup;
            this.applyEffect(powerup, player);
        });

        return collected;
    },

    applyEffect(powerup, player) {
        const now = Date.now();

        switch (powerup.effect) {
            case 'magnet':
                this.activeEffects.magnet = true;
                this.activeEffects.magnetEndTime = now + powerup.duration;
                break;
            case 'multiplier':
                this.activeEffects.multiplier = true;
                this.activeEffects.multiplierEndTime = now + powerup.duration;
                this.activeEffects.multiplierValue = 2;
                break;
            case 'jetpack':
                player.activatePowerup('jetpack', powerup.duration);
                break;
            case 'sneakers':
                player.activatePowerup('sneakers', powerup.duration);
                break;
            case 'invincible':
                player.activatePowerup('invincible', powerup.duration);
                break;
        }
    },

    hasMagnet() {
        return this.activeEffects.magnet;
    },

    getMultiplier() {
        return this.activeEffects.multiplierValue;
    },

    getActiveEffectsDisplay() {
        const active = [];
        const now = Date.now();

        if (this.activeEffects.magnet) {
            const remaining = Math.ceil((this.activeEffects.magnetEndTime - now) / 1000);
            active.push(`🧲 ${remaining}s`);
        }

        if (this.activeEffects.multiplier) {
            const remaining = Math.ceil((this.activeEffects.multiplierEndTime - now) / 1000);
            active.push(`×2 ${remaining}s`);
        }

        return active;
    },

    getPowerups() {
        return this.powerups.filter(p => !p.collected);
    }
};
