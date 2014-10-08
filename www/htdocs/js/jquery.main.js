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
        closer = $('.board-popup-close', hint);

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

aero.vote = function() {
  $('div.vote-js').each(function() {
    var vote = $(this),
        vote_form = $('form', vote);

    vote_form.on('submit', function() {
      vote.addClass('voted');
      return false;
    });
  });
};

aero.openclose = function() {
  $('.open-close-js').each(function() {
    var oc = $(this),
        oc_link = $('a.opener-closer', oc),
        oc_slide = $('div.open-close-slide', oc);

    if ( !oc.hasClass('open') ) {
      oc_slide.hide();
    }

    oc_link.on('click.oc', function() {
      if ( oc.hasClass('open') ) {
        oc.removeClass('open');
        oc_slide.slideUp(250);
      } else {
        oc.addClass('open');
        oc_slide.slideDown(250);
      }

      return false;
    });
  });
};

aero.expand = function() {
  $('div.expand-js').each(function() {
    var exp = $(this),
        exp_opener = $('a.expand-link', exp),
        exp_slide = $('.expand-slide', exp);

    if ( !exp.hasClass('open') ) {
      exp_slide.hide();
    }

    exp_opener.on('click.xp', function() {
      if ( exp.hasClass('open') ) {
        exp.removeClass('open');
        exp_slide.slideUp(250);
      } else {
        exp.addClass('open');
        exp_slide.slideDown(250);
      }

      return false;
    });
  });
};

aero.wine = function() {
  var wit = $('div.wine-item');
  wit.each(function() {
    var wi = $(this);

    $('a', wi).on('click', function() {
      wit.removeClass('open');
      wi.addClass('open')
      return false;
    });
    $('a.wine-item-popup-close', wi).on('click', function() {
      wi.removeClass('open')
      return false;
    });
  });
};

aero.inputs = function() {
  if ( typeof $.fn.urInputs === 'undefined' ) {
    return;
  }

  $('.custom-inputs').urInputs({
    replaceCheckboxes: true
  });
};

aero.test = {
  value: [],
  steps: test_json,
  title: '',

  tpl: '<div class="travel-item" data-background="{{background}}">\
          <div class="travel-img">\
            <img src="{{image}}" width="159" height="159" alt="">\
            <i></i><b></b>\
          </div>\
          <div class="travel-label">{{{title}}}</div>\
          <div class="travel-popup">\
            {{{popup}}}<a href="#" class="travel-popup-close">x</a>\
          </div>\
        </div>',

  render: function(container, items) {
    var items_html = '';

    if ( typeof items === 'undefined' ) {
      alert('Ошибка. Пожалуйста, попробуйте перезагрузить страницу');
      return;
    }

    container.addClass('move-out');

    setTimeout(function() {
      container.html('');

      for ( var i = 0, n = items.length; i < n; i++ ) {
        var item_data = {
          image: items[i].image,
          background: items[i].background,
          title: items[i].title,
          popup: items[i].description
        };

        items_html += Mustache.render(aero.test.tpl, item_data);
      }
      container.append( items_html );
      container.removeClass('move-out');
    }, 250);
  },

  init: function(el) {
    if ( $(el).length === 0 ) {
      return;
    }

    $(el).each(function() {
      var test = $(this),
          test_container = $('div.travel-list', test);

      aero.test.description = $('div.travel-description', test);

      test.addClass('invalid');

      aero.test.render( test_container, aero.test.steps );

      test.on('click.test', function(e) {
        var target = $(e.target);

        if ( target.hasClass('travel-popup-close') ) {
          target.closest('div.travel-item').removeClass('active');
          return false;
        }

        if ( target.parents('div.travel-item').length ) {
          target = target.closest('div.travel-item');
        }

        if ( target.hasClass('travel-item') ) {
          if ( test.hasClass('done') ) {
            $('div.travel-item', test).removeClass('active');
            target.addClass('active');
          } else {
            $('div.travel-item', test)
              .removeClass('checked')
              .addClass('disabled');

            target
              .addClass('checked')
              .removeClass('disabled');

            var target_index = $('div.travel-item', test).index(target),
                target_bg = target.attr('data-background');

            if ( target_bg ) {
              test.css({
                backgroundImage: 'url(' + target_bg + ')'
              });
            }

            test.attr('data-value', target_index);

            test.removeClass('invalid');
          }

          return false;
        }

        if ( target.hasClass('btn-next') ) {
          if ( !test.hasClass('invalid') ) {
            aero.test.value.push( test.attr('data-value') );

            switch ( aero.test.value.length ) {
              case 1:
                aero.test.render( test_container, aero.test.steps[ aero.test.value[0] ].place );
                break;
              case 2:
                aero.test.render( test_container, aero.test.steps[ aero.test.value[0] ].place[ aero.test.value[1] ].place );
                test.addClass('done');
                break;
              case 3:
                //aero.test.render( test_container, aero.test.steps[ aero.test.value[0] ].place[ aero.test.value[1] ].place[ aero.test.value[2] ].place );
                break;
            }

            test.addClass('invalid');
          }

          return false;
        }

        if ( target.hasClass('btn-reset') ) {
          test.removeClass('done');
          aero.test.value = [];
          test.addClass('invalid');
          aero.test.render( test_container, aero.test.steps );
          test.css({
            backgroundImage: 'none'
          });
          $('div.travel-description', test).text( aero.test.description );
          return false;
        }
      });
    });
  }
};

aero.init = function() {
  aero.parallax('div.board', {
    bg: 'span.board-img',
    point: 'div.board-hint',
    coef: .03 // hover scale 1.03
  });

  aero.hint();
  aero.vote();
  aero.openclose();
  aero.expand();
  aero.wine();
  aero.inputs();
  aero.test.init('div.test-js');
};

$(aero.init);
