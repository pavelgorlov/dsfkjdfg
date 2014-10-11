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

aero.register = function() {
  $('div.reg-js').each(function() {
    var reg = $(this),
        reg_btn = $('a.btn', reg);

    reg_btn.on('click', function() {
      reg.toggleClass('registered');
      setTimeout(function() {
        reg.find('div.card-form-inp').hide();
      }, 250);
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

aero.impr = function() {
  var wit = $('div.reviews-item');

  wit.each(function() {
    var wi = $(this);

    $('a.plus-circ', wi).on('click', function() {
      wit.removeClass('open');
      wi.addClass('open')
      return false;
    });
    $('a.reviews-popup-close', wi).on('click', function() {
      wi.removeClass('open')
      return false;
    });
  });

  $(document).on('click.impr', function(e) {
    var target = $(e.target);

    if ( !target.hasClass('reviews-popup') && target.parents('div.reviews-popup').length === 0 ) {
      wit.filter('.open').removeClass('open');
    }
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

  render: function(container, items, coloured) {
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
      if ( !coloured ) {
        container.removeClass('last-step');
        $('div.travel-item', container).addClass('disabled');
        $('div.travel-item', container).addClass('disabled-hover');
      } else {
        container.addClass('last-step');
      }

      $('div.travel-item', container)
        .off('mouseenter.trv')
        .off('mouseleave.trv')
        .on('mouseenter.trv', function() {
          $(this).removeClass('disabled');
        })
        .on('mouseleave.trv', function() {
          var that = $(this);
          if ( that.hasClass('disabled-hover') ) {
            that.addClass('disabled');
          }
        })
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

      aero.test.render( test_container, aero.test.steps, false );

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
              .addClass('disabled')
              .addClass('disabled-hover');

            target
              .addClass('checked')
              .removeClass('disabled')
              .removeClass('disabled-hover');

            var target_index = $('div.travel-item', test).index(target),
                target_bg = target.attr('data-background');

            if ( target_bg ) {
              test.background = 'url(' + target_bg + ')'
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
                aero.test.render( test_container, aero.test.steps[ aero.test.value[0] ].place, false );
                break;
              case 2:
                aero.test.render( test_container, aero.test.steps[ aero.test.value[0] ].place[ aero.test.value[1] ].place, true );
                test.addClass('done');
                test.css({
                  backgroundImage: test.background
                });
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
          aero.test.render( test_container, aero.test.steps, false );
          test.css({
            backgroundImage: 'none'
          });
          test.background = 'none';
          $('div.travel-description', test).html( aero.test.hint );
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
        var wic = wsh_item.filter('.current');

        wic.addClass('flow-out-next');

        setTimeout(function() {
          wic.removeClass('current');
          wic.removeClass('flow-out-next');
          wsh_item.eq(wsh_current).addClass('flow-in-next');
          wsh_item.eq(wsh_current).addClass('current');
          setTimeout(function() {
            wsh_item.eq(wsh_current).removeClass('flow-in-next');
          }, 250);
        }, 250);
      } else {
        // prev
        if ( wsh_current > 0 ) {
          wsh_current--;
        } else {
          wsh_current = wsh_len - 1;
        }
        var wic = wsh_item.filter('.current');

        wic.addClass('flow-out-prev');

        setTimeout(function() {
          wic.removeClass('current');
          wic.removeClass('flow-out-prev');
          wsh_item.eq(wsh_current).addClass('flow-in-prev');
          wsh_item.eq(wsh_current).addClass('current');
          setTimeout(function() {
            wsh_item.eq(wsh_current).removeClass('flow-in-prev');
          }, 250);
        }, 250);
      }

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

aero.versa = function() {
  $('div.versa-js').each(function() {
    var vs = $(this),
        vs_btn = $('a.btn-vote', vs);

    vs_btn.on('click.vs', function() {
      vs.addClass('versa-done');
      return false;
    });
  });
};

aero.recipe = {
  step: 0,
  substep: 0,
  preload: false,

  render: function() {
    aero.recipe.steps
      .removeClass('current')
      .eq(aero.recipe.step).addClass('current');

    aero.recipe.clock.text( recipe.steps[aero.recipe.step].duration );

    for (var i = 0, n = recipe.ingredients.length; i < n; i++ ) {
      if ( recipe.ingredients[i].step <= aero.recipe.step && recipe.ingredients[i].substep <= aero.recipe.substep ) {
        aero.recipe.ingr.eq(i).removeClass('disabled');
      } else {
        aero.recipe.ingr.eq(i).addClass('disabled');
      }
    }

    if ( aero.recipe.preload ) {
      aero.recipe.preload = null;
    }

    aero.recipe.preload = new Image();
    $(aero.recipe.preload)
      .on('load', function() {
        aero.recipe.preload = false;
        aero.recipe.bg.css({
          backgroundImage: 'url(' + recipe.steps[aero.recipe.step].hints[aero.recipe.substep].image + ')'
        });
      })
      .attr('src', recipe.steps[aero.recipe.step].hints[aero.recipe.substep].image);

    aero.recipe.desc.html(recipe.steps[aero.recipe.step].hints[aero.recipe.substep].name);
  },

  init: function() {
    if ( typeof recipe === 'undefined' ) {
      return;
    }

    aero.recipe.hold = $('div.recipe-js').eq(0);
    aero.recipe.tab = $('div.recipe-popup tbody', aero.recipe.hold);
    aero.recipe.bg = $('div.recipe-table', aero.recipe.hold);
    aero.recipe.slide = $('div.recipe-slide', aero.recipe.hold);
    aero.recipe.desc = $('div.recipe-step-description', aero.recipe.hold);
    aero.recipe.clock = $('div.recipe-clock-cell', aero.recipe.hold);
    aero.recipe.zut = $('div.zut-tab', aero.recipe.hold);
    aero.recipe.btnPrev = $('a.recipe-hint-prev', aero.recipe.hold);
    aero.recipe.btnNext = $('a.recipe-hint-next', aero.recipe.hold);
    aero.recipe.bPrev = $('a.btn-prev', aero.recipe.hold);
    aero.recipe.bNext = $('a.btn-next', aero.recipe.hold);
    aero.recipe.bNext.addClass('show');

    $('div.zut-subheader', aero.recipe.hold).text(recipe.serv);

    var recipe_tab = '';
    for ( var i = 0, n = recipe.steps.length; i < n; i++ ) {
      recipe_tab += '<tr><td>' + recipe.steps[i].title + '</td><td>' + recipe.steps[i].duration + '</td></tr>';
    }
    aero.recipe.tab.html(recipe_tab);
    $('td.recipe-total-time', aero.recipe.hold).html( recipe.time );
    aero.recipe.steps = $('tr', aero.recipe.tab);

    var zut_tab = '';
    for (var i = 0, n = recipe.ingredients.length; i < n; i++ ) {
      zut_tab += '<div class="clearfix zut-row">' + ((recipe.ingredients[i].icon) ? '<div class="zut-icon"><img src="' + recipe.ingredients[i].icon + '" alt=""></div>' : '') + '<span>' + recipe.ingredients[i].qty + '</span>' + recipe.ingredients[i].name + '</div>';
    }
    aero.recipe.zut.html(zut_tab);
    aero.recipe.ingr = $('div.zut-row', aero.recipe.zut);

    aero.recipe.render();

    aero.recipe.btnPrev.addClass('disabled');

    function _recipePrev() {
      aero.recipe.btnNext.removeClass('disabled');

      if ( aero.recipe.substep > 0 ) {
        aero.recipe.substep--;
      } else {
        aero.recipe.step--;
        aero.recipe.substep = recipe.steps[aero.recipe.step].hints.length - 1;
      }

      if ( aero.recipe.step === 0 && aero.recipe.substep === 0 ) {
        aero.recipe.btnPrev.addClass('disabled');
      }

      if ( aero.recipe.step === recipe.steps.length - 1 && aero.recipe.substep === recipe.steps[aero.recipe.step].hints.length - 1 ) {
        aero.recipe.bPrev.addClass('show');
        aero.recipe.bNext.removeClass('show');
      } else {
        aero.recipe.bPrev.removeClass('show');
        aero.recipe.bNext.addClass('show');
      }

      aero.recipe.render();
    }

    function _recipeNext() {
      aero.recipe.btnPrev.removeClass('disabled');

      if ( aero.recipe.substep < recipe.steps[aero.recipe.step].hints.length - 1 ) {
        aero.recipe.substep++;
      } else {
        aero.recipe.substep = 0;
        aero.recipe.step++;
      }

      if ( aero.recipe.step === recipe.steps.length - 1 && aero.recipe.substep === recipe.steps[aero.recipe.step].hints.length - 1 ) {
        aero.recipe.btnNext.addClass('disabled');
        aero.recipe.bPrev.addClass('show');
        aero.recipe.bNext.removClass('show');
      } else {
        aero.recipe.bNext.addClass('show');
        aero.recipe.bPrev.removeClass('show');
      }

      aero.recipe.render();
    }

    aero.recipe.btnNext.on('click', function() {
      if ( aero.recipe.btnNext.hasClass('disabled') ) {
        return false;
      }

      _recipeNext();

      return false;
    });

    aero.recipe.bNext.on('click', function() {
      _recipeNext();
      return false;
    });

    aero.recipe.btnPrev.on('click', function() {
      if ( aero.recipe.btnPrev.hasClass('disabled') ) {
        return false;
      }

      _recipePrev();

      return false;
    });

    aero.recipe.bPrev.on('click', function() {
      _recipePrev();
      return false;
    });

    aero.recipe.hold.addClass('recipe-close');

    $('a.recipe-expand').on('click', function() {
      aero.recipe.hold.removeClass('recipe-close');
      return false;
    });
  }
};

aero.space = {
  w: 0,

  place: function() {
    aero.space.left.css({
      marginLeft: -aero.space.chairWidth - aero.space.w/2*aero.space.settings.coef
    });
    aero.space.right.css({
      marginLeft: aero.space.w/2*aero.space.settings.coef
    });
    if ( aero.space.w === 95 ) {
      aero.space.title.addClass('show');
    } else {
      aero.space.title.removeClass('show');
    }
    aero.space.val.text(aero.space.w + 'см');
  },

  slider: function() {
    var spc_slider = $("#slider_chair");
    spc_slider.slider({
      range: true,
      step: 5,
      min: 0,
      max: 225,
      values: [ 50, 145 ],
      slide: function( event, ui ) {
        aero.space.w = ui.values[1] - ui.values[0];
        aero.space.place();
      }
    });

    aero.space.w = spc_slider.slider('values', 1) - spc_slider.slider('values', 0);
    aero.space.place();
  },

  init: function(settings) {
    aero.space.settings = settings || {
      width: 335,
      space: 0,
      coef: 1
    };

    var spc = $('#chair_space'),
        spc_img, spc_img_half,
        spc_img_src = spc.attr('data-src');

    if ( !spc_img_src ) {
      return;
    }

    aero.space.w = aero.space.settings.space;

    spc_img = new Image();

    $(spc_img)
      .on('load', function() {
        aero.space.left = $('<img id="space_left" src="' + spc_img_src + '" alt="">');
        aero.space.right = $('<img id="space_right" src="' + spc_img_src + '" alt="">');
        aero.space.left.appendTo(spc)
        aero.space.right.appendTo(spc)
        aero.space.chairWidth = aero.space.settings.width;

        aero.space.val = $('div.slider-chair-val').eq(0);
        if ( aero.space.val.length === 0 ) {
          aero.space.val = $('<div class="slider-chair-val"></div>').appendTo(spc);
        }
        aero.space.title = $('div.slider-chair-title').eq(0);
        if ( aero.space.title.length === 0 ) {
          aero.space.title = $('<div class="slider-chair-title">Именно такое расстояние между креслами в бизнес-классе «Аэрофлота»</div>').appendTo(spc);
        }

        aero.space.place();

        $('<div class="slider-chair-holder"><div id="slider_chair"></div></div>').appendTo(spc);
        aero.space.slider();
      })
      .attr({
        src: spc_img_src
      });
  }
};

aero.ent = function() {

  $('div.ent-screen').each(function() {
    var ent_screen = $(this);
    var ent = $('div.ent-screen-item', ent_screen);
    ent.each(function() {
      var ent_item = $(this);

      $('a.ent-screen-opener', ent_item).on('click.ent', function() {
        ent_screen.addClass('open-all');
        ent_item.addClass('open');
        return false;
      });

      ent_item.on('click.ent', function() {
        if ( ent_item.hasClass('open') ) {
          ent_item.removeClass('open');
          ent_screen.removeClass('open-all');
        }
      });
    });
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
  aero.register();
  aero.openclose();
  aero.expand();
  aero.wine();
  aero.impr();
  aero.inputs();
  aero.test.init('div.test-js');
  aero.bonus();
  aero.wishes();
  aero.main();
  aero.versa();
  aero.recipe.init();
  aero.space.init({
    width: 335, // chair width
    space: 0, // initial space btw chairs
    coef: 1.37 // space to monitor pix coef
  });
  aero.ent();

  $('.mask-reg').mask('99-99-99-99-99');
  $('.mask-reg-card').mask("99 99 99 99 99",{placeholder:"_"});
};

$(aero.init);
