var caption1, caption2, caption3, cursor;
var modes = ['fit', 'resize', 'resize-and-fit', 'none'];
var colors = window.colors;

window.game = new Phaser.Game({
  width: 640,
  height: 640,
  backgroundColor: colors.navy,

  plugins: {
    global: [{ key: 'GameScalePlugin', plugin: Phaser.Plugins.GameScalePlugin, mapping: 'gameScale' }]
  },

  callbacks: {
    postBoot: function (game) {
      game.plugins.get('GameScalePlugin').configure({
        debounce: false,
        debounceDelay: 100,
        maxWidth: 960,
        maxHeight: 960,
        minWidth: 320,
        minHeight: 320,
        mode: Phaser.Plugins.GameScalePlugin.FIT,
        snap: 20
      });
    }
  },

  scene: {
    create: function () {
      this.add.graphics()
        .lineStyle(5, 0x01FF70)
        .strokeCircle(320, 320, 320)
        .lineStyle(5, 0x0074D9)
        .strokeCircle(480, 480, 480);

      caption1 = this.add.text(0, 0, '', { fill: colors.red, font: '32px monospace' });
      caption2 = this.add.text(0, 40, '', { fill: colors.yellow, font: '16px monospace', backgroundColor: 'rgba(0,0,0,0.8)' });
      caption3 = this.add.text(0, 240, '', { fill: colors.orange, font: '16px monospace', backgroundColor: 'rgba(0,0,0,0.8)' });
      cursor = this.add.graphics().lineStyle(3, 0xff00ff).strokeRect(0, 0, 16, 16);

      this.input.on('pointerup', function () {
        this.gameScale.setMode(modes[(1 + modes.indexOf(this.gameScale.mode)) % modes.length]);
      }, this);

      this.events.on('resize', function (width, height) {
        console.log('Scene "resize" event', width, height);
      });

      this.sys.game.events.on('resize', function (width, height) {
        console.log('Game "resize" event', width, height);
      });
    },
    update: function () {
      var config = this.sys.game.config;

      caption1.setText(config.width + ' ' + config.height);
      caption2.setText(JSON.stringify(this.gameScale, null, 2));
      caption3.setText(JSON.stringify(this.gameScale.getBounds(), null, 2));

      cursor.setPosition(this.input.activePointer.x, this.input.activePointer.y);
    }
  }

});
