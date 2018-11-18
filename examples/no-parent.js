var caption1, caption2, caption3, cursor;
var modes = ['fit', 'resize', 'resize-and-fit', 'none'];
var colors = window.colors;
var gui;

window.game = new Phaser.Game({
  width: 640,
  height: 640,
  backgroundColor: colors.navy,

  plugins: {
    global: [{
      key: 'GameScalePlugin',
      plugin: Phaser.Plugins.GameScalePlugin,
      mapping: 'gameScale',
      data: {
        debounce: false,
        debounceDelay: 50,
        maxHeight: Infinity,
        maxWidth: Infinity,
        minHeight: 0,
        minWidth: 0,
        mode: 'fit',
        resizeCameras: true,
        snap: 0
      }
    }]
  },

  scene: {
    create: function () {
      this.add.graphics()
        .lineStyle(5, 0x01FF70)
        .strokeCircle(320, 320, 320)
        .lineStyle(5, 0x0074D9)
        .strokeCircle(640, 640, 640);

      caption1 = this.add.text(0, 0, '', { fill: colors.red, font: '16px monospace', backgroundColor: 'rgba(0,0,0,0.8)' });
      caption2 = this.add.text(0, 120, '', { fill: colors.yellow, font: '16px monospace', backgroundColor: 'rgba(0,0,0,0.8)' });
      caption3 = this.add.text(0, 320, '', { fill: colors.orange, font: '16px monospace', backgroundColor: 'rgba(0,0,0,0.8)' });
      cursor = this.add.graphics().lineStyle(3, 0xff00ff).strokeRect(0, 0, 16, 16);

      this.events.on('resize', function (width, height) {
        console.log('Scene "resize" event', width, height);
      });

      this.sys.game.events.on('resize', function (width, height) {
        console.log('Game "resize" event', width, height);
      });

      var setPendingRefresh = this.gameScale.setPendingRefresh.bind(this.gameScale);

      gui = new dat.GUI({ width: 320 });
      gui.add(this.gameScale, 'debounce');
      gui.add(this.gameScale, 'debounceDelay', 0, 500, 50);
      gui.add(this.gameScale, 'maxHeight').onChange(setPendingRefresh);
      gui.add(this.gameScale, 'maxWidth').onChange(setPendingRefresh);
      gui.add(this.gameScale, 'minHeight').onChange(setPendingRefresh);
      gui.add(this.gameScale, 'minWidth').onChange(setPendingRefresh);
      gui.add(this.gameScale, 'mode', modes).onChange(setPendingRefresh);
      gui.add(this.gameScale, 'resizeCameras').onChange(setPendingRefresh);
      gui.add(this.gameScale, 'snap', 0, 100, 10).onChange(setPendingRefresh);
    },
    update: function () {
      var config = this.sys.game.config;

      caption1.setText('game.config: ' + JSON.stringify(config, ['width', 'height', 'parent'], 2));
      caption2.setText('gameScale: ' + JSON.stringify(this.gameScale, null, 2));
      caption3.setText('bounds: ' + JSON.stringify(this.gameScale.getBounds(), null, 2));

      cursor.setPosition(this.input.activePointer.x, this.input.activePointer.y);
    }
  }

});
