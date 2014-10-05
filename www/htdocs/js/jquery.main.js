var aero = window.aero || {};

aero.cfg = aero.cfg || {
  ns: '.aero'
};

aero.log = function(aerog) {
  if (typeof window.console !== 'undefined') {
    window.console.log(aerog);
  }
};

aero.parallax = function(el, settings) {
  var settings = settings || {};

  if ( Modernizr.touch ) {
    return;
  }

  $(el).each(function() {
    var hold = $(this),
        hold_off = hold.offset(),
        hold_off_x = hold_off.left,
        hold_off_y = hold_off.top,
        bg = $(settings.bg, hold),
        point = $(settings.point, hold),
        x_max, y_max,
        coef = settings.coef || .025;

    hold
      .on('mouseenter.prlx', function() {
        x_max = hold.width();
        y_max = hold.height();
      })
      .on('mousemove.prlx', function(e) {
        var x = coef * ((e.pageX - hold_off_x) / x_max - .5) * x_max,
            y = coef * ((e.pageY - hold_off_y) / y_max - .5) * y_max;

        bg.css({
          transform: 'scale(' + (1 + coef) + ') translate(' + (-x) + 'px, ' + (-y) + 'px)'
        });

        point.css({
          transform: 'translate(' + (-x/2) + 'px, ' + (-y/2) + 'px)'
        });
      })
      .on('mouseleave.prlx', function() {
        bg.css({
          transform: 'scale(1) translate(0, 0)'
        });

        point.css({
          transform: 'translate(0, 0)'
        });
      });
  });
};

aero.hint = function() {
  var hints = $('div.board-hint');

  function _hideAllHints() {
    hints.filter('.open').each(function() {
      var h = $(this);

      h.removeClass('open');

      setTimeout(function() {
        h.removeClass('opened');
      }, 250);
    });
  }

  hints.each(function() {
    var hint = $(this),
        opener = $('a.plus-circ', hint),
        closer = $('a.board-popup-close', hint);

    opener.on('click.hint', function() {
      if (hint.hasClass('opened')) {
        hint.removeClass('open');

        setTimeout(function() {
          hint.removeClass('opened');
        }, 250);
      } else {
        _hideAllHints();

        hint.addClass('opened');
        hint.addClass('open');
      }

      return false;
    });

    closer.on('click.hint', function() {
      hint.removeClass('open');

      setTimeout(function() {
        hint.removeClass('opened');
      }, 250);

      return false;
    });
  });

  $(document).on('click.hint', function(e) {
    var target = $(e.target);

    if ( !target.hasClass('board-hint') && target.parents('div.board-hint').length === 0 ) {
      _hideAllHints();
    }
  });
};

aero.init = function() {
  aero.parallax('div.board', {
    bg: 'span.board-img',
    point: 'div.board-hint',
    coef: .03 // hover scale 1.03
  });

  aero.hint();
};

$(aero.init);
