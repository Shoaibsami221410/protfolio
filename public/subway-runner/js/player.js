// Player Class
class Player {
    constructor() {
        this.lane = 0; // -1 (left), 0 (center), 1 (right)
        this.targetLane = 0;
        this.visualX = 0; // Smooth visual position
        
        this.isJumping = false;
        this.isRolling = false;
        this.jumpHeight = 0;
        this.jumpVelocity = 0;
        
        this.laneChangeSpeed = 0.2;
        this.jumpPower = 16;
        this.gravity = 0.7;
        this.maxJumpHeight = 100;
        
        this.rollDuration = 500; // ms
        this.rollEndTime = 0;
        
        this.invincible = false;
        this.invincibleEndTime = 0;
        
        // Power-up states
        this.hasJetpack = false;
        this.jetpackEndTime = 0;
        this.hasSuperSneakers = false;
        this.superSneakersEndTime = 0;
    }

    reset() {
        this.lane = 0;
        this.targetLane = 0;
        this.visualX = 0;
        this.isJumping = false;
        this.isRolling = false;
        this.jumpHeight = 0;
        this.jumpVelocity = 0;
        this.invincible = false;
        this.hasJetpack = false;
        this.hasSuperSneakers = false;
    }

    moveLeft() {
        if (this.targetLane > -1) {
            this.targetLane--;
        }
    }

    moveRight() {
        if (this.targetLane < 1) {
            this.targetLane++;
        }
    }

    jump() {
        if (!this.isJumping && !this.hasJetpack) {
            this.isJumping = true;
            this.jumpVelocity = this.hasSuperSneakers ? this.jumpPower * 1.5 : this.jumpPower;
            this.isRolling = false; // Cancel roll
        }
    }

    roll() {
        if (!this.isJumping && !this.isRolling) {
            this.isRolling = true;
            this.rollEndTime = Date.now() + this.rollDuration;
        }
    }

    activatePowerup(type, duration) {
        const endTime = Date.now() + duration;
        
        switch(type) {
            case 'jetpack':
                this.hasJetpack = true;
                this.jetpackEndTime = endTime;
                this.isJumping = true;
                this.jumpHeight = this.maxJumpHeight * 1.5;
                break;
            case 'sneakers':
                this.hasSuperSneakers = true;
                this.superSneakersEndTime = endTime;
                break;
            case 'invincible':
                this.invincible = true;
                this.invincibleEndTime = endTime;
                break;
        }
    }

    update(deltaTime) {
        const now = Date.now();
        
        // Smooth lane transition
        const diff = this.targetLane - this.visualX;
        if (Math.abs(diff) > 0.01) {
            this.visualX += diff * this.laneChangeSpeed;
        } else {
            this.visualX = this.targetLane;
        }
        this.lane = this.targetLane;

        // Jump physics
        if (this.isJumping) {
            if (this.hasJetpack) {
                // Jetpack keeps player floating
                this.jumpHeight = this.maxJumpHeight * 1.5;
            } else {
                this.jumpHeight += this.jumpVelocity;
                this.jumpVelocity -= this.gravity;
                
                if (this.jumpHeight <= 0) {
                    this.jumpHeight = 0;
                    this.isJumping = false;
                    this.jumpVelocity = 0;
                }
            }
        }

        // Roll timing
        if (this.isRolling && now > this.rollEndTime) {
            this.isRolling = false;
        }

        // Power-up timers
        if (this.hasJetpack && now > this.jetpackEndTime) {
            this.hasJetpack = false;
            // Start falling
            this.jumpVelocity = 0;
        }
        
        if (this.hasSuperSneakers && now > this.superSneakersEndTime) {
            this.hasSuperSneakers = false;
        }
        
        if (this.invincible && now > this.invincibleEndTime) {
            this.invincible = false;
        }
    }

    // Get collision box
    getCollisionBox() {
        const width = 30;
        const height = this.isRolling ? 25 : 60;
        const y = this.isJumping ? -this.jumpHeight : 0;
        
        return {
            lane: this.lane,
            width: width,
            height: height,
            y: y, // Vertical position (0 = ground)
            isRolling: this.isRolling,
            isJumping: this.isJumping
        };
    }

    // Check for active power-ups
    getActivePowerups() {
        const active = [];
        const now = Date.now();
        
        if (this.hasJetpack) {
            active.push({ type: 'jetpack', remaining: this.jetpackEndTime - now });
        }
        if (this.hasSuperSneakers) {
            active.push({ type: 'sneakers', remaining: this.superSneakersEndTime - now });
        }
        if (this.invincible) {
            active.push({ type: 'invincible', remaining: this.invincibleEndTime - now });
        }
        
        return active;
    }
}
