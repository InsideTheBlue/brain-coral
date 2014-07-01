var leds = require('lpd8806-asyncfx')(10);
var Galileo = require('galileo-io');
var board = new Galileo();

board.on('ready', function() {
    leds.rainbow(1, 25);

    this.analogRead('A0', function(data) {
        data = parseInt(data, 10);
        updateState(data);
    });

    process.on('exit', function() {
        leds.off();
    });
});

var STATE_IDLE = 0;
var STATE_ACTIVE = 1;
var state_current = STATE_IDLE;
// Determines which state the animation is in based off the incoming value
function updateState(val) {
    if (state_current != STATE_IDLE && between(val, 0, 249)) {
        state_current = STATE_IDLE;
        leds.rainbow(1, 20);
    }
    if (state_current != STATE_ACTIVE && between(val, 250, 500)) {
        state_current = STATE_ACTIVE;
        leds.pulseColor(255, 0, 0);
    }

}
// Returns a boolean value determined by the returned condition
function between(x, min, max) {
    return x >= min && x <= max;
}

process.on('SIGINT', function() {
    process.exit(0);
});
