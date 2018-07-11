Phaser 3 Game Scale Plugin
==========================

Scale or resize the game canvas.

Modes
-----

- `fit` — scale the canvas up or down to fit the container, within min/max lengths (if set).
- `resize` — change the game dimensions to fit the container, within min/max lengths (if set).
- `resize-and-fit` — resize within min/max lengths, then scale the canvas to fit any remaining space within the container.
- `none` — set the canvas scale to 100%.

The default mode is `fit`.

Use
---

```javascript
new Phaser.Game({
  // ...
  plugins: {
    global: [{ key: 'GameScalePlugin', plugin: Phaser.Plugins.GameScalePlugin, start: true }]
  }
  // ...
});
```

Set the scale mode:

```javascript
// Within a postBoot callback, use the `game` argument.
// Within a scene, use `this.sys.game`.
game.plugins.get('GameScalePlugin').setMode('resize');
```

Set several options (defaults shown):

```javascript
game.plugins.get('GameScalePlugin').configure({
  debounce: false,
  debounceDelay: 100,
  maxHeight: Infinity,
  maxWidth: Infinity,
  minHeight: 0,
  minWidth: 0,
  mode: 'fit',
  resizeCameras: true,
  snap: null,
});
```

Listen to a scene's `resize` event to react to game size changes.

See the [examples](./examples/) for details.
