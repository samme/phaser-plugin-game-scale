Phaser 3 Game Scale Plugin
==========================

Scale or resize the game canvas. [Demo](https://codepen.io/samme/full/oQePbP/)

Modes
-----

- `fit` — scale the canvas up or down to fit the container, and within min/max lengths (if set).
- `resize` — change the game dimensions to fit the container, and within min/max lengths (if set).
- `resize-and-fit` — resize within min/max lengths, then scale the canvas to fit any remaining space within the container.
- `none` — set the canvas scale to 100%.

The default mode is `fit`.

Use
---

```javascript
new Phaser.Game({
  // ...
  plugins: {
    global: [{
      key: 'GameScalePlugin',
      plugin: Phaser.Plugins.GameScalePlugin,
      mapping: 'gameScale',
      data: {/* See 'Configuration' */}
    }]
  }
  // ...
});
```

If you're using ES6 modules, you can use the default export instead:

```javascript
import GameScalePlugin from 'phaser-plugin-game-scale';

new Phaser.Game({
  // ...
  plugins: {
    global: [{
      key: 'GameScalePlugin',
      plugin: GameScalePlugin,
      mapping: 'gameScale',
      data: {/* See 'Configuration' */}
    }]
  }
  // ...
});
```

Set the scale mode:

```javascript
// Within a scene:
this.gameScale.setMode('resize');
```

Listen to a scene's `resize` event to react to game size changes.

See the [examples](./examples/) for details.

Configuration
-------------

These are the default settings:

```javascript
{
  debounce: false,
  debounceDelay: 50,   // Debounce interval, in ms
  maxHeight: Infinity,
  maxWidth: Infinity,
  minHeight: 0,
  minWidth: 0,
  mode: 'fit',
  resizeCameras: true, // Resize each scene camera when resizing the game
  snap: null,          // Snap interval, in px
}
```

```javascript
// Within a scene:
this.gameScale.configure({/* … */});
```
