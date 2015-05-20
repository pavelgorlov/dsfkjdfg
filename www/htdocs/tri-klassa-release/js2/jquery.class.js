;(function($) {
    $(function() {
        $('a.fancy-img').fancybox({
            padding: 30
        });
        $('a.fancy-iframe').fancybox({
            type: 'iframe',
            width: 911,
            height: 480,
            padding: 30
        });
        $('a.fancy-video').fancybox({
            'padding': 30,
            'autoScale'     : false,
            'transitionIn'  : 'none',
            'transitionOut' : 'none',
            'width'     : 680,
            'height'        : 495,
            'type'          : 'swf',
            'swf'           : {
              'wmode'       : 'transparent',
                'allowfullscreen'   : 'true'
            }
        });
    });
})(jQuery);


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

window.chairItems = {
 chair_benefit: 	['Преимущество кресел', 'Кресла устроены так, чтобы пассажиры чувствовали себя максимально удобно. Специальный механизм позволяет не&nbsp;откидывать для этого спинку кресла, а&nbsp;значит Ваш личный комфорт не&nbsp;будет нарушен.'],
 table: 			['Раскладывающийся столик', 'Каждое кресло оборудовано удобным раскладывающимся столиком. Ваш перелет может быть не&nbsp;только комфортным, но&nbsp;и&nbsp;продуктивным.'],
 road_complect: 	['Дорожный набор', 'Для удобства во&nbsp;время полёта Вам предоставят дорожный набор.'],
 monitor: 		['Монитор']
};

window._flyData = {
 	/*****************/
 	ssj_100: {
 	info: ['2 400', "87", 'http://lavdanskie.ru/aeroflotfeb2015/SSJ_1/','images/econom/100-ec.png','http://lavdanskie.ru/aeroflotfeb2015/SSJ_2/','images/business/SSJ-100-ec-776x210.png','images/business/SSJ-wp.jpg','images/business/SSJ-slp.jpg'],
 	chair3d: '?chair=SSJ',
 	chairImage: 'images/econom/chair_100.jpg',
 	chairItems: {
 		chair_benefit:  [0,'240px','210px','SSJ-kreslo.jpg'], 
 		table: 			[1,'730px','219px','SSJ-table.jpg']
 	}
 },
 /*****************/
airbus_320: {

 	info: ['4 000', "140/158/116/170/", 'http://lavdanskie.ru/aeroflotfeb2015/a320_2/','images/econom/320-ec.png','http://lavdanskie.ru/aeroflotfeb2015/a320_3/','images/business/320-ec-776x210.png','images/business/320-wp.jpg','images/business/320-slp.jpg'],
 	chair3d: '?chair=320',
 	chairImage: 'images/econom/chair_320.jpg',
 	chairItems: {
 		chair_benefit: [0,'240px','210px','A320-kreslo.jpg'], 
 		table: 			[1,'730px','219px','A320-table.jpg']
 	}
 },
 /*****************/
 
 	airbus_330: {
	 	facts: {
		 	left: ['Пространство класса Бизнес ПРЕЗИДЕНТ','<p>На&nbsp;самолетах Airbus А330 выполняется основная часть межконтинентальных перелетов Аэрофлота. В&nbsp;классе Бизнес на&nbsp;борту Airbus A330 Вас ждут удобные широкие кресла, увеличенное расстояние между сидениями, индивидуальная система освещения и&nbsp;не&nbsp;только.</p> <p>Чтобы отдохнуть во&nbsp;время перелета, разложите Ваше кресло в&nbsp;горизонтальное положение или настройте удобное положение спинки и&nbsp;подставки для ног.</p>'], 	
		 	right: ['<p>Пассажирам класса Бизнес Аэрофлота на борту Airbus&nbsp;330 предлагается:</p>',[
		 		'Индивидуальная система развлечений Panasonic с&nbsp;регулярно обновляющейся музыкальной и&nbsp;кинопрограммой',
		 		'Блюда, сервированные в&nbsp;фарфоровой и&nbsp;стеклянной посуде',
		 		'Кресла, раскладывающиеся в&nbsp;горизонтальную кровать',
		 		'В течение всего рейса пассажирам предлагаются прохладительные и&nbsp;алкогольные напитки'
			],'http://www.aeroflot.ru/cms/flight/business_class/president']
	 	},
 	info: ['11 200', "241/302/296/301", 'http://lavdanskie.ru/aeroflotfeb2015/a330_1/','images/econom/330-ec.png','http://lavdanskie.ru/aeroflotfeb2015/a330_5/','images/business/330-ec-776x210.png','images/business/330-wp.jpg','images/business/330-slp.jpg'],
 	ent: ["<p>К&nbsp;услугам пассажиров на&nbsp;борту самолетов Airbus А330 мониторы мультимедийной развлекательной системы Panasonic. Ознакомьтесь с&nbsp;новинками кинематографа, прослушайте аудиокниги или музыкальные альбомы. Летите с&nbsp;детьми? Включите им&nbsp;мультфильмы или компьютерные игры, и&nbsp;перелет станет действительно увлекательным.</p>","Содержание развлекательной системы на&nbsp;борту Airbus А330","http://www.aeroflot.ru/cms/flight/entertainment_a330"],
 	wifi: ["<p>С&nbsp;интернетом на&nbsp;борту&nbsp;Вы можете оставаться на&nbsp;связи с&nbsp;семьей, друзьями и&nbsp;коллегами даже в&nbsp;полете!</p> <p>В&nbsp;2012 году на&nbsp;ряде воздушных судов Аэрофлота запущена услуга &laquo;Интернет на&nbsp;борту&raquo;, позволяющая пассажирам пользоваться Wi-Fi доступом в&nbsp;Интернет во&nbsp;время полета.</p> <p>Оплатить Wi-Fi на&nbsp;борту можно кредитной или дебетовой картой во&nbsp;время полета. К&nbsp;оплате принимаются карты VISA, MasterCard, American Express, JCB и&nbsp;Discover.</p>","Самолеты с&nbsp;Wi-Fi на&nbsp;борту","http://www.aeroflot.ru/cms/flight/on_board/at_height"],					
 	chair3d: '?chair=330',
 	chairImage: 'images/econom/chair_330.jpg',
	chairItems: {
		chair_benefit: 	[0,'180px','270px','A330-kreslo.jpg'], 
		table: 			[1,'730px','330px','A330-table.jpg'], 
		road_complect: 	[0,'350px','340px','A330-nabor.jpg'], 
		monitor: 		[1,'670px','240px','A330-monitor.jpg','Монитор спинки кресел на&nbsp;борту Airbus A330 оснащены мониторами с&nbsp;диагональю 8,9 дюймов мультимедийной развлекательной системы Panasonic.']
	}
	}, 
 	/*****************/
 	boeing_737: {
	 	info: ['4 500', "158", 'http://lavdanskie.ru/aeroflotfeb2015/737_1/','images/econom/737-ec.png','http://lavdanskie.ru/aeroflotfeb2015/737_2/','images/business/737-ec-776x210.png','images/business/737-wp.jpg','images/business/737-slp.jpg'],
		chair3d: '?chair=737',
		chairImage: 'images/econom/chair_737.jpg',
		chairItems: {
			chair_benefit: [0,'280px','170px','B737-kreslo.jpg'], 
			table: 			[1,'694px','288px','B737-table.jpg']
		}
	},
	/*****************/
 	boeing_777: {
	 	facts: {
		 	left: ['Пространство класса Бизнес ПРЕЗИДЕНТ','<p>Расстояние между креслами салона класса Бизнес на&nbsp;борту Boeing 777 составляет 152,4&nbsp;см. Это и&nbsp;возможность зафиксировать кресло в&nbsp;различных положениях, включая горизонтальное, позволит отдохнуть в&nbsp;условиях полета.</p></p>Для удобства пассажиров класса Бизнес в&nbsp;передней части самолета располагаются отдельные туалетные комнаты.</p>'], 	
		 	right: ['<p>Пассажирам класса Бизнес Аэрофлота на&nbsp;борту Boeing&nbsp;777 предлагается:</p>',[
		 		'Индивидуальная стационарная система развлечений Thales с&nbsp;регулярно обновляющейся музыкальной и&nbsp;кинопрограммой',
		 		'Блюда, сервированные в&nbsp;фарфоровой и&nbsp;стеклянной посуде',
		 		'Кресла, раскладывающиеся в&nbsp;горизонтальную кровать',
		 		'В течение всего рейса пассажирам предлагаются прохладительные и&nbsp;алкогольные напитки'
			],'http://www.aeroflot.ru/cms/flight/business_class/president']
	 	},
	 	info: ['11 200', "402", 'http://lavdanskie.ru/aeroflotfeb2015/777_1/','images/econom/777-ec.png','http://lavdanskie.ru/aeroflotfeb2015/777_5/','images/business/777-ec-776x210.png','images/business/777-wp.jpg','images/business/777-slp.jpg'],
 	ent: ["<p>Перелет не&nbsp;покажется скучным с&nbsp;развлекательной мультимедийной системой Thales. Классика и&nbsp;новинки кинематографа, аудиокниги и&nbsp;более 600 музыкальных альбомов, компьютерные игры и&nbsp;мультфильмы для детей&nbsp;&mdash; это далеко не&nbsp;вся программа, предлагаемая к&nbsp;услугам пассажиров на&nbsp;дальнемагистральных рейсах Аэрофлота. Вы&nbsp;также можете увидеть в&nbsp;режиме реального времени карту Вашего полета или картинку с&nbsp;внешней видео-камеры.</p>","Узнайте больше о&nbsp;мультимедийных возможностях","http://www.aeroflot.ru/cms/flight/entertaiment_B777_ec"],
 	wifi: ["<p>На&nbsp;всех самолетах типа Boeing&nbsp;777 парка Аэрофлота Вы&nbsp;сможете воспользоваться беспроводным доступом в&nbsp;Интернет.</p> <p>Оплатить Wi-Fi на&nbsp;борту можно кредитной или дебетовой картой во&nbsp;время полета. К&nbsp;оплате принимаются карты VISA, MasterCard, American Express, JCB и&nbsp;Discover.</p>","Самолеты с&nbsp;Wi-Fi на&nbsp;борту","http://www.aeroflot.ru/cms/flight/on_board/at_height"],
 	chair3d: '?chair=777',
 	chairImage: 'images/econom/chair_777.jpg',
 	chairItems: {
 	chair_benefit: [0,'180px','270px','B777-kreslo.jpg'], 
 	table: 			[1,'730px','330px','B777-table.jpg'], 
 	road_complect: [0,'350px','340px','B777-nabor.jpg'], 
 	monitor: 		[1,'724px','252px','B777-monitor.jpg','Спинки кресел на&nbsp;борту Boeing&nbsp;777 оснащены мониторами с&nbsp;диагональю от&nbsp;8,9 до&nbsp;15,4 дюймов новой системы развлечения Thales в&nbsp;зависимости от&nbsp;класса обслуживания.']
 }
 	} 
};

window._flyData.ssj_100.facts = 
window._flyData.airbus_320.facts = 
window._flyData.boeing_737.facts = {
		 	left: ['Пространство класса Бизнес ПРЕМЬЕР','<p>Кресла в&nbsp;салоне класса &laquo;Премьер&raquo; обеспечивают комфортное путешествие на&nbsp;средних и&nbsp;коротких рейсах.</p><p>Их&nbsp;конструкция позволяет регулировать положение спинки, например, привести ее&nbsp;в&nbsp;вертикальное положение для удобства работы во&nbsp;время полета или отклонить назад и&nbsp;превратить сиденье в&nbsp;настоящее уютное домашнее кресло.</p>'], 	
		 	right: ['',[
		 		'Большая часть рейсов средней и&nbsp;короткой протяженности выполняется на&nbsp;самолетах Airbus А319, А320 и&nbsp;А321',
		 		'Питание пассажиров класса Бизнес сервируется на&nbsp;фарфоровой и&nbsp;стеклянной посуде',
		 		'В&nbsp;программе индивидуальной системы развлечения предлагается 70&nbsp;фильмов и&nbsp;25&nbsp;музыкальных альбомов',
		 		'В&nbsp;течение всего рейса пассажирам предлагаются прохладительные и&nbsp;алкогольные напитки'
		 	],'http://www.aeroflot.ru/cms/before_and_after_fly/class_premier']
	 	};

						
function plusTemplate(title, desc, left, top, img, isReverse){
	 
	var reverseClass = isReverse ? ' reverse' : '';
	return '<div class="cclInterior_plus'+reverseClass+'" style="top:'+top+'; left:'+left+';"><div class="cclInterior_icon"><img alt="" src="images/plus/'+img+'"><div class="cclInterior_title">'+title+'</div></div><div class="cclInterior_text"><div class="cclInterior_textTitle">'+title+'</div><div class="cclInterior_desc">'+desc+'</div><span class="cclInterior_textBg"></span> <a class="cclInterior_close" href="#">x</a></div></div>'; 

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