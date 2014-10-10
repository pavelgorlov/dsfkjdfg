var aero = window.aero || {};

aero.d3 = {
  parent: $('div.chair').eq(0),

  img_r: [],
  img_x: [],
  img_l: [],

  state: '',
  frame: 0,

  imagesToLoad: 0,
  busy: false,

  initImages: function() {
    var s;

    aero.d3.imagesToLoad += aero.d3.settings.frames.rotate;
    aero.d3.imagesToLoad += aero.d3.settings.frames.expand;

    for ( var i = 0, n = aero.d3.settings.frames.rotate; i < n; i++ ) {
      var drawImage = (i == 0) ? true : false;

      s = i.toString();

      if ( s.length === 1 ) {
        s = '00' + s;
      } else if ( s.length === 2 ) {
        s = '0' + s;
      }

      var img = aero.d3.preload( aero.d3.settings.path.rotate + s + aero.d3.settings.ext, drawImage);

      aero.d3.img_r.push(img);
    }

    for ( var i = 0, n = aero.d3.settings.frames.expand; i < n; i++ ) {
      s = i.toString();

      if ( s.length === 1 ) {
        s = '00' + s;
      } else if ( s.length === 2 ) {
        s = '0' + s;
      }

      var img = aero.d3.preload( aero.d3.settings.path.expand + s + aero.d3.settings.ext, false);

      aero.d3.img_x.push(img);
    }

    for ( var i = 0, n = aero.d3.settings.frames.light; i < n; i++ ) {
      s = i.toString();

      if ( s.length === 1 ) {
        s = '00' + s;
      } else if ( s.length === 2 ) {
        s = '0' + s;
      }

      var img = aero.d3.preload( aero.d3.settings.path.light + s + aero.d3.settings.ext, false);

      aero.d3.img_l.push(img);
    }
  },

  sliderInit: function() {
    aero.d3.slider = $("#slider");

    aero.d3.slider.slider({
      min: 0,
      max: aero.d3.settings.frames.expand - 1,
      slide: function( event, ui ) {
        aero.d3.frame = ui.value;

        if ( aero.d3.frame === 0 ) {
          // min
          aero.d3.parent.removeClass('expanded');
        } else if ( aero.d3.frame === aero.d3.settings.frames.expand - 1 ) {
          // max
          aero.d3.parent.addClass('expanded');
          aero.d3.state = 'expanded';
        }

        if ( Modernizr.canvas ) {
          try {
            aero.d3.ctx.drawImage(aero.d3.img_x[aero.d3.frame], 0, 0);
          } catch(e) {
            aero.log(e);
          }
        } else {
          aero.d3.el.attr('src', aero.d3.img_x[aero.d3.frame].src);
        }
      }
    });
  },

  preload: function(src, draw) {
    var img = new Image();

    $(img)
      .on('load', function() {
        img._ready = true;
        img.src = src;

        if ( draw ) {
          if ( Modernizr.canvas ) {
            try {
              aero.d3.ctx.drawImage(img, 0, 0);
            } catch(e) {
              aero.log(e);
            }
          } else {
            aero.d3.el.attr('src', src);
          }
        }

        aero.d3.imagesToLoad--;
      })
      .on('error', function(image, e) {
        aero.log('[Image ' + src + ' loading error]');
        img._error = true;
      })
      .attr({
        src: src
      });

    return img;
  },

  rotate: function() {
    if ( aero.d3.busy ) {
      return;
    }

    if ( aero.d3.state === 'light' ) {
      aero.d3.light(function() {
        aero.d3.expand(function() {
          aero.d3.rotate();
        });
      });
    } else if ( aero.d3.state === 'expanded' ) {
      // if expanded
      // collapse and rotate
      aero.d3.expand(function() {
        aero.d3.rotate();
      });
    } else if ( aero.d3.frame !== aero.d3.settings.frames.expand - 1 && aero.d3.frame !== 0 ) {
      aero.d3.expand(function() {
        aero.d3.rotate();
      });
    } else {
      // rotate
      aero.d3.busy = true;
      aero.d3.parent.addClass('rotated');

      var i = 0,
          len = aero.d3.settings.frames.rotate - 1,
          rAF;

      function _rotateStep() {
        if ( i < len ) {
          i++;
        } else if (rAF) {
          cancelAnimationFrame(rAF);
          rAF = null;
          aero.d3.busy = false;
          aero.d3.parent.removeClass('rotated');
        }

        if ( Modernizr.canvas ) {
          try {
            aero.d3.ctx.drawImage(aero.d3.img_r[i], 0, 0);
          } catch(e) {
            aero.log(e);
          }
        } else {
          aero.d3.el.attr('src', aero.d3.img_r[i].src);
        }
      }

      function animateRotation() {
        rAF = requestAnimationFrame( animateRotation );
        _rotateStep();
      }

      rAF = requestAnimationFrame( animateRotation );
    }
  },

  expand: function(callback) {
    if ( aero.d3.busy ) {
      return;
    }

    if ( aero.d3.state === 'light' ) {
      aero.d3.light(function() {
        aero.d3.expand();
      });
    } else if ( aero.d3.state === 'expanded' ) {
      aero.d3.busy = true;

      var i, len;
      var rAFe;

      //i = aero.d3.settings.frames.expand - 1;

      i = aero.d3.frame;

      function _collapseStep() {
        if ( i > 0 ) {
          i--;
        } else if (rAFe) {
          cancelAnimationFrame(rAFe);
          rAFe = null;
          aero.d3.busy = false;

          aero.d3.state = '';
          aero.d3.parent.removeClass('expanded');
          aero.d3.slider.slider('value', 0);
          aero.d3.frame = 0;

          if ( $.isFunction(callback) ) {
            callback.apply(this);
          }
        }

        if ( Modernizr.canvas ) {
          try {
            aero.d3.ctx.drawImage(aero.d3.img_x[i], 0, 0);
          } catch(e) {
            aero.log(e);
          }
        } else {
          aero.d3.el.attr('src', aero.d3.img_x[i].src);
        }
      }

      function animateCollapse() {
        rAFe = requestAnimationFrame( animateCollapse );
        _collapseStep();
      }

      rAFe = requestAnimationFrame( animateCollapse );
    } else {
      aero.d3.busy = true;

      var i, len;
      var rAFc;

      //i = 0;
      i = aero.d3.frame;
      len = aero.d3.settings.frames.expand - 1;

      function _expandStep() {
        if ( i < len ) {
          i++;
        } else if (rAFc) {
          cancelAnimationFrame(rAFc);
          rAFc = null;
          aero.d3.busy = false;

          aero.d3.state = 'expanded';
          aero.d3.parent.addClass('expanded');
          aero.d3.slider.slider('value', aero.d3.settings.frames.expand - 1);
          aero.d3.frame = aero.d3.settings.frames.expand - 1;

          if ( $.isFunction(callback) ) {
            callback.apply(this);
          }
        }

        if ( Modernizr.canvas ) {
          try {
            aero.d3.ctx.drawImage(aero.d3.img_x[i], 0, 0);
          } catch(e) {
            aero.log(e);
          }
        } else {
          aero.d3.el.attr('src', aero.d3.img_x[i].src);
        }
      }

      function animateExpand() {
        rAFc = requestAnimationFrame( animateExpand );
        _expandStep();
      }

      rAFc = requestAnimationFrame( animateExpand );
    }
  },

  light: function(callback) {
    if ( aero.d3.busy ) {
      return;
    }

    if ( aero.d3.state === 'expanded' ) {
      aero.d3.busy = true;

      // turn on the light
      var i, len;
      var rAFon;

      i = 0;
      len = aero.d3.settings.frames.light - 1;

      function _lightStep() {
        if ( i < len ) {
          i++;
        } else if (rAFon) {
          cancelAnimationFrame(rAFon);
          rAFon = null;
          aero.d3.busy = false;

          aero.d3.state = 'light';
          aero.d3.parent.addClass('light');

          if ( $.isFunction(callback) ) {
            callback.apply(this);
          }
        }

        if ( Modernizr.canvas ) {
          try {
            aero.d3.ctx.drawImage(aero.d3.img_l[i], 0, 0);
          } catch(e) {
            aero.log(e);
          }
        } else {
          aero.d3.el.attr('src', aero.d3.img_l[i].src);
        }
      }

      function animateLightOn() {
        rAFon = requestAnimationFrame( animateLightOn );
        _lightStep();
      }

      rAFon = requestAnimationFrame( animateLightOn );

      // aero.d3.parent.css({
      //   backgroundColor: '#000'
      // });
    } else if ( aero.d3.state === 'light' ) {
      aero.d3.busy = true;

      // turn off the light
      var i, len;
      var rAFoff;

      i = aero.d3.settings.frames.light - 1;

      function _lightOffStep() {
        if ( i > 0 ) {
          i--;
        } else if (rAFoff) {
          cancelAnimationFrame(rAFoff);
          rAFoff = null;
          aero.d3.busy = false;

          aero.d3.state = 'expanded';
          aero.d3.parent.removeClass('light');
          aero.d3.parent.addClass('expanded');

          if ( $.isFunction(callback) ) {
            callback.apply(this);
          }
        }

        if ( Modernizr.canvas ) {
          try {
            aero.d3.ctx.drawImage(aero.d3.img_l[i], 0, 0);
          } catch(e) {
            aero.log(e);
          }
        } else {
          aero.d3.el.attr('src', aero.d3.img_l[i].src);
        }
      }

      function animateLightOff() {
        rAFoff = requestAnimationFrame( animateLightOff );
        _lightOffStep();
      }

      rAFoff = requestAnimationFrame( animateLightOff );

      // aero.d3.parent.css({
      //   backgroundColor: '#fff'
      // });
    } else {
      // expand and turn on the light
      aero.d3.expand(function() {
        aero.d3.light();
      });
    }
  },

  init: function(el, settings) {
    if ( $(el).length === 0 ) {
      return;
    }

    aero.d3.settings = settings || {
      // defaults...
    };

    if ( Modernizr.canvas ) {
      var canvas = $('<canvas width="' + aero.d3.settings.width + '" height="' + aero.d3.settings.height + '"></canvas>').appendTo( $(el) );

      aero.d3.ctx = canvas.get(0).getContext('2d');
    } else {
      var img = new Image();

      img.width = aero.d3.settings.width;
      img.height = aero.d3.settings.height;

      aero.d3.el = $(img);
      aero.d3.el.appendTo( $(el) );
    }

    $(aero.d3.settings.links.rotate).on('click', function() {
      aero.d3.rotate();
      return false;
    });

    $(aero.d3.settings.links.light).on('click', function() {
      aero.d3.light();
      return false;
    });

    $(aero.d3.settings.links.expand).on('click', function() {
      aero.d3.expand();
      return false;
    });

    aero.d3.initImages();
    aero.d3.sliderInit();
  }
};

$(function() {
  aero.d3.init('#chair', {
    width: 750,
    height: 500,
    links: {
      rotate: '#chair_rotate',
      expand: '#chair_expand',
      light: '#chair_light'
    },
    path: {
      rotate: '../images/rotate/',
      expand: '../images/expand/',
      light: '../images/light/'
    },
    ext: '.jpg',
    frames: {
      rotate: 198, // rotate frames 0 - 199,
      expand: 42, // expand frames 0 - 43
      light: 26 // light frames 0 25
    }
  });
});
