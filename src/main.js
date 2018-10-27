var Clamp = Phaser.Math.Clamp;
var SnapFloor = Phaser.Math.Snap.Floor;
var _window = window;
var _windowBounds = new Phaser.Geom.Rectangle();
var NONE = 'none';
var FIT = 'fit';
var RESIZE = 'resize';
var RESIZE_AND_FIT = 'resize-and-fit';

var GameScalePlugin = new Phaser.Class({

  Extends: Phaser.Plugins.BasePlugin,

  debounce: false,
  debounceDelay: 50,
  debounceTimer: null,
  maxHeight: Infinity,
  maxWidth: Infinity,
  minHeight: 0,
  minWidth: 0,
  mode: FIT,
  resizeCameras: true,
  scale: null,
  snap: null,

  init: function (data) {
    this.onResize = this.onResize.bind(this);
    this.setPendingRefresh = this.setPendingRefresh.bind(this);
    this.game.canvas.style.transformOrigin = '0 0';
    if (data) this.configure(data);
  },

  start: function () {
    this.game.events.on('prestep', this.gamePreStep, this);
    _window.addEventListener('resize', this.onResize);
    this.setPendingRefresh();
  },

  stop: function () {
    this.game.events.off('prestep', this.gamePreStep, this);
    _window.removeEventListener('resize', this.onResize);
  },

  gamePreStep: function (time, delta) {
    if (this.debounce && this.debounceTimer > 0) {
      this.debounceTimer -= delta;
      if (this.debounceTimer <= 0) this.setPendingRefresh();
    }
    if (this.needsRefresh) this.refresh();
  },

  refresh: function () {
    var mode = this.mode;
    var config = this.game.config;
    var bounds = this.getBounds();
    var w = this.calcAvailWidth(bounds.width, true);
    var h = this.calcAvailHeight(bounds.height, true);

    if (mode === RESIZE || mode === RESIZE_AND_FIT) {
      if (w !== config.width || h !== config.height) {
        this.resizeGame(w, h);
      }
    }

    if (mode === RESIZE_AND_FIT) {
      w = this.calcAvailWidth(bounds.width, false);
      h = this.calcAvailHeight(bounds.height, false);
    }

    if (mode === FIT || mode === RESIZE_AND_FIT) {
      this.scaleCanvas(Math.min(w / config.width, h / config.height));
    } else {
      this.scaleCanvas(1);
    }

    this.needsRefresh = false;
  },

  getBounds: function () {
    return this.game.config.parent
      ? this.game.canvas.parentNode.getBoundingClientRect()
      : _windowBounds.setSize(_window.innerWidth, _window.innerHeight);
  },

  calcAvailWidth: function (width, clamp) {
    if (clamp) width = Clamp(width, this.minWidth, this.maxWidth);
    if (this.snap) width = SnapFloor(width, this.snap);

    return width;
  },

  calcAvailHeight: function (height, clamp) {
    if (clamp) height = Clamp(height, this.minHeight, this.maxHeight);
    if (this.snap) height = SnapFloor(height, this.snap);

    return height;
  },

  resizeGame: function (width, height) {
    this.game.resize(width, height);

    if (this.resizeCameras) {
      this._resizeCameras(width, height);
    }
  },

  _resizeCameras: function (width, height) {
    this.game.scene.scenes.forEach(function (scene) {
      scene.cameras.resize(width, height);
    });
  },

  scaleCanvas: function (scale) {
    if (scale === this.scale) { return; }
    this.game.canvas.style.transform = 'scale(' + scale + ')';
    this.scale = scale;
  },

  onResize: function () {
    this.setPendingRefresh();

    if (this.debounce) {
      this.needsRefresh = false;
      this.debounceTimer = this.debounceDelay;
    }
  },

  setMode: function (mode) {
    this.mode = mode;
    this.setPendingRefresh();
  },

  setPendingRefresh: function () {
    this.needsRefresh = true;
  },

  configure: function (config) {
    Object.assign(this, config);
    this.setPendingRefresh();
  },

  toJSON: function () {
    return {
      debounce: this.debounce,
      debounceDelay: this.debounceDelay,
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      minHeight: this.minHeight,
      minWidth: this.minWidth,
      mode: this.mode,
      resizeCameras: this.resizeCameras,
      snap: this.snap
    };
  }

});

GameScalePlugin.FIT = FIT;
GameScalePlugin.NONE = NONE;
GameScalePlugin.RESIZE = RESIZE;
GameScalePlugin.RESIZE_AND_FIT = RESIZE_AND_FIT;

Object.seal(GameScalePlugin.prototype);

Phaser.Plugins.GameScalePlugin = GameScalePlugin;

module.exports = GameScalePlugin;
