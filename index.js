"use strict";
var duration = 1000;

function progress(el, config) {
    if (!(this instanceof progress)) {
        return new progress(el, config);
    }
    this.current = 0;
    this.parent = el || document.body;
    this.el = document.createElement('div');
    this.el.className = 'progress-bar';
    this.parent.appendChild(this.el);
    this.el.style.opacity = 1;
}

progress.prototype.inc = function(to) {
    // increment randomly part of the way, never reaching finish
    if (!this.finished) {
        var t = this;
        to = this.current = (typeof to === 'number') ? Math.min(to, 100) : (this.current + Math.random() * 0.6 * (100 - this.current));
        setTimeout(function() {
            t.el.style.width = to + '%';
            t.el.style.opacity = 1;
        }, 0);
    }
};

progress.prototype.end = function() {
    // finish the animation

    if (!this.finished) {
        var t = this;
        this.finished = true;
        setTimeout(function() {
            t.el.style.width = '100%';
            t.el.style.opacity = 0;
            setTimeout(function() {
                t.parent.removeChild(t.el);
            }, duration); // duration of the transition    
        }, 0);
    }
};

module.exports = progress;