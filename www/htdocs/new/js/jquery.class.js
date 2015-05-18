////////////////////////////////////////
window._flyTabs = {

	'ccl-longdistance': {
		airbus_330:	'Airbus 330',
		boeing_777:	'Вoeing 777'
	},
	/**********/
	'ccl-middledistance': {
		ssj_100:	'Sukhoi Superjet 100',
		airbus_320:	'Airbus 320/319/321',
		boeing_737:	'Вoeing 737'
	} 
};

////////////////////////////////////////
window.chairItems = {
    chair_benefit: 	['Преимущество кресел', 'Кресла устроены так, чтобы пассажиры чувствовали себя максимально удобно. Специальный механизм позволяет не&nbsp;откидывать для этого спинку кресла, а&nbsp;значит Ваш лиичный комфорт не&nbsp;будет нарушен.'],
    table: 			['Раскладывающийся столик', 'Каждое кресло оборудовано удобным раскладывающимся столиком. Ваш перелет может быть не&nbsp;только комфортным, но&nbsp;и&nbsp;продуктивным.'],
    road_complect: 	['Дорожный набор', 'Для удобства во&nbsp;время полёта Вам предоставят дорожный набор.'],
    monitor: 		['Монитор']
};

/*
window._flyData{}
	key name - airplane id
		info[]:
			0 - distance
			1 - peoples
			2 - 3D-tour page link
			3 - 3D-tour cover image
		
		ent[] + wifi[]:
			0 - text
			1 - link text
			2 - link url
		
    	chairItems{}:
			key name - plus-id form window.chairItems[]
			0 - reverse 0 || 1
			1 - left px str
			2 - top px str 
			3 - image src
			4 - personal desc (optional)
	*/



window._flyData = {
  	/*****************/
  	ssj_100: {
      	info: ['2 400', "87", 'http://lavdanskie.ru/aeroflotfeb2015/SSJ_1/','../images/econom/100-ec.png','http://lavdanskie.ru/aeroflotfeb2015/SSJ_2/'],
      	chair3d: '_SSJ.html',
      	chairImage: '../images/econom/chair_100.jpg',
      	chairItems: {
          	chair_benefit:  [0,'240px','210px','SSJ-kreslo.jpg'], 
          	table: 			[1,'730px','219px','SSJ-table.jpg']
        }
    },
    /*****************/
  	airbus_320: {
      	info: ['4 000', "140/158/116/170/", 'http://lavdanskie.ru/aeroflotfeb2015/a320_2/','../images/econom/320-ec.png','http://lavdanskie.ru/aeroflotfeb2015/a320_3/'],
      	chair3d: '_320.html',
      	chairImage: '../images/econom/chair_320.jpg',
      	chairItems: {
          	chair_benefit:  [0,'240px','210px','A320-kreslo.jpg'], 
          	table: 			[1,'730px','219px','A320-table.jpg']
        }
    },
    /*****************/
  	airbus_330: {
      	info: ['11 200', "241/302/296/301", 'http://lavdanskie.ru/aeroflotfeb2015/a330_1/','../images/econom/330-ec.png','http://lavdanskie.ru/aeroflotfeb2015/a330_4/'],
      	ent: ["<p>К&nbsp;услугам пассажиров на&nbsp;борту самолетов Airbus А330 мониторы мультимедийной развлекательной системы Panasonic. Ознакомьтесь с&nbsp;новинками кинематографа, прослушайте аудиокниги или музыкальные альбомы. Летите с&nbsp;детьми? Включите им&nbsp;мультфильмы или компьютерные игры, и&nbsp;перелет станет действительно увлекательным.</p>","Содержание развлекательной системы на&nbsp;борту Airbus А330","http://www.aeroflot.ru/cms/flight/entertainment_a330"],
      	wifi: ["<p>С&nbsp;интернетом на&nbsp;борту&nbsp;Вы можете оставаться на&nbsp;связи с&nbsp;семьей, друзьями и&nbsp;коллегами даже в&nbsp;полете!</p> <p>В&nbsp;2012 году на&nbsp;ряде воздушных судов Аэрофлота запущена услуга &laquo;Интернет на&nbsp;борту&raquo;, позволяющая пассажирам пользоваться Wi-Fi доступом в&nbsp;Интернет во&nbsp;время полета.</p> <p>Оплатить Wi-Fi на&nbsp;борту можно кредитной или дебетовой картой во&nbsp;время полета. К&nbsp;оплате принимаются карты VISA, MasterCard, American Express, JCB и&nbsp;Discover.</p>","Самолеты с&nbsp;Wi-Fi на&nbsp;борту","http://www.aeroflot.ru/cms/flight/on_board/at_height"],					
      	chair3d: '_330.html',
      	chairImage: '../images/econom/chair_330.jpg',
      	chairItems: {
          	/*
              chairItems:
              	key name - plus id form window.chairItems[]
              	1 - reverse true || false
              	2 - left px str
              	3 - top px str 
              	4 - image src
              	5 - personal desc (optional)
          	*/
          	chair_benefit:  [0,'180px','270px','A330-kreslo.jpg'], 
          	table: 			[1,'730px','330px','A330-table.jpg'], 
          	road_complect:  [0,'350px','340px','A330-nabor.jpg'], 
          	monitor: 		[1,'670px','240px','A330-monitor.jpg','Спинки кресел на&nbsp;борту Boeing&nbsp;777 оснащены мониторами новой системы развлечения Thales в&nbsp;зависимости от&nbsp;класса обслуживания.']
        }
  	}, 
  	/*****************/
  	boeing_737: {
      	info: ['4 500', "158", 'http://lavdanskie.ru/aeroflotfeb2015/737_1/','../images/econom/737-ec.png','http://lavdanskie.ru/aeroflotfeb2015/737_2/'],
      	chair3d: '_737.html',
      	chairImage: '../images/econom/chair_737.jpg',
      	chairItems: {
          	chair_benefit:  [0,'280px','170px','B737-kreslo.jpg'], 
          	table: 			[1,'694px','288px','B737-table.jpg']
        }
    },
	/*****************/
  	boeing_777: {
	  	info: ['11 200', "402", 'http://lavdanskie.ru/aeroflotfeb2015/777_1/','../images/econom/777-ec.png','http://lavdanskie.ru/aeroflotfeb2015/777_4/'],
      	ent: ["<p>Перелет не&nbsp;покажется скучным с&nbsp;развлекательной мультимедийной системой Thales. Классика и&nbsp;новинки кинематографа, аудиокниги и&nbsp;более 600 музыкальных альбомов, компьютерные игры и&nbsp;мультфильмы для детей&nbsp;&mdash; это далеко не&nbsp;вся программа, предлагаемая к&nbsp;услугам пассажиров на&nbsp;дальнемагистральных рейсах Аэрофлота. Вы&nbsp;также можете увидеть в&nbsp;режиме реального времени карту Вашего полета или картинку с&nbsp;внешней видео-камеры.</p>","Узнайте больше о&nbsp;мультимедийных возможностях","http://www.aeroflot.ru/cms/flight/entertaiment_B777_ec"],
      	wifi: ["<p>На&nbsp;всех самолетах типа Boeing&nbsp;777 парка Аэрофлота Вы&nbsp;сможете воспользоваться беспроводным доступом в&nbsp;Интернет.</p> <p>Оплатить Wi-Fi на&nbsp;борту можно кредитной или дебетовой картой во&nbsp;время полета. К&nbsp;оплате принимаются карты VISA, MasterCard, American Express, JCB и&nbsp;Discover.</p>","Самолеты с&nbsp;Wi-Fi на&nbsp;борту","http://www.aeroflot.ru/cms/flight/on_board/at_height"],
      	chair3d: '_777.html',
      	chairImage: '../images/econom/chair_777.jpg',
      	chairItems: {
          	chair_benefit:  [0,'180px','270px','B777-kreslo.jpg'], 
          	table: 			[1,'730px','330px','B777-table.jpg'], 
          	road_complect:  [0,'350px','340px','B777-nabor.jpg'], 
          	monitor: 		[1,'724px','252px','B777-monitor.jpg','Спинки кресел на&nbsp;борту Boeing&nbsp;777 оснащены мониторами с&nbsp;диагональю от&nbsp;8,9 до&nbsp;15,4 дюймов новой системы развлечения Thales в&nbsp;зависимости от&nbsp;класса обслуживания.']
        }
  	} 
};
						
function plusTemplate(title, desc, left, top, img, isReverse){
	                        
	var reverseClass = isReverse ? ' reverse' : '';
	                        
	return '<div class="cclInterior_plus'+reverseClass+'" style="top:'+top+'; left:'+left+';"><div class="cclInterior_icon"><img alt="" src="../images/plus/'+img+'"><div class="cclInterior_title">'+title+'</div></div><div class="cclInterior_text"><div class="cclInterior_textTitle">'+title+'</div><div class="cclInterior_desc">'+desc+'</div><span class="cclInterior_textBg"></span> <a class="cclInterior_close" href="#">x</a></div></div>';               

}


var aeroclass = window.aeroclass || {};

aeroclass.plus = function() {
    var c_plus = $('.cclInterior_plus'),
        c_over = c_plus.eq(0).closest('div.cclInterior').find('div.cclInterior_overlay'),
        c_img = c_plus.eq(0).closest('div.cclInterior').find('img.cclInterior_imgScale');

    c_plus.each(function() {
      var comfort = $(this),
          comfortOpener = $('div.cclInterior_icon', comfort),
          comfortCloser = $('a.cclInterior_close', comfort);

      comfortOpener.click(function() {
        if ( comfort.hasClass('open') ) {
          return;
        } else {
          var c_o = $('.cclInterior_plus').filter('.open');

          if ( c_o.length ) {
            c_o.each(function() {
              var that = $(this);
              that.removeClass('open');

              setTimeout(function() {
                that.removeClass('opened');
              }, 300);
            });

            setTimeout(function() {
              comfort
                .addClass('open')
                .addClass('opened');
            }, 300);
          } else {
            c_over.addClass('show');
            setTimeout(function() {
              c_img.css({
                'transform': 'scale(1)'
              });
              comfort
                .addClass('open')
                .addClass('opened');
            }, 300)
          }
        }

        return false;
      });

      comfortCloser.click(function() {
        comfort.removeClass('open');
        c_img.css({
          'transform': 'scale(1.04)'
        });

        setTimeout(function() {
          comfort.removeClass('opened');
          c_over.removeClass('show');
        }, 300);

        return false;
      });
    });

    $(document).click(function(e) {
      var target = $(e.target);

      if ( !target.hasClass('cclInterior_plus') && target.parents('.cclInterior_plus').length === 0 ) {
        var c_f = c_plus.filter('.open');
        c_f.removeClass('open');
        c_img.css({
          'transform': 'scale(1.04)'
        });

        setTimeout(function() {
          c_f.removeClass('opened');
          c_over.removeClass('show');
        }, 300);
      }
    });
};

aeroclass.combo = function() {
  $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },

      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";

        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            tooltipClass: "ui-state-highlight"
          });

        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },

          autocompletechange: "_removeIfInvalid"
        });
      },

      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;

        $( "<a>" )
          .attr( "tabIndex", -1 )
          //.attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .mousedown(function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .click(function() {
            input.focus();

            // Close if already visible
            if ( wasOpen ) {
              return;
            }

            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },

      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },

      _removeIfInvalid: function( event, ui ) {

        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }

        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });

        // Found a match, nothing to do
        if ( valid ) {
          return;
        }

        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },

      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
    
    //$('.combobox-distance').combobox();
};

aeroclass.nav = function() {
    var win = $(window);
    var ccl = $('div.cclWrapper');
    if (ccl.length === 0 || typeof $.fn.scrollTo === 'undefined') {
        return;
    }
    var cclHeight = parseInt(ccl.height(), 10);
    var cclHeightHalf = cclHeight/2;
    var cclTop = ccl.offset().top + cclHeight;
    var winTop, winST;

    $('div.ccl-anchor-js').each(function() {
        var ccl_nav = $(this);
        var ccl_navParent = ccl_nav.parent();
        var winPosTop = $('div.cclContent').position().top;
        var ccl_navLink = $('a', ccl_nav);
        var ccl_navArr = [];

        ccl_nav.css({
            marginTop: -parseInt(ccl_nav.height(), 10)/2
        })

        ccl_navLink.each(function() {
            var anchor = $(this).attr('href');
            anchor = anchor.substr(anchor.indexOf('#'));
            var anchor_box = $(anchor);
            var anchor_item = {
                'anchor': anchor,
                'offset': anchor_box.offset().top
            };
            ccl_navArr.push(anchor_item);
        });

        win.on('load.nav', function() {
            for (var i=0, n=ccl_navArr.length; i<n; i++) {
                var hash = $(ccl_navArr[i].anchor);

                if (hash.length){
                    ccl_navArr[i].offset = hash.offset().top
                }
            }
        });

        // click nav
        ccl_navLink.on('click', function() {
            var anchor = $(this).attr('href');
            anchor = anchor.substr(anchor.indexOf('#'))
            win.scrollTo(anchor, 250);
            return false;
        });

        function ccl_navSet() {
            winTop = ccl_navParent.offset().top;
            winST = win.scrollTop();
            if (winTop > cclHeight || winST < winPosTop) {
                ccl_nav.addClass('hide');
            } else {
                ccl_nav.removeClass('hide');
            }

            ccl_navLink.removeClass('current');

            for (var i = 0, n = ccl_navArr.length; i < n; i++) {
                if ( winST >= ccl_navArr[i].offset ) {
                    ccl_navLink.removeClass('current');
                    ccl_navLink.eq(i).addClass('current');
                }
            }
        }

        // position nav
        ccl_navSet();
        win.on('scroll.nav', function() {
            ccl_navSet();
        });
    });
};

aeroclass.cycle = function() {
    $('div.ccl_cycle-js').cycle({
        timeout: 5000,
        speed: 1000,
        fx: 'fade',
        slideExpr: 'div.cclCycle a',
        next: '#ccl_cycle_next',
        prev: '#ccl_cycle_prev',
        pager: '#ccl_cycle_pager'
    });
};

aeroclass.init = function() {
  aeroclass.plus();
  aeroclass.combo();
  aeroclass.nav();
  aeroclass.cycle();
}

$(aeroclass.init);




/*TEMP!!!*/
$(function(){

var css = '';
	css += '.cclContent *{outline: 1px solid rgba(255,0,0,.2);}';
	css += '.cclContent p{outline: 1px solid rgba(0,0,255,.5);}';
	css += '.cclContent img{outline: 1px solid rgba(0,255,0,.5);}';

//$('head').append('<style>'+css+'</style>');
//$('body').append('<div style="z-index:1234;width: 2px; background:purple; position: fixed; height: 100%; top:0;left: 50%; margin-left:-1px;"></div>')
	
});
