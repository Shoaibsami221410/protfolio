// Main Game Controller
const Game = {
    // Game state
    state: 'menu', // 'menu', 'playing', 'paused', 'gameover'
    
    // Game stats
    score: 0,
    coins: 0,
    distance: 0,
    highScore: 0,
    
    // Speed settings (pixels per millisecond)
    baseSpeed: 0.35,
    speed: 0.35,
    maxSpeed: 0.8,
    speedIncrement: 0.00005,
    
    // Difficulty
    difficulty: 1,
    
    // Timing
    lastTime: 0,
    worldOffset: 0,
    
    // Player instance
    player: null,
    
    // Particles for effects
    particles: [],
    
    // DOM elements
    elements: {},

    init() {
        // Initialize all systems
        Renderer.init();
        InputHandler.init();
        
        // Create player
        this.player = new Player();
        
        // Cache DOM elements
        this.elements = {
            startScreen: document.getElementById('start-screen'),
            pauseScreen: document.getElementById('pause-screen'),
            gameoverScreen: document.getElementById('gameover-screen'),
            uiOverlay: document.getElementById('ui-overlay'),
            coinCount: document.getElementById('coin-count'),
            scoreValue: document.getElementById('score-value'),
            distanceValue: document.getElementById('distance-value'),
            highScore: document.getElementById('high-score'),
            finalScore: document.getElementById('final-score'),
            finalCoins: document.getElementById('final-coins'),
            finalDistance: document.getElementById('final-distance'),
            newHighScore: document.getElementById('new-high-score'),
            powerupIndicator: document.getElementById('powerup-indicator'),
            startBtn: document.getElementById('start-btn'),
            resumeBtn: document.getElementById('resume-btn'),
            quitBtn: document.getElementById('quit-btn'),
            retryBtn: document.getElementById('retry-btn')
        };
        
        // Setup input callbacks
        InputHandler.setCallback('left', () => this.player.moveLeft());
        InputHandler.setCallback('right', () => this.player.moveRight());
        InputHandler.setCallback('jump', () => this.player.jump());
        InputHandler.setCallback('roll', () => this.player.roll());
        InputHandler.setCallback('pause', () => this.togglePause());
        
        // Setup button listeners
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.resumeBtn.addEventListener('click', () => this.resumeGame());
        this.elements.quitBtn.addEventListener('click', () => this.quitGame());
        this.elements.retryBtn.addEventListener('click', () => this.startGame());
        
        // Load high score
        this.loadHighScore();
        
        // Start render loop
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    },

    startGame() {
        this.state = 'playing';
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.speed = this.baseSpeed;
        this.difficulty = 1;
        this.worldOffset = 0;
        this.particles = [];
        this.lastTime = performance.now();
        
        // Reset all systems
        this.player.reset();
        ObstacleManager.reset();
        CoinManager.reset();
        PowerupManager.reset();
        
        // Hide screens
        this.elements.startScreen.classList.add('hidden');
        this.elements.gameoverScreen.classList.add('hidden');
        this.elements.pauseScreen.classList.add('hidden');
        
        // Update UI
        this.updateUI();
    },

    togglePause() {
        if (this.state === 'playing') {
            this.state = 'paused';
            this.elements.pauseScreen.classList.remove('hidden');
        } else if (this.state === 'paused') {
            this.resumeGame();
        }
    },

    resumeGame() {
        this.state = 'playing';
        this.elements.pauseScreen.classList.add('hidden');
        this.lastTime = performance.now();
    },

    quitGame() {
        this.state = 'menu';
        this.elements.pauseScreen.classList.add('hidden');
        this.elements.startScreen.classList.remove('hidden');
    },

    gameOver() {
        this.state = 'gameover';
        
        // Check for new high score
        const isNewHighScore = this.score > this.highScore;
        if (isNewHighScore) {
            this.highScore = this.score;
            this.saveHighScore();
        }
        
        // Update game over screen
        this.elements.finalScore.textContent = Math.floor(this.score);
        this.elements.finalCoins.textContent = this.coins;
        this.elements.finalDistance.textContent = Math.floor(this.distance);
        
        if (isNewHighScore) {
            this.elements.newHighScore.classList.remove('hidden');
        } else {
            this.elements.newHighScore.classList.add('hidden');
        }
        
        this.elements.gameoverScreen.classList.remove('hidden');
    },

    gameLoop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Cap delta time to prevent huge jumps
        const cappedDelta = Math.min(deltaTime, 50);
        
        if (this.state === 'playing') {
            this.update(cappedDelta);
        }
        
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    },

    update(deltaTime) {
        // Update world offset for scrolling road lines
        this.worldOffset += this.speed * deltaTime;

        // Update distance
        this.distance += this.speed * deltaTime * 0.05;

        // Gradual speed increase
        if (this.speed < this.maxSpeed) {
            this.speed += this.speedIncrement * deltaTime;
        }
        
        // Update difficulty based on distance
        this.difficulty = 1 + Math.floor(this.distance / 100);
        
        // Update player
        this.player.update(deltaTime);
        
        // Update managers
        ObstacleManager.update(this.speed, deltaTime);
        CoinManager.update(this.speed, deltaTime);
        PowerupManager.update(this.speed, deltaTime);
        
        // Spawn entities
        ObstacleManager.spawn(this.difficulty);
        CoinManager.spawn();
        PowerupManager.spawn();
        
        // Get player collision box
        const playerBox = this.player.getCollisionBox();
        
        // Check collisions
        if (!this.player.invincible && !this.player.hasJetpack) {
            if (ObstacleManager.checkCollision(playerBox)) {
                this.gameOver();
                return;
            }
        }
        
        // Collect coins
        const coinsCollected = CoinManager.checkCollection(
            playerBox, 
            PowerupManager.hasMagnet()
        );
        if (coinsCollected > 0) {
            const multiplier = PowerupManager.getMultiplier();
            this.coins += coinsCollected * multiplier;
            this.score += coinsCollected * 10 * multiplier;
            this.spawnCoinParticles();
        }
        
        // Collect power-ups
        PowerupManager.checkCollection(playerBox, this.player);
        
        // Score increases over time
        this.score += deltaTime * 0.01 * PowerupManager.getMultiplier();
        
        // Update particles
        this.updateParticles(deltaTime);
        
        // Update UI
        this.updateUI();
    },

    render() {
        Renderer.clear();

        // Draw scrolling background and road
        Renderer.drawBackground(this.worldOffset);
        Renderer.drawBuildings(this.worldOffset);

        // Draw all game objects (sorted by Y so lower objects draw on top)
        const allObjects = [
            ...ObstacleManager.getObstacles().map(o => ({ ...o, objType: 'obstacle' })),
            ...CoinManager.getCoins().map(c => ({ ...c, objType: 'coin' })),
            ...PowerupManager.getPowerups().map(p => ({ ...p, objType: 'powerup' }))
        ];

        allObjects.sort((a, b) => a.screenY - b.screenY);

        allObjects.forEach(obj => {
            if (obj.objType === 'obstacle') {
                Renderer.drawObstacle(obj);
            } else if (obj.objType === 'coin') {
                Renderer.drawCoin(obj);
            } else if (obj.objType === 'powerup') {
                Renderer.drawPowerup(obj);
            }
        });

        // Draw player on top
        if (this.state !== 'menu') {
            Renderer.drawPlayer(this.player);
        }

        // Draw particles
        Renderer.drawParticles(this.particles);
    },

    updateUI() {
        this.elements.coinCount.textContent = this.coins;
        this.elements.scoreValue.textContent = Math.floor(this.score);
        this.elements.distanceValue.textContent = Math.floor(this.distance);
        this.elements.highScore.textContent = Math.floor(this.highScore);
        
        // Update power-up indicator
        const activeEffects = PowerupManager.getActiveEffectsDisplay();
        const playerPowerups = this.player.getActivePowerups();
        
        playerPowerups.forEach(p => {
            const remaining = Math.ceil(p.remaining / 1000);
            if (p.type === 'jetpack') activeEffects.push(`🚀 ${remaining}s`);
            if (p.type === 'sneakers') activeEffects.push(`👟 ${remaining}s`);
            if (p.type === 'invincible') activeEffects.push(`🛡 ${remaining}s`);
        });
        
        this.elements.powerupIndicator.innerHTML = activeEffects.join('<br>');
    },

    spawnCoinParticles() {
        // Get player screen X from lane
        const px = Renderer.getLaneX(0) + this.player.visualX * (Renderer.laneX[2] - Renderer.laneX[0]) / 2;
        const py = Renderer.playerY;

        for (let i = 0; i < 5; i++) {
            this.particles.push({
                x: px + (Math.random() - 0.5) * 30,
                y: py - 30 + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 3,
                vy: -Math.random() * 3 - 1,
                size: 3 + Math.random() * 3,
                color: '#ffd700',
                alpha: 1,
                decay: 0.02
            });
        }
    },

    updateParticles(deltaTime) {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.alpha -= p.decay;
        });
        
        this.particles = this.particles.filter(p => p.alpha > 0);
    },

    loadHighScore() {
        const saved = localStorage.getItem('subwayRunnerHighScore');
        this.highScore = saved ? parseInt(saved) : 0;
        this.elements.highScore.textContent = this.highScore;
    },

    saveHighScore() {
        localStorage.setItem('subwayRunnerHighScore', this.highScore.toString());
    }
};

// Start the game when page loads
window.addEventListener('load', () => {
    Game.init();
});
