// Input Handler - Keyboard and Touch Controls
const InputHandler = {
    keys: {},
    touchStartX: 0,
    touchStartY: 0,
    swipeThreshold: 50,
    callbacks: {
        left: null,
        right: null,
        jump: null,
        roll: null,
        pause: null
    },

    init() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Touch events
        const canvas = document.getElementById('gameCanvas');
        canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    },

    handleKeyDown(e) {
        if (this.keys[e.code]) return; // Prevent key repeat
        this.keys[e.code] = true;

        switch (e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                if (this.callbacks.left) this.callbacks.left();
                break;
            case 'ArrowRight':
            case 'KeyD':
                if (this.callbacks.right) this.callbacks.right();
                break;
            case 'ArrowUp':
            case 'KeyW':
            case 'Space':
                e.preventDefault();
                if (this.callbacks.jump) this.callbacks.jump();
                break;
            case 'ArrowDown':
            case 'KeyS':
                if (this.callbacks.roll) this.callbacks.roll();
                break;
            case 'Escape':
            case 'KeyP':
                if (this.callbacks.pause) this.callbacks.pause();
                break;
        }
    },

    handleKeyUp(e) {
        this.keys[e.code] = false;
    },

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    },

    handleTouchEnd(e) {
        e.preventDefault();
        if (e.changedTouches.length === 0) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;

        // Determine swipe direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > this.swipeThreshold) {
                if (deltaX > 0 && this.callbacks.right) {
                    this.callbacks.right();
                } else if (deltaX < 0 && this.callbacks.left) {
                    this.callbacks.left();
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(deltaY) > this.swipeThreshold) {
                if (deltaY < 0 && this.callbacks.jump) {
                    this.callbacks.jump();
                } else if (deltaY > 0 && this.callbacks.roll) {
                    this.callbacks.roll();
                }
            }
        }
    },

    setCallback(action, callback) {
        if (this.callbacks.hasOwnProperty(action)) {
            this.callbacks[action] = callback;
        }
    },

    isKeyPressed(code) {
        return this.keys[code] === true;
    }
};
