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
  steps: false,
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
    if ( typeof test_json === 'undefined' ) {
      return;
    }

    aero.test.steps = test_json;

    if ( $(el).length === 0 ) {
      return;
    }

    $(el).each(function() {
      var test = $(this),
          test_container = $('div.travel-list', test);

      aero.test.description = $('div.travel-description', test).html();

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
                $('div.travel-description', test).html( aero.test.steps[ aero.test.value[0] ].place[ aero.test.value[1] ].subtitle );
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
          $('div.travel-description', test).html( aero.test.description );
          return false;
        }
      });
    });
  }
};

aero.bonus = function() {
  var bf = $('div.bonus-feature');
  bf.each(function() {
    var bf_item = $(this),
        bf_opener = $('a', bf_item),
        bf_close = $('a.bonus-feature-popup-close', bf_item);

    bf_opener.on('click.bf', function() {
      bf.removeClass('open');
      bf_item.addClass('open');
      return false;
    });

    bf_close.on('click.bf', function() {
      bf_item.removeClass('open');
      return false;
    });
  });

  var st = $('div.chair-stats-item');
  st.each(function() {
    var st_item = $(this),
        st_opener = $('a', st_item),
        st_close = $('a.bonus-feature-popup-close', st_item);

    st_opener.on('click.st', function() {
      st.removeClass('open');
      st_item.addClass('open');
      return false;
    });

    st_close.on('click.st', function() {
      st_item.removeClass('open');
      return false;
    });
  });
};

aero.wishes = function() {
  $('div.wishes').each(function() {
    var wsh = $(this),
        wsh_item = $('div.wish', wsh),
        wsh_current = wsh_item.index( wsh_item.filter('.current').eq(0) ),
        wsh_len = wsh_item.length,
        wsh_btn = $('a.btn', wsh);

    if ( wsh_current < 0 ) {
      wsh_current = 0;
    }

    wsh_item.eq(wsh_current).addClass('current');

    wsh_btn.on('click.wsh', function() {
      if ( wsh_btn.hasClass('side') ) {
        // next
        if ( wsh_current < wsh_len - 1 ) {
          wsh_current++;
        } else {
          wsh_current = 0;
        }
      } else {
        // prev
        if ( wsh_current > 0 ) {
          wsh_current--;
        } else {
          wsh_current = wsh_len - 1;
        }
      }
      wsh_item
        .removeClass('current')
        .eq(wsh_current).addClass('current');

      return false;
    });
  });
};

aero.main = function() {
  var main = $('div.promo').eq(0),
      page_w,
      page_h,
      doc = $(document),
      bone = $('div.bone').eq(0);

  function resizePage() {
    page_w = document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth : document.body.clientWidth;
    page_h = document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;

    main.css({
      minHeight: page_h - 61
    });
  }

  function scrollPage() {
    if ( doc.scrollTop() > page_h - 110 ) {
      bone
        .removeClass('collapsed')
        .addClass('fixed');
    } else if ( doc.scrollTop() > page_h - 210 ) {
      bone
        .removeClass('fixed')
        .addClass('collapsed');
    } else {
      bone
        .removeClass('collapsed')
        .removeClass('fixed');
    }
  }

  resizePage();
  scrollPage();

  $(window)
    .on('resize', function() {
      resizePage();
    })
    .on('scroll', function() {
      scrollPage();
    });
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
  aero.bonus();
  aero.wishes();
  aero.main();
};

$(aero.init);
