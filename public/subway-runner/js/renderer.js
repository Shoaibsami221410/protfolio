// Renderer - 2D Flat Top-Down View
const Renderer = {
    canvas: null,
    ctx: null,
    width: 450,
    height: 800,

    // Lane positions (pixel X centers)
    laneX: [112, 225, 338],
    laneWidth: 110,
    roadLeft: 55,
    roadRight: 395,
    roadWidth: 340,

    // Player fixed Y position
    playerY: 650,

    // Animation
    runFrame: 0,
    lastFrameTime: 0,
    roadOffset: 0,

    init() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    // Get lane center X from lane index (-1, 0, 1)
    getLaneX(lane) {
        return this.laneX[lane + 1];
    },

    // Draw scrolling road background
    drawBackground(offset) {
        const ctx = this.ctx;
        this.roadOffset = offset;

        // Side areas
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(0, 0, this.width, this.height);

        // Left sidewalk
        ctx.fillStyle = '#555555';
        ctx.fillRect(0, 0, this.roadLeft - 5, this.height);

        // Right sidewalk
        ctx.fillRect(this.roadRight + 5, 0, this.width - this.roadRight - 5, this.height);

        // Road surface
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(this.roadLeft, 0, this.roadWidth, this.height);

        // Lane dividers (dashed white lines scrolling)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.setLineDash([30, 25]);
        ctx.lineDashOffset = -(offset % 55);

        const divider1 = (this.laneX[0] + this.laneX[1]) / 2;
        ctx.beginPath();
        ctx.moveTo(divider1, 0);
        ctx.lineTo(divider1, this.height);
        ctx.stroke();

        const divider2 = (this.laneX[1] + this.laneX[2]) / 2;
        ctx.beginPath();
        ctx.moveTo(divider2, 0);
        ctx.lineTo(divider2, this.height);
        ctx.stroke();

        ctx.setLineDash([]);

        // Road edges
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.roadLeft, 0);
        ctx.lineTo(this.roadLeft, this.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.roadRight, 0);
        ctx.lineTo(this.roadRight, this.height);
        ctx.stroke();

        // Scrolling rail ties on ground
        ctx.fillStyle = '#333333';
        const tieSpacing = 60;
        const tieOffset = offset % tieSpacing;
        for (let y = -tieSpacing + tieOffset; y < this.height + tieSpacing; y += tieSpacing) {
            ctx.fillRect(this.roadLeft + 10, y, this.roadWidth - 20, 4);
        }
    },

    // Draw scrolling side buildings
    drawBuildings(offset) {
        const ctx = this.ctx;
        const buildingColors = ['#1a1a2e', '#16213e', '#252540', '#1e1e35'];
        const buildingSpacing = 100;

        for (let i = 0; i < 10; i++) {
            const y = ((i * buildingSpacing + offset * 0.5) % (buildingSpacing * 10 + buildingSpacing)) - buildingSpacing;
            const color = buildingColors[i % buildingColors.length];

            // Left side buildings
            ctx.fillStyle = color;
            ctx.fillRect(0, y, this.roadLeft - 8, buildingSpacing - 10);

            // Windows on left
            ctx.fillStyle = '#ffff66';
            for (let wy = 8; wy < buildingSpacing - 20; wy += 18) {
                for (let wx = 6; wx < this.roadLeft - 20; wx += 16) {
                    if ((i + wx + wy) % 3 !== 0) {
                        ctx.globalAlpha = 0.6;
                        ctx.fillRect(wx, y + wy, 8, 10);
                    }
                }
            }

            // Right side buildings
            ctx.globalAlpha = 1;
            ctx.fillStyle = color;
            ctx.fillRect(this.roadRight + 8, y, this.width - this.roadRight - 8, buildingSpacing - 10);

            // Windows on right
            ctx.fillStyle = '#ffff66';
            for (let wy = 8; wy < buildingSpacing - 20; wy += 18) {
                for (let wx = this.roadRight + 14; wx < this.width - 10; wx += 16) {
                    if ((i + wx + wy) % 3 !== 0) {
                        ctx.globalAlpha = 0.6;
                        ctx.fillRect(wx, y + wy, 8, 10);
                    }
                }
            }
            ctx.globalAlpha = 1;
        }
    },

    // Draw 2D running player character
    drawPlayer(player) {
        const ctx = this.ctx;
        const actualX = this.getLaneX(0) + player.visualX * (this.laneX[2] - this.laneX[0]) / 2;

        // Update run animation
        const now = Date.now();
        if (now - this.lastFrameTime > 80) {
            this.runFrame = (this.runFrame + 1) % 8;
            this.lastFrameTime = now;
        }

        let baseY = this.playerY;
        if (player.isJumping) {
            baseY -= player.jumpHeight * 1.2;
        }

        // Shadow on ground
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.beginPath();
        ctx.ellipse(actualX, this.playerY + 15, 22, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        if (player.isRolling) {
            const rollAngle = (this.runFrame / 8) * Math.PI * 4;
            ctx.save();
            ctx.translate(actualX, baseY - 12);
            ctx.rotate(rollAngle);

            ctx.fillStyle = '#00cc66';
            ctx.beginPath();
            ctx.arc(0, 0, 22, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#009944';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.strokeStyle = '#00aa55';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-15, 0);
            ctx.lineTo(15, 0);
            ctx.moveTo(0, -15);
            ctx.lineTo(0, 15);
            ctx.stroke();

            ctx.restore();
        } else {
            // Running human figure
            const runCycle = Math.sin(this.runFrame * Math.PI / 4);
            const armSwing = runCycle * 12;
            const legSwing = runCycle * 16;
            const bodyBob = Math.abs(runCycle) * 2;

            const headY = baseY - 65 - bodyBob;
            const shoulderY = baseY - 48 - bodyBob;
            const hipY = baseY - 22;

            // Legs
            ctx.strokeStyle = '#2255aa';
            ctx.lineWidth = 9;
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(actualX - 6, hipY);
            ctx.lineTo(actualX - 6 + legSwing, baseY + 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(actualX + 6, hipY);
            ctx.lineTo(actualX + 6 - legSwing, baseY + 2);
            ctx.stroke();

            // Shoes
            ctx.fillStyle = '#ee3333';
            ctx.beginPath();
            ctx.ellipse(actualX - 6 + legSwing, baseY + 5, 9, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(actualX + 6 - legSwing, baseY + 5, 9, 5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Torso
            ctx.fillStyle = '#00cc66';
            ctx.beginPath();
            ctx.moveTo(actualX - 16, hipY);
            ctx.lineTo(actualX + 16, hipY);
            ctx.lineTo(actualX + 14, shoulderY);
            ctx.lineTo(actualX - 14, shoulderY);
            ctx.closePath();
            ctx.fill();

            // Hoodie center line
            ctx.strokeStyle = '#00aa55';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(actualX, shoulderY);
            ctx.lineTo(actualX, hipY);
            ctx.stroke();

            // Arms
            ctx.strokeStyle = '#ffcc99';
            ctx.lineWidth = 7;
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(actualX - 16, shoulderY + 5);
            ctx.lineTo(actualX - 18 - armSwing, shoulderY + 30);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(actualX + 16, shoulderY + 5);
            ctx.lineTo(actualX + 18 + armSwing, shoulderY + 30);
            ctx.stroke();

            // Head
            ctx.fillStyle = '#ffcc99';
            ctx.beginPath();
            ctx.arc(actualX, headY, 13, 0, Math.PI * 2);
            ctx.fill();

            // Hair
            ctx.fillStyle = '#222222';
            ctx.beginPath();
            ctx.arc(actualX, headY - 4, 13, Math.PI, 0);
            ctx.fill();

            // Cap
            ctx.fillStyle = '#ee3333';
            ctx.beginPath();
            ctx.ellipse(actualX, headY - 6, 15, 7, 0, Math.PI, 0);
            ctx.fill();
            ctx.fillRect(actualX - 17, headY - 5, 10, 4);
        }

        // Invincibility aura
        if (player.invincible) {
            ctx.strokeStyle = '#aa44ff';
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.5 + Math.sin(now / 100) * 0.3;
            ctx.beginPath();
            ctx.arc(actualX, baseY - 30, 40, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // Jetpack flames
        if (player.hasJetpack) {
            ctx.fillStyle = '#ff6600';
            for (let i = 0; i < 4; i++) {
                const flameY = this.playerY + 10 + i * 6 + Math.random() * 4;
                const flameSize = 8 - i * 1.5;
                ctx.globalAlpha = 1 - i * 0.25;
                ctx.beginPath();
                ctx.arc(actualX - 10, flameY, flameSize, 0, Math.PI * 2);
                ctx.arc(actualX + 10, flameY, flameSize, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }
    },

    // Draw 2D obstacle
    drawObstacle(obstacle) {
        if (obstacle.screenY < -160 || obstacle.screenY > this.height + 50) return;

        const x = this.getLaneX(obstacle.lane);
        const y = obstacle.screenY;

        if (obstacle.type === 'train') {
            this.drawTrain(x, y);
        } else if (obstacle.type === 'barrier_low') {
            this.drawBarrier(x, y, 'low');
        } else if (obstacle.type === 'barrier_high') {
            this.drawBarrier(x, y, 'high');
        }
    },

    drawTrain(x, y) {
        const ctx = this.ctx;
        const w = 70;
        const h = 160;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(x - w/2 + 4, y - h/2 + 4, w, h);

        // Train body
        const gradient = ctx.createLinearGradient(x - w/2, 0, x + w/2, 0);
        gradient.addColorStop(0, '#880000');
        gradient.addColorStop(0.3, '#cc0000');
        gradient.addColorStop(0.7, '#cc0000');
        gradient.addColorStop(1, '#880000');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x - w/2, y - h/2, w, h, 8);
        ctx.fill();

        // Roof
        ctx.fillStyle = '#666666';
        ctx.fillRect(x - w/2 + 5, y - h/2, w - 10, 8);

        // Windows
        ctx.fillStyle = '#aaddff';
        const winW = 20, winH = 18;
        ctx.fillRect(x - w/3, y - h/2 + 20, winW, winH);
        ctx.fillRect(x + w/3 - winW, y - h/2 + 20, winW, winH);
        ctx.fillRect(x - w/3, y - h/2 + 50, winW, winH);
        ctx.fillRect(x + w/3 - winW, y - h/2 + 50, winW, winH);

        // Window frames
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - w/3, y - h/2 + 20, winW, winH);
        ctx.strokeRect(x + w/3 - winW, y - h/2 + 20, winW, winH);

        // Front bumper
        ctx.fillStyle = '#444444';
        ctx.fillRect(x - w/2 + 8, y + h/2 - 12, w - 16, 10);

        // Headlights
        ctx.fillStyle = '#ffff00';
        ctx.shadowColor = '#ffff00';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x - w/4, y + h/2 - 15, 5, 0, Math.PI * 2);
        ctx.arc(x + w/4, y + h/2 - 15, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Train label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('R1', x, y + 10);
    },

    drawBarrier(x, y, type) {
        const ctx = this.ctx;
        const w = 90;
        const h = type === 'low' ? 25 : 50;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(x - w/2 + 3, y - h/2 + 3, w, h);

        // Barrier body
        const gradient = ctx.createLinearGradient(x, y - h/2, x, y + h/2);
        gradient.addColorStop(0, '#ffcc00');
        gradient.addColorStop(1, '#ff9900');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - w/2, y - h/2, w, h);

        // Diagonal hazard stripes
        ctx.fillStyle = '#000000';
        const stripeW = w / 6;
        for (let i = 0; i < 6; i += 2) {
            ctx.beginPath();
            ctx.moveTo(x - w/2 + i * stripeW, y - h/2);
            ctx.lineTo(x - w/2 + (i + 1) * stripeW, y - h/2);
            ctx.lineTo(x - w/2 + (i + 2) * stripeW, y + h/2);
            ctx.lineTo(x - w/2 + (i + 1) * stripeW, y + h/2);
            ctx.closePath();
            ctx.fill();
        }

        // Border
        ctx.strokeStyle = '#ffeeaa';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - w/2, y - h/2, w, h);

        if (type === 'low') {
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('JUMP', x, y);
        }
    },

    // Draw 2D coin
    drawCoin(coin) {
        if (coin.collected) return;
        const ctx = this.ctx;
        const x = this.getLaneX(coin.lane);
        const y = coin.screenY;

        if (y < -20 || y > this.height + 20) return;

        const floatOffset = Math.sin(Date.now() / 200 + y * 0.01) * 3;

        // Glow
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 12;

        // Coin body
        const gradient = ctx.createRadialGradient(x, y + floatOffset, 0, x, y + floatOffset, 14);
        gradient.addColorStop(0, '#ffff44');
        gradient.addColorStop(0.6, '#ffd700');
        gradient.addColorStop(1, '#cc9900');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y + floatOffset, 14, 0, Math.PI * 2);
        ctx.fill();

        // Dollar sign
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#886600';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', x, y + floatOffset);
    },

    // Draw 2D power-up
    drawPowerup(powerup) {
        if (powerup.collected) return;
        const ctx = this.ctx;
        const x = this.getLaneX(powerup.lane);
        const y = powerup.screenY;

        if (y < -30 || y > this.height + 30) return;

        const floatOffset = Math.sin(Date.now() / 150) * 5;
        const drawY = y + floatOffset;

        // Glow
        ctx.shadowColor = powerup.color;
        ctx.shadowBlur = 18;

        // Rotating box
        ctx.save();
        ctx.translate(x, drawY);
        ctx.rotate(Date.now() / 600);

        const size = 26;
        ctx.fillStyle = powerup.color;
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.restore();

        // Icon
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(powerup.icon, x, drawY);
    },

    // Draw particles
    drawParticles(particles) {
        const ctx = this.ctx;
        particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
};
