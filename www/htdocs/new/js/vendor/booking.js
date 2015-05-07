var _jqueryUIAutocompleteExtended = false;
if (typeof(Number.prototype.toRad) === 'undefined') {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

function CityWidget($el, options) {
    this.$el = $el;
    this.options = {
        data: [],
        labelByValue: function(val) { return val; },
        cityLinkText: 'List of cities',
        clearText: 'Clear',
        geoCallback: function() {},
        onGeoLocationSelect: function(cityCode) {},
        onSet: function(val) {},
        onClear: function() {},
        onSelect: function(val) {},
        onOpen: function() {}
    };

    for (pr in options) {
        this.options[pr] = options[pr];
    }

    var _this = this;
    this.$el.on('focus', function() { _this.$container.addClass('focus'); });
    this.$el.on('blur', function() { _this.$container.removeClass('focus'); });

    var eW = this.$el.width();
    var eH = this.$el.height();

    this.$el.wrap($('<div>').addClass('cityWidget'));
    this.$container = this.$el.parent();

    var mW = this.$container.outerWidth(true) - this.$container.outerWidth();
    this.$container.css('width', eW - mW);

    this.$glocBtn = $('<span>').addClass('cityWidgetGlocBtn').prependTo(this.$container);
    this.$modalBtn = $('<span>').addClass('cityWidgetModalBtn').attr('title', this.options.cityLinkText).prependTo(this.$container);
    this.$clearBtn = $('<span>').addClass('cityWidgetClearBtn').attr('title', this.options.clearText).appendTo(this.$container);
    this.$hidden = $('<input type="hidden" value="" />').attr('name', '_' + this.$el.attr('name')).appendTo(this.$container);

    this.$modalBtn.on('click', function(evt) {
        evt.stopPropagation();
        _this.options.geoCallback();
        //_this.$el.trigger('focus');
    });

    this.$clearBtn.on('click', function(evt) {
        _this.setValue('');
        _this._responseStorage = '';
        _this.$el.trigger('focus');
        $(this).hide();
    });

    var glocBtnOW = this.$glocBtn.outerWidth();
    var modalBtnOW = this.$modalBtn.outerWidth();
    var clearBtnOW = this.$clearBtn.outerWidth();

    this.$glocBtn.hide();

    var cOWT = this.$container.outerWidth(true);
    var cOH = this.$container.outerHeight();
    var cW = this.$container.width();

    var eOWT = this.$el.outerWidth(true);
    var eOW = this.$el.outerWidth();

    var elWidth = cW - (modalBtnOW + clearBtnOW) - (eOWT - eW);

    this.$el.css({
        width: elWidth,
        border: 0
    });

    this._responseStorage = '';

    if (!_jqueryUIAutocompleteExtended) {
        _jqueryUIAutocompleteExtended = true;

        $.widget('ui.autocomplete', $.ui.autocomplete, {
            _renderItem: function(ul, item) {
                return $('<li>').append($('<a>').html(item.label)).appendTo(ul);
            }
        });
    }

    function removeWrapper() {
        var $menu = _this.$el.autocomplete('widget');
        $menu.appendTo(_this.$container);
        $('.cityWidgetMenuWrapper', _this.$container).remove();
    }

    this.menuLeftOffset = 0;
    this.$el.autocomplete({
        minLength: 2,
        appendTo: this.$container,
        position: {
            at: 'left-' + (modalBtnOW + (cOWT - cW) / 2) + ' bottom+' + (cOH - eH) / 2
        },
        source: this.options.data,
        open: function(evt, ui) {
            _this.options.onOpen();

            var $menu = _this.$el.autocomplete('widget');
            var mOW = $menu.outerWidth();
            var mW = $menu.width();

            var maxItemWidth = 0;
            var maxMenuHeight = $menu.css('maxHeight');
            $menu.css('maxHeight', maxMenuHeight);
            $('li', $menu).each(function(i, el) {
                var $el = $(el);
                var $a = $('a', $el);
                $a.css({
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    'float': 'left'
                });
                maxItemWidth = Math.max(maxItemWidth, $a.outerWidth(true));
            });

            $('a', $menu).css({
                whiteSpace: 'auto',
                overflow: 'hidden',
                'float': 'none'
            });

            var minMenuWidth = cOWT - (mOW - mW);

            var _d = $menu.outerWidth(true) - $('li', $menu).outerWidth(true);

            $menu.css({
                width: (maxItemWidth < minMenuWidth ? minMenuWidth : maxItemWidth + _d)
            });

            removeWrapper();
            $menu.wrap($('<div>').addClass('cityWidgetMenuWrapper'));

            var $wrapper = $('.cityWidgetMenuWrapper', _this.$container);
            $wrapper.css({
                top: $menu.css('top'),
                left: parseInt($menu.css('left'), 10) - _this.menuLeftOffset,
                width: $menu.outerWidth(),
                height: $menu.outerHeight()
            });
            $menu.css({
                top: 0,
                left: 0
            });

            var $footer = $('<div>').addClass('cityWidgetMenuFooter');
            var $link = $('<a>').attr('href', '#').text(_this.options.cityLinkText);
            $footer.append($link);
            $wrapper.append($footer);

            $footer.on('mousedown', function(evt) {
                evt.preventDefault();
            });

            $link.on('click', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();

                _this.options.geoCallback();
                _this.$el.autocomplete('close');
            });
        },
        response: function(evt, ui) {
            if (ui.content[0]) {
                _this._responseStorage = ui.content[0].value;
            }
        },
        select: function(evt, ui) {
            evt.preventDefault();
            _this.setValue(ui.item.value);

            _this.options.onSelect(ui.item.value);
        },
        change: function(evt, ui) {
            _this.setValue(_this._responseStorage);
            _this.$container.removeClass('focus');
        },
        search: function(evt, ui) {
            removeWrapper();
        },
        close: function(evt, ui) {
            removeWrapper();
        },
        focus: function(evt, ui) {
            evt.preventDefault();
        }
    });

    this.$el.keydown(function(evt) {
        if (evt.keyCode === 13) {
            var val = _this.getValue();
            if (val != _this._responseStorage) {
                _this.setValue(_this._responseStorage);
                _this.$el.autocomplete('close');

                _this.options.onSelect(_this._responseStorage);
            }
        }
    });

    this.glocElWidth = elWidth - glocBtnOW;
    this.glocBtnWidth = glocBtnOW;

    return this;
}

CityWidget.prototype.setGeolocation = function(code) {
    this.$el.css('width', this.glocElWidth);
    this.$glocBtn.show();
    this.menuLeftOffset = this.glocBtnWidth;
    this.$glocBtn.unbind('click');

    this.setValue(code);

    var _this = this;
    this.$glocBtn.attr('title', this.options.labelByValue(code));
    this.$glocBtn.click(function() {
        _this.setValue(code);
        _this.options.onGeoLocationSelect(code);
        //_this.$el.trigger('focus');
    });
};

CityWidget.prototype.setValue = function(val) {
    this.$el.val(this.options.labelByValue(val));
    this.$hidden.val(val);
    if (val) {
        this.$clearBtn.show();
        this.options.onSet(val);
    } else {
        this.$clearBtn.hide();
        this.options.onClear();
    }
    this._responseStorage = val;
};

CityWidget.prototype.getValue = function() {
    return this.$hidden.val();
};

function DropdownButtonWidget($el, options) {
    this.$el = $el;
    this.options = {
        dataSource: function() { return []; },
        onSelect: function(val) {}
    };

    for (pr in options) {
        this.options[pr] = options[pr];
    }

    this.$el.wrap($('<div>').addClass('dropdownButtonWidget'));
    this.$container = this.$el.parent();

    var eW = this.$el.width();
    var cW = this.$container.width();
    var cOWT = this.$container.outerWidth(true);

    this.$container.css('width', eW - (cOWT - cW));
    this.$el.css('width', 'auto');

    this.$icon = $('<span>').html('&darr;').appendTo(this.$container);
    this.$dropdown = $('<div>').addClass('dropdownButtonDropdown').appendTo(this.$container);

    var _this = this;

    this.$el.on('click', function(evt) { evt.preventDefault(); });

    this.$el.on('focus', function(evt) {
        evt.preventDefault();
        _this.$container.addClass('focus');
    });

    this.$el.on('blur', function(evt) {
        evt.preventDefault();
        _this.$container.removeClass('focus');
    });

    this.$container.on('click', function(evt) {
        if ($(evt.target).parents().hasClass('dropdownButtonDropdown')) {
            return;
        }
        $(this).addClass('focus');
        _this.open();
    });

    $(document).on('click', function(evt) {
        if ($(evt.target).parents().hasClass('dropdownButtonWidget')
            || $(evt.target).hasClass('dropdownButtonWidget')) {
            return;
        }
        _this.$dropdown.hide();
        _this.$container.removeClass('focus');
    });
}

DropdownButtonWidget.prototype.open = function() {
    var data = this.options.dataSource();
    this.$dropdown.html('');
    var $ul = $('<ul>');
    var _this = this;
    $(data).each(function(i, d) {
        var $li = $('<li>');
        var $sep = $('<li>').addClass('sep').html('&nbsp;');
        var $a = $('<a>').attr('href', '#').html(d.label);
        $a.click(function(evt) {
            evt.preventDefault();
            _this.options.onSelect(d.value);
            _this.$dropdown.hide();
            _this.$el.trigger('focus');
        });
        $li.append($a);
        $ul.append($li);
        $ul.append($sep);
    });
    this.$dropdown.append($ul);
    $('li:last-child', $ul).remove();
    $('li:first-child', $ul).addClass('first');
    $('li:last-child', $ul).addClass('last');
    this.$dropdown.show();

    var maxItemWidth = 0;
    $('li', this.$dropdown).each(function(i, el) {
        var $el = $(el);
        $el.css('float', 'left');
        maxItemWidth = Math.max(maxItemWidth, $el.width());
    });
    $('li', this.$dropdown).css('float', 'none');

    var cOWT = this.$container.outerWidth(true);
    var dOW = this.$dropdown.outerWidth();
    var dW = this.$dropdown.width();
    var minDropdownWidth = cOWT - (dOW - dW);

    this.$dropdown.css({
        width: (maxItemWidth < minDropdownWidth ? minDropdownWidth : maxItemWidth)
    });
};

function PassengerWidget($el, options) {
    this.$el = $el;
    this.options = {};

    for (pr in options) {
        this.options[pr] = options[pr];
    }

    this.onChange = function(){};

    this.ieVersion = (function() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re  = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
            if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
        }
        return rv;
    })();

    var _this = this;
    $('input', this.$el).change(function(evt) {
        if (_this.ieVersion > 0 && _this.ieVersion < 9) {
            $(this).prop('checked', 'checked');
        }

        $('label', _this.$el).removeClass('disabled');
        $('label', _this.$el).removeClass('checked');

        var i = parseInt($(this).val(), 10);
        $('label', _this.$el).eq(i).addClass('checked');

        _this.onChange();
    });

    $('a', this.$el).focus(function(evt) {
        if (!$(this).parent().hasClass('hidden')) {
            $(this).parent().addClass('focus');
        }
    });

    $('a', this.$el).blur(function(evt) {
        $(this).parent().removeClass('focus');
    });

    $('a', this.$el).click(function(evt) {
        evt.preventDefault();
        $(this).parent().trigger('click');
    });

    $('label', this.$el).click(function(evt) {
        if ($(this).hasClass('hidden')) {
            return;
        }

        $('a', $(this)).trigger('focus');

        var $input = $('#' + $(this).attr('for'));

        var val = parseInt($input.val(), 10);
        if (val == _this.getValue()) {
            $('label', _this.$el).removeClass('disabled');
            $('label', _this.$el).removeClass('checked');

            $(this).addClass('checked');

            _this.onChange();
        }

        if (_this.ieVersion > 0 && _this.ieVersion < 9) {
            $input.trigger('change');
        }
    });

    $('label', this.$el).each(function() {
        $(this).attr('data-for', $(this).attr('for'));
    });

    this.maxVal = $('input', this.$el).length - 1;

    return this;
}

PassengerWidget.prototype.setLimit = function(from, to) {
    $('label', this.$el).each(function(i, el) {
        $(this).removeClass('hidden');
        $(this).attr('for', $(this).attr('data-for'));
        $('a', $(this)).attr('tabindex', '0');
    });
    $('label:lt(' + from + ')', this.$el).each(function(i, el) {
        $(this).addClass('hidden');
        $(this).removeAttr('for');
        $('a', $(this)).attr('tabindex', '-1');
    });
    $('label:gt(' + to + ')', this.$el).each(function(i, el) {
        $(this).addClass('hidden');
        $(this).removeAttr('for');
        $('a', $(this)).attr('tabindex', '-1');
    });
};

PassengerWidget.prototype.setValue = function(val) {
    $('label', this.$el).eq(val).trigger('click');
};

PassengerWidget.prototype.getValue = function() {
    var val = $('input:checked', this.$el).val();
    if (!val) return null;
    return parseInt(val, 10);
};

var BookingForms = (function($) {
    var module = {};

    var settings = {
        debug: 1,
        opened: 1,
        showHotelTab: true,
        ticketURL: '',
        ticketCouponsEnabled: 1,
        ticketSSWr12MileageRedemptionEnabled: 1,
        europcarURL: '',
        europcarStationsURL: '',
        europcarLandingURL: '',
        hotelURL: '',
        SSWR9URL: '',
        SSWR12URL: '',
        imagePath: '',
        themeImagePath: '',
        cookiePrefix: 'QF_',
        cookieSuffix: '',
        country: 'ru',
        language: 'en',
        defaultLanguage: 'en',
        allowedLanguages: ['en'],
        currencyMap: {},
        currencyLimitations: {},
        defaultCurrency: 'RUB',
        defaultPosId: '',
        posIdMap: {},
        maxPassengers: 6,
        cityFlags: {SSWR9: 1, SSWR12: 2, FAREAST: 3},
        allowedCityFlags: [],
        topCities: [],
        topRegions: [],
        topCountries: [],
        airportOrdering: {},
        translations: {},
        nonAlphabetLanguages: [],
        maxBookingSegments: 4,
        sendGAData: true,
        gaCustomVarsEnabled: 1
    };

    var ui = {
        container: '#bookingTabsBlock'
    };

    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var posIdLanguageMap = {
        '7B47': ['ru', 'en'],
        '80U7': ['ru', 'en', 'de', 'es', 'fr', 'it', 'ja'],
        '80T7': ['ru', 'en', 'de', 'es', 'fr', 'it', 'ja', 'zh']
    };

    var aeServiceClasses = {
        STANDARD: 1,
        BUSINESS: 2
    };

    var aeDirections = {
        OW: 1,
        RT: 2
    };

    var geoDataProcessingAllowed = false;
    var cities = [];
    var cityIndexer = {};
    var regions = [];
    var farEastCities = [];
    var farEastDirections = {};
    var region_htmls = {};
    var recentRoutesLimit = 2;

    var geolocationCity;
    var onSuccessGeolocation = function(code) {};

    var tooltipCounter = 0;
    var observerCounter = 0;
    var observerInterval = 60; //ms

    function _getCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.substring(0, nameEQ.length) == nameEQ) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function _setCookie(name, value) {
        var d = new Date();
        var exdays = 60;
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = '' + name + '=' + value + ';' + expires + '; path=/';
    }

    function _log(msg) {
        if (settings.debug) {
            try {
                console.log(msg);
            } catch(e) {}
        }
    }

    function rc(name) {
        return _getCookie(settings.cookiePrefix + name + settings.cookieSuffix);
    }

    function sc(name, value) {
        return _setCookie(settings.cookiePrefix + name + settings.cookieSuffix, value);
    }

    function getIndexSorter(i) {
        return function (m1, p1) {
            m1 = m1[i];
            p1 = p1[i];
            var m = ('' + m1).toLowerCase();
            var p = ('' + p1).toLowerCase();

            if(m > p) return 1;
            if(m < p) return -1;
            return 0;
        }
    }

    function isTrue(val) {
        if (!val || val == '0' || val.toLowerCase() == 'false' || !$.trim(val)) {
            return false;
        }
        return true;
    }

    function getRequsetVar(name){
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
            return decodeURIComponent(name[1]);
        }
    }

    function t(msg, params) {
        if (settings.translations[msg]) {
            msg = settings.translations[msg];
        }

        if (!params) params = {};
        for (pr in params) {
            msg = msg.replace(pr, params[pr]);
        }

        return msg;
    }

    function parseGACookie() {
        var d = {
            utm_source: '',
            utm_campaign: '',
            utm_medium: '',
            utm_content: '',
            utm_term: ''
        };

        var map = {
            utmcsr: 'utm_source',
            utmccn: 'utm_campaign',
            utmcmd: 'utm_medium',
            utmcct: 'utm_content',
            utmctr: 'utm_term'
        };

        var c = _getCookie('__utmz');
        if (c) {
            var data = c.replace(c.split('.', 4).join('.') + '.', '').split('|');
            for (var i = 0; i < data.length; i++) {
                var p = data[i].split('=');
                var val = p[1].substr(0, 50);
                if (map[p[0]]) {
                    d[map[p[0]]] = val;
                }
            }
        }

        return d;
    }

    function setGACustomVar(idx, name, value, scope) {
        if (settings.gaCustomVarsEnabled) {
            if (typeof(_gaq) != 'undefined') {
                _gaq.push(['b._setCustomVar',  idx, name, value, scope]);
            }
        }
    }

    function currentLanguage(safe) {
        var language = settings.language;
        if ($.inArray(settings.language, settings.allowedLanguages) == -1) {
            language = settings.defaultLanguage;
        }

        if (!safe) {
            return language;
        }

        var parts = language.split('-');
        return parts[0];
    }

    function currentCurrency() {
        var currencyCookie = rc('ttCurrency');
        if (currencyCookie) {
            _log('Currency (based on cookie): ' + currencyCookie);
            return currencyCookie;
        }

        var country = settings.country.toLowerCase();
        if (settings.currencyMap[country]) {
            var c = settings.currencyMap[country];
            _log('Currency (based on GeoIP country): ' + c);
            return c;
        }

        _log('Currency (default): ' + settings.defaultCurrency);
        return settings.defaultCurrency;
    }

    function currentSSWR9Language() {
        var posId = currentPosId();
        if (typeof(posIdLanguageMap[posId]) != 'undefined') {
            if ($.inArray(settings.language, posIdLanguageMap[posId]) != -1) {
                return settings.language;
            }
        }

        return settings.defaultLanguage;
    }

    function currentPosId() {
        var country = settings.country.toLowerCase();
        return (typeof(settings.posIdMap[country]) != 'undefined') ? settings.posIdMap[country] : settings.defaultPosId;
    }

    function getSSWR9Direction(val) {
        var map = {
            RT: 'returntravel',
            OW: 'onewaytravel'
        };

        if (typeof(map[val]) != 'undefined') {
            return map[val];
        }

        return '';
    }

    function getSSWR9ClassService(val) {
        var map = {
            ECONOMY: 'CoachClass',
            PREMIUM_ECONOMY: 'PremiumCoachClass',
            BUSINESS: 'BusinessClass'
        };

        if (typeof(map[val]) != 'undefined') {
            return map[val];
        }

        return '';
    }

    function getDistance(p1, p2) {
        var R = 6371; // km
        var lat1 = p1.lat;
        var lon1 = p1.lon;
        var lat2 = p2.lat;
        var lon2 = p2.lon;

        var dLat = (lat2 - lat1).toRad();
        var dLon = (lon2 - lon1).toRad();
        var lat1 = lat1.toRad();
        var lat2 = lat2.toRad();

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d;
    }

    function transliterate(word) {
        var rus = 'йцукенгшщзфывапролджэячсмитьбЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮёЁхъю'.split('');
        var lat = 'qwertyuiopasdfghjkl;\'zxcvbnm\,QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>`~[].'.split('');
        word = word.split('');
        if (settings.language == 'ru') {
            var res = '';
            for(var c in word){
                ri = $.inArray(word[c], rus);
                rl = $.inArray(word[c], lat);
                if (ri != -1){
                    res += lat[ri];
                }  else if (rl != -1){
                    res += rus[rl];
                } else {
                    res += word[c];
                }
            }
            return res;
        }
        return word.join('');
    }

    function isValidDate(dt) {
        if (!dt || isNaN(dt.getTime())) {
            return false;
        }
        return true;
    }

    function fmtDate(date, type) {
        if (date) {
            var dt = new Date(date);

            if (isValidDate(dt)) {
                var dd = dt.getDate();
                var mm = dt.getMonth() + 1;
                var yyyy = dt.getFullYear();

                dd = dd < 10 ? '0' + dd : dd;
                mm = mm < 10 ? '0' + mm : mm;

                if (type && type == 'mm/yyyy') {
                    return [mm, yyyy].join('/');
                } else if (type && type == 'mm/dd/yyyy') {
                    return [mm, dd, yyyy].join('/');
                } else if (type && type == 'dd.mm.yyyy') {
                    return [dd, mm, yyyy].join('.');
                } else { // 'yyyy-mm-dd'
                    return [yyyy, mm, dd].join('-');
                }
            }
        }
        return null;
    }

    function preloadImages(images, path) {
        for (var i = 0; i < images.length; i++) {
            var image = new Image();
            image.src = path + images[i];
        }
    }

    function onWindowResize() {
        var $menu = $('#topmenu');
        var $panel = $('#bookingPanel');
        if ($menu.length) {
            var limit = $menu.attr('data-margin-left');

            if (!limit) {
                limit = $panel.outerWidth();
            }
            limit = parseInt(limit, 10);

            var offset = $menu.parent().width() - $menu.width();
            if (offset < limit) {
                $panel.addClass('statePad');
            } else {
                $panel.removeClass('statePad');
            }
        }

        if ($panel.length) {
            // fix zoom artefacts
            var $tabContainer = $('#bookingTab');
            if (!$tabContainer.attr('data-width')) {
                $tabContainer.attr('data-width', $tabContainer.width());
            }
            var $tabs = $('.bookingTabs');
             $tabContainer.width(parseInt($tabContainer.attr('data-width'), 10));

            var $li = $('li', $tabs).not(':hidden');
            var offset1 = $li.first().offset();
            var k = 0;
            var limit = 20;
            while (k < limit) {
                var offset2 = $li.last().offset();
                if (offset2.top == offset1.top) {
                    break;
                }
                $tabContainer.width(parseInt($tabContainer.attr('data-width'), 10) + k);
                k += 1;
            }

            if ($panel.hasClass('closed')) {
                $panel.css('left', -$tabContainer.width());
            }
        }

        adjustPanelHeight();
    }

    function showLoader($container) {
        var $overlay = $('<div class="booking_overlay"><span></span></div>').prependTo($container);
        $overlay.css({
            width: $container.outerWidth(true),
            height: $container.outerHeight(true)
        });

        $('span', $overlay).css('top', ($overlay.height() - $('span', $overlay).height()) / 2);

        $overlay.show();
        setTimeout(function() {
            $overlay.addClass('overlay');
        }, 0);
    }

    function hideLoader($container) {
        var $overlay = $('.booking_overlay', $container);
        $overlay.css({
            width: $container.outerWidth(true),
            height: $container.outerHeight(true)
        });

        setTimeout(function(){
            $overlay.removeClass('overlay');
        }, 0);

        setTimeout(function(){
            $overlay.remove();
        }, 500);
    }

    function showFieldLoader($container) {
        $('.fieldLoader', $container).css('visibility', 'visible');
    }

    function hideFieldLoader($container) {
        $('.fieldLoader', $container).css('visibility', 'hidden');
    }

    function disableBlock($block, hideContent, onDisablerClick) {
        $block.addClass('disabled');
        $('input[type="checkbox"]', $block).prop('disabled', 'disabled');
        $('input, select, .ffSelectWrapper, .textinputBox', $block).addClass('disabled');

        var $d = $('<div class="disabler"></div>').prependTo($block);
        var blockOffsetX = parseInt($block.css('paddingLeft'), 10) +
                           parseInt($block.css('paddingRight'), 10);
        var blockOffsetY = parseInt($block.css('paddingTop'), 10) +
                           parseInt($block.css('paddingBottom'), 10);
        $d.css({
            //border: '1px solid #f00',
            width: $block.outerWidth(),
            height: $block.outerHeight(),
            marginLeft: -blockOffsetX,
            marginTop: -blockOffsetY,
            position: 'absolute'
        });

        $('input, select, a', $block).each(function(i, el) {
            var tabindex = $(el).attr('tabindex');
            if (tabindex && parseInt(tabindex, 10) > -1) {
                $(el).attr('data-tabindex', tabindex);
            } else {
                $(el).attr('data-tabindex-stop', 1);
            }
            $(el).attr('tabindex', -1);
        });

        if (hideContent) {
            $block.css('visibility', 'hidden');
        }

        if (typeof(onDisablerClick) == 'undefined') {
            onDisablerClick = function(evt) {};
        } else {
            $block.addClass('clickable');
        }

        $block.unbind('click');
        $block.on('click', onDisablerClick);
    }

    function enableBlock($block) {
        $block.removeClass('disabled');
        $block.removeClass('clickable');
        $('input[type="checkbox"]', $block).prop('disabled', '');
        $('input, select, .ffSelectWrapper, .textinputBox', $block).removeClass('disabled');
        $('.disabler', $block).remove();

        $('input, select, a', $block).each(function(i, el) {
            if ($(el).attr('data-tabindex')) {
                $(el).attr('tabindex', $(el).attr('data-tabindex'));
            } else {
                if (!$(el).attr('data-tabindex-stop')) {
                    $(el).removeAttr('tabindex');
                }
            }
        });

        if ($block.css('visibility') == 'hidden') {
            $block.css('visibility', 'visible');
        }
    }

    function adjustWidth($el, $container, inc) {
        if (typeof($container) == 'undefined') {
            $container = $el.parent();
        }
        if (typeof(inc) == 'undefined') {
            inc = 0;
        }
        var w = $container.width();
        var dw = $el.outerWidth(true) - $el.width();
        $el.css('width', w - dw + inc);
    }

    function initFormElements($container) {
        // text inputs
        $textInputs = $('input[class="textinput"]', $container);
        $textInputs.on('focus', function() { $(this).addClass('focus'); });
        $textInputs.on('blur', function() { $(this).removeClass('focus'); });

        $('select', $container).fancyfields();
    }

    function rebuildSelect($el) {
        var $container = $el.parent();
        var invalid = $container.hasClass('invalid');

        var ttVisible = $container.attr('data-tt-visible');
        ttVisible = ttVisible && parseInt(ttVisible, 10);
        var ttMsg, ttPermanent;
        if (ttVisible) {
            ttMsg = $container.data('originalContent');
            ttPermanent = $container.attr('data-tt-permanent');
            ttPermanent = ttPermanent && parseInt(ttPermanent, 10);
        }

        hideTooltip($container);

        var $clone = $el.clone();
        //$clone.removeAttr('style');
        $el.parent().after($clone);
        $el.parent().remove();

        $clone.fancyfields();

        if (invalid) {
            $clone.parent().addClass('invalid');
        }

        if ($clone.parents().hasClass('disabled')) {
            $clone.parent().addClass('disabled');
        }

        if (ttVisible) {
            showTooltip($clone.parent(), ttMsg, ttPermanent);
        }
    }

    function redirectToURL(url, params) {
        var pairs = [];
        for (pr in params) {
            pairs.push(pr + '=' + params[pr]);
        }

        var url = url + '?' + pairs.join('&');
        location.href = url;
    }

    function hideModalOnClick($el, $target) {
        if ($el.dialog('isOpen')) {
            if (!$target.parents().hasClass('ui-dialog')) {
                $el.dialog('close');
            }
        }
    }

    function showTooltip($el, msg, permanent) {
        if (!$el.attr('data-tt-counter')) {
            tooltipCounter += 1;
            $el.attr('data-tt-counter', tooltipCounter);
            if (permanent) {
                $el.attr('data-tt-permanent', 1);
            }

            $el.tooltip({
                animation: true,
                html: true,
                placement: 'right',
                trigger: 'manual',
                title: function() {
                    return $el.data('content');
                }
            });

            $el.on('shown.bs.tooltip', function() { // adjust width
                if ($el.data('aw')) {
                    $el.data('aw', false);
                    var $tip = $(this).next('.tooltip');
                    var $tipInner = $('.tooltip-inner', $tip);
                    $tipInner.css('whiteSpace', 'nowrap');
                    $tipInner.css('width', 'auto');
                    var w = $tipInner.width();
                    $tipInner.css('width', w);
                    $tipInner.css('whiteSpace', 'normal');
                    $el.tooltip('hide');
                    $el.tooltip('show');
                } else {
                    var $closeLink = $('.tooltipClose' + $el.attr('data-tt-counter'));
                    $closeLink.unbind('click');
                    $closeLink.click(function(evt) {
                        evt.preventDefault();
                        $el.tooltip('hide');
                    });
                }
            });

            $el.on('show.bs.tooltip', function() {
                $el.attr('data-tt-visible', 1);
            });

            $el.on('hide.bs.tooltip', function() {
                $el.attr('data-tt-visible', 0);
            });
        }

        $el.data('originalContent', msg);

        msg = '<a tabindex="-1" class="tooltipClose' + $el.attr('data-tt-counter') + '" href="#">&times;</a>' + msg;

        $el.data('aw', true);
        $el.data('content', msg);
        $el.tooltip('show');
    }

    function hideTooltip($el) {
        var visible = $el.attr('data-tt-visible');
        if (visible && parseInt(visible, 10)) {
            $el.tooltip('hide');
        }
    }

    function hideAllTooltips($container) {
        $('*[data-tt-visible="1"]', $container).each(function(i, el) {
            var $el = $(el);
            if (!$el.attr('data-tt-permanent')) {
                $el.tooltip('hide');
            }
        });
    }

    function redrawTooltips($container) {
        $('*[data-tt-visible="1"]', $container).each(function(i, el) {
            var $el = $(el);
            $el.tooltip('hide');
            $el.tooltip('show');
        });
    }

    function showErrors(errors) {
        $(errors).each(function(i, error) {
            var target = error[0];
            var msg = error[1];

            var $el = $(target);

            if (target instanceof CityWidget) {
                $el = target.$container;
            } else {
                if ($el.parent().hasClass('ffSelectWrapper')) {
                    $el = $el.parent();
                }
            }

            $el.addClass('invalid');

            if (msg) {
                showTooltip($el, msg);
            }
        });
    }

    function clearErrors($container) {
        $('input, select, .cityWidget, .ffSelectWrapper, .textinputBox', $container).removeClass('invalid');
        hideAllTooltips($container);
    }

    function getRecentRoutes() {
        var str = rc('recentRoutes');
        var routes = [];
        if (str) {
            var chunks = str.match(/[A-Z]{1,6}/g);
            for (var i = 0; i < chunks.length; i++) {
                var c1 = chunks[i].slice(0,3);
                var c2 = chunks[i].slice(3);
                routes.push([c1, c2]);
            }
        }
        return routes;
    }

    function addRecentRoute(c1, c2) {
        var routes = getRecentRoutes();
        if (routes.length > recentRoutesLimit) {
            routes = routes.slice(0, -1);
        }

        if (routes.length) {
            if (routes[0][0] == c1 && routes[0][1] == c2) {
                return;
            }
        }

        routes.unshift([c1, c2]);
        var str = '';
        for (var i = 0; i < routes.length; i++) {
            str += routes[i][0];
            str += routes[i][1];
        }
        sc('recentRoutes', str);
    }

    function checkCityFlags(obj) {
        for (var i = 0; i < obj.flags.length; i++) {
            if ($.inArray(obj.flags[i], settings.allowedCityFlags) != -1) {
                return true;
            }
        }
        return false;
    }

    function cityTitle(obj) {
        var city = [obj.name];
        if (obj.name_en != city) city.push(obj.name_en);

        var country = [obj.country_name];
        if (obj.country_name_en != country) country.push(obj.country_name_en);

        //var iatas = [obj.code];
        var iatas = [];
        for (var i = 0; i < obj.airports.length; i++) {
            //if (obj.airports[i]['code'] != obj.code) {
                iatas.push(obj.airports[i]['code']);
            //}
        }
        if (!iatas.length) iatas.push(obj.code);

        iatas = iatas.sort(function(a1, b1) {
            var a = ('' + a1).toLowerCase();
            var b = ('' + b1).toLowerCase();

            if (settings.airportOrdering[a1]) {
                a = settings.airportOrdering[a1];
            }

            if (settings.airportOrdering[b1]) {
                b = settings.airportOrdering[b1];
            }

            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });

        return city.join(', ') + ' (' + iatas.join(', ') + '), ' + country.join(', ');
    }

    function citySearchStrings(obj) {
        var ss = [
            obj.code,
            obj.name,
            obj.name_en,
            obj.country_name,
            obj.country_name_en
        ];

        for (var i = 0; i < obj.airports.length; i++) {
            ss.push(obj.airports[i]['code']);
        }

        return ss;
    }

    function prepareGeoData(d) {
        var cityList = [];
        alphabet = {};
        for (var regi = 0; regi < d.length; regi++) {
            var region = d[regi];
            for (var cntri = 0; cntri < region['countries'].length; cntri++) {
                var country = region['countries'][cntri];
                for (var ctyi = 0; ctyi < country['cities'].length; ctyi++) {
                    var city = country['cities'][ctyi];

                    if (checkCityFlags(city)) {
                        var city2 = {
                            airports: city['airports'],
                            code: city['code'],
                            name: city['name'],
                            name_en: city['name_en'],
                            country_code: country['code'],
                            country_name: country['name'],
                            country_name_en: country['name_en'],
                            location: city['location']
                        };
                        var letter = city2.name.split('')[0];
                        if(alphabet[letter] == undefined){
                            alphabet[letter] = []
                        }
                        alphabet[letter].push(city2)
                        city2['title'] = cityTitle(city2);
                        city2['ss'] = citySearchStrings(city2);
                        delete city2.airports;
                        cityList.push(city2);
                        cityIndexer[city2.code] = city2;

                        if (city['flags'].length == 1 && city['flags'][0] == settings.cityFlags.FAREAST) {
                            farEastCities.push(city['code']);
                        }
                    }
                }
            }
        }

        function riggedSort(array, topArray, key){
            var topItems = [];
            var otherItems = [];
            for (var i = 0; i < array.length; i++) {
                if ($.inArray(array[i][key], topArray) != -1){
                    topItems.push(array[i]);
                } else {
                    otherItems.push(array[i]);
                }
            }
            return topItems.concat(otherItems);
        }

        // sort regions
        regions = d.sort(getIndexSorter('name'));
        regions = riggedSort(regions, settings.topRegions, 'name_en');
        $.each(regions, function(i, reg){
            var countries = reg['countries'].sort(getIndexSorter('name'))
            reg['countries'] = riggedSort(countries, settings.topCountries, 'code');
        });

        regions.alphabet = {};
        regions.alphabet.letters = $.map(alphabet, function(val, key){return key; }).sort();
        regions.alphabet.dict = alphabet;

        // sort cities
        cityList.sort(getIndexSorter('title'));

        var userSortedCities = [];
        var nativeSortedCities = [];
        for (var i = 0; i < settings.topCities.length; i++) {
            var c = cityIndexer[settings.topCities[i]];
            if (c) userSortedCities.push(c);
        }

        for (var i = 0; i < cityList.length; i++) {
            var doAdd = true;
            for (var k = 0; k < settings.topCities.length; k++) {
                if (cityList[i]['code'] == settings.topCities[k]) {
                    doAdd = false;
                }
            }
            if (doAdd) {
                nativeSortedCities.push(cityList[i]);
            }
        }

        cities = userSortedCities.concat(nativeSortedCities);

        cityList = null;
        userSortedCities = null;
        nativeSortedCities = null;

        // geolocation
        if (navigator.geolocation) {
            function success(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };

                var _d = 0;
                var _c;
                for (var i = 0; i < cities.length; i++) {
                    var loc = cities[i]['location'];
                    if (loc.lat && loc.lon) {
                        var d = getDistance(loc, pos);
                        if (!_d || d < _d) {
                            _d = d;
                            _c = cities[i]['code'];
                        }
                    }
                }

                geolocationCity = _c;
                onSuccessGeolocation(_c);

                _log('Location: ' + pos.lat + ', ' + pos.lon + ' -> ' + _c);
            }

            navigator.geolocation.getCurrentPosition(success);
        }
    }

    function loadTabContent($container) {
        adjustPanelHeight();

        if (!$container.attr('data-loaded')) {
            $container.attr('data-loaded', 1);

            $.ajax({
                url: $container.attr('data-href'),
                cache: true,
                dataType: 'json',
                type: 'GET',
                beforeSend: function (xhr) {
                    showLoader($container);
                },
                success: function (data) {
                    if (data.success) {
                        $d = $('<div>').html(data.data);
                        $container.prepend($d);

                        var callback = $container.attr('data-callback');
                        if (onLoadCallbacks[callback]) {
                            onLoadCallbacks[callback]($container);
                        }
                    }
                },
                complete: function () {
                    hideLoader($container);
                    adjustPanelHeight();
                },
                error: function () {
                    $d = $('<div>').html(t('DATA_LOAD_ERROR'));
                    $container.prepend($d);
                }
            });
        }
    }

    function showTabContent($link) {
        var $tab = $link.parent();

        $tab.addClass('current').siblings().removeClass('current');

        var $container = $('#' + $tab.attr('data-target'));
        if ($container.length) {
            var $wrapper = $container.parent();
            $wrapper.append($container);

            $container.css({
                overflow: 'visible',
                height: 'auto',
                minHeight: $container.attr('data-min-height')
            }).siblings().css({
                overflow: 'hidden',
                height: 0,
                minHeight: 0
            });

            loadTabContent($container);
        }
    }

    function hide_date_picker(dp, focus){
        var settings = dp.datepicker('option', 'input_settings');
        focus && settings.last_focused_input && settings.last_focused_input.focus();
        settings.last_focused_input = undefined;
        setTimeout(function(){
            dp.parent().hide();
            //_log('hide timeout'+settings.hide_timeout);
        }, 50);
    }

    function createDatePicker(inputs){
        var add_id = inputs.attr('id');

        var datepicker_hide_button = $('<input type="button" class="datepicker_hide_button"/>');
        datepicker_hide_button.attr('title', t('CLOSE'));
        var datepicker_div = $('<div id="date_picker_'+add_id+'" class="date_picker"/>');
        var datepicker_holder_div = $('<div id="date_picker_holder_'+add_id+
                                      '" style="display:none;" class="date_picker_holder"/>');
        datepicker_holder_div.append(datepicker_hide_button);
        datepicker_holder_div.append(datepicker_div);

        var datepicker_settings = {
            dateFormat: 'dd.mm.yy',
            minDate: 0,
            maxDate: 330,
            numberOfMonths: 2,

            onSelect:
            function(date, inst){
                var set = $(this).datepicker('option', 'input_settings');
                var last_focused_input = set['last_focused_input'];
                var inputs = set['inputs'];
                $(last_focused_input).val(date);
                $(last_focused_input).removeAttr('preset');
                inputs.each(function(i, e){ if($(e).attr('preset')){e.value = ''}})
                inputs.removeAttr('preset');
                $(last_focused_input).change();
                var empty_inputs = inputs.filter(function(){ return this.value == ""});
                if(empty_inputs.length){
                    set.last_focused_input = empty_inputs[0];
                }
            },

            beforeShowDay: function(date){
                var datetime = date.getTime();
                var sets = $(this).datepicker('option', 'input_settings');
                i = $.inArray(datetime, sets.time_array);
                if(i != -1){
                    var cl = 'sel_date';
                    if(!sets.multicolor){
                        cl += [' sel_date_start', ' sel_date_end'][i];
                    } else {
                        cl += ' date_'+(i+1);
                    }
                    return [true, cl];
                } else if(sets.time_array.length > 1
                          && datetime > sets.dates_min
                          && datetime < sets.dates_max){
                    return [true, 'sel_date'];
                } else {
                    return [true, ''];
                }
            },
            input_settings: {
                inputs: inputs,
                time_array: [],
                dates_min: 0,
                dates_max: 0,
                last_focused_input: inputs.first()
            }
        };

        datepicker_div.datepicker(datepicker_settings);
        datepicker_holder_div.on('mousedown', function(){
            setTimeout(function(){
            //_log('cancelling timeout'+ datepicker_div.datepicker('option', 'input_settings').hide_timeout);
            clearTimeout(datepicker_div.datepicker('option', 'input_settings').hide_timeout);
            }, 2);
        });

        datepicker_holder_div.on('mouseup', function(){
            setTimeout(function(){
                var focus_to = $(datepicker_div.datepicker('option', 'input_settings').last_focused_input);
                if(focus_to.not(':focus').length){
                    focus_to.focus()
                }
            }, 2);
        });

        datepicker_hide_button.click(function(){hide_date_picker(datepicker_div, true)});
        datepicker_holder_div.detach();

        return datepicker_div;
    }

    function addDatepickerToInputs(inputs, appendTo, multicolor) {
        var datepicker = undefined;
        var is_visible = false;
        for(var i=0; i<inputs.length; i++){
            datepicker = inputs.eq(i).attr('data-datepicker');
            if(datepicker){
                break;
            }
        }

        if (!datepicker){
            datepicker = createDatePicker(inputs);
        } else {
            datepicker = $('#'+datepicker);
            is_visible = datepicker.parent().is(':visible');
        }

        var settings = datepicker.datepicker('option', 'input_settings');

        if(multicolor){
            settings.multicolor = true;
        } else {
            settings.multicolor = false;
        }

        function resetIfInvalid(target, datepicker, settings){
            var input_valid = isInputValid(target.value, datepicker, true);
            if(!input_valid){
                var input_index = settings.inputs.index(target);
                if(settings.time_array[input_index]){
                    target.value = $.datepicker.formatDate(datepicker.datepicker('option','dateFormat'),
                                                            new Date(settings.time_array[input_index]));
                } else {
                    target.value = '';
                }
            }
        }

        settings.inputs = inputs;
        var new_inputs = inputs.filter(function(){return typeof($(this).attr('data-datepicker')) == 'undefined'});

        new_inputs.each(function(i, inp){
            inp = $(inp);

            inp.removeClass('textinput');
            inp.addClass('dateInput');
            var container = $('<div class="textinputBox">');
            inp.parent().append(container);
            inp.detach();

            container.append(inp);
            var img = $('<span class="calendarButton" title="' + t('CALENDAR') + '"> </span>');
            img.click(function(){
                inp.focus();
            });

            container.append(img);
            var w = container.width() - img.outerWidth(true);
            var w = inp.width() - img.outerWidth(true);
            inp.css({width: w});
        });

        new_inputs.change(function(evt){
            var datepicker = $('#'+$(evt.target).attr('data-datepicker'));
            var settings = datepicker.datepicker('option', 'input_settings');
            var dateFormat = datepicker.datepicker('option', 'dateFormat');
            var inputs = settings.inputs;

            resetIfInvalid(evt.target, datepicker, settings);
            sc(evt.target.getAttribute('id'), evt.target.value);

            // Add to array
            var current_input_date = evt.target.value;
            if(current_input_date) {
                current_input_date = $.datepicker.parseDate(dateFormat, evt.target.value).getTime();
            }
            var current_input_index = inputs.index(evt.target);
            settings.time_array = $.map(inputs, function(el, i){
                if(el.value){
                    var el_date = $.datepicker.parseDate(dateFormat, el.value).getTime();

                    var any_presets = $.map(inputs, function(e){if($(e).attr('preset')){return true; }});

                    if(!current_input_date || any_presets.length){
                        return el_date;
                    }

                    if(i <= current_input_index || el_date >= current_input_date) {
                        return el_date;
                    }
                }
            });

            // Sort
            settings.time_array.sort();

            settings.dates_min = Math.min.apply(null, settings.time_array);
            settings.dates_max = Math.max.apply(null, settings.time_array);

            inputs.each(function(i,e){
                e.value = settings.time_array[i]? $.datepicker.formatDate(dateFormat,
                                                                 $.datepicker.parseDate('@', settings.time_array[i])) : '';
            });

            if(inputs.filter(function(i,e){return e.value == ""}).length == 0){
                hide_date_picker(datepicker);
            }
            datepicker.datepicker('setDate', new Date(settings.dates_min));
            datepicker.datepicker('refresh');
        });

        new_inputs.keypress(function(evt){
            if(evt.keyCode === 13){
                var target = $(evt.target)
                var next = $(evt.target).data('next');
                if(next && target.val()) {
                    target.blur();
                    next.focus();
                }
            }
        });

        new_inputs.focusout(function(evt){
            $(evt.target).parent().removeClass('focus');
            var datepicker = $('#'+$(evt.target).attr('data-datepicker'));
            var settings = datepicker.datepicker('option', 'input_settings');
            settings.last_focused_input = evt.target;

            resetIfInvalid(evt.target, datepicker, settings);

            settings.hide_timeout = setTimeout(function(){
            //_log('timeout '+settings.hide_timeout);
                datepicker.parent().hide();
            }, 100);
            //_log('setting timeout ' + settings.hide_timeout);
        });

        function isInputValid(val, dp, full) {
            if (!val && !full) return true;
            var validRegex = val.match(/^[0-9]{1,2}[\.]{0,1}$/)
                || val.match(/^[0-9]{2}\.[0-9]{1,2}$/)
                || val.match(/^[0-9]{2}\.[0-9]{2}\.$/)
                || val.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{1,4}$/)
                ? true : false;

            if (!validRegex) return false;

            var values = val.split('.');
            var dd = values[0];
            var mm = values[1];
            var yy = values[2];

            _dd = parseInt(dd, '10');
            if (dd && dd.length < 2) {
                _dd = _dd * 10;
            }

            _mm = parseInt(mm, '10');
            if (mm && mm.length < 2) {
                _mm = _mm * 10;
            }

            var date = new Date();
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            var _minDate = new Date(date.getTime());


            var dpMinDate = dp.datepicker('option','minDate');
            if(dpMinDate === parseInt(dpMinDate)){
                _minDate.setDate(_minDate.getDate() + dpMinDate);
            } else {
                _minDate = $.datepicker.parseDate(dp.datepicker('option','dateFormat'), dpMinDate);
            }

            var _maxDate = new Date(date.getTime());
            _maxDate.setDate(_maxDate.getDate() + dp.datepicker('option','maxDate'));

            var year1 = '' + _minDate.getFullYear();
            var year2 = '' + _maxDate.getFullYear();

            var validYear = true;
            if (yy) {
                var _year1 = year1.substr(0, yy.length);
                var _year2 = year2.substr(0, yy.length);
                if (_year1 != yy && _year2 != yy) {
                    validYear = false;
                }
            }
            if (!validYear) return false;

            var validDate = true;
            if (dd && dd.length > 1 && !_dd) validDate = false;
            if (mm && mm.length > 1 && !_mm) validDate = false;
            if (_dd && (_dd <= 0 || _dd > 31)) validDate = false;
            if (_mm && (_mm <= 0 || _mm > 12)) validDate = false;
            if (!validDate) return false;

            var validDT = true;
            if (_dd && _mm) {
                var years = (yy && yy.length == 4) ? [parseInt(yy, '10')] : [_minDate.getFullYear(), _maxDate.getFullYear()];
                var _validDT = false;
                for (var i = 0; i < years.length; i++) {
                    // hack for 07.01.2015
                    if (years[i] == 2015 && _mm == 1 && _dd == 7) {
                        _validDT = true;
                        break;
                    }

                    var dt = new Date(years[i], _mm - 1, _dd);
                    if (dt.getFullYear() == years[i]
                        && dt.getMonth() == _mm - 1
                        && dt.getDate() == _dd) {
                        _validDT = true;
                        break;
                    }
                }
                validDT = _validDT;
            }
            if (!validDT) return false;

            if(full && (!yy || yy.length != 4)){
                return false;
            }

            var isValidFullDT = true;
            if (_dd && _mm && yy && yy.length == 4) {
                // hack for 07.01.2015
                //var dt = new Date(parseInt(yy, '10'), _mm - 1, _dd);
                var dt = new Date(parseInt(yy, '10'), _mm - 1, _dd, 3);

                if (!(dt <= _maxDate && dt >= _minDate)) {
                    isValidFullDT = false;
                }
            }
            if (!isValidFullDT) return false;

            return true;
        };

        new_inputs.keyup(function(evt){
            var dp = $('#'+$(evt.target).attr('data-datepicker'));
            var targ = evt.target;

            point_pos = [2, 5];
            $.map(point_pos, function(pos){
                if(targ.value[pos] && targ.value[pos] != '.'){
                    targ.value = targ.value.slice(0, pos) + '.' + targ.value.slice(pos);
                }
            });

            while(!isInputValid(targ.value, dp)){
                targ.value = targ.value.substr(0, targ.value.length-1);
            }

            if($.inArray(targ.value.length, point_pos) != -1){
                if(evt.keyCode == 8){
                     targ.value = targ.value.slice(0, targ.value.length - 1);
                } else {
                     targ.value += '.';
                }
            }
        });

        var input_focusin = function(evt){
            $(evt.target).parent().addClass('focus');

            var datepicker = $('#'+$(evt.target).attr('data-datepicker'));
            var settings = datepicker.datepicker('option', 'input_settings');
            //_log('clearing timeout'+settings.hide_timeout);
            clearTimeout(settings.hide_timeout);

            var y = $(evt.target).position().top + $(evt.target).parent().outerHeight(true);
            if(datepicker.parent().is(':visible')){
                datepicker.parent().stop().animate({top: y});
            } else {
                datepicker.parent().css({top: y});
            }

            if(!settings.multicolor && settings.inputs.length == 2){
                var first_date = settings.inputs[0];
                var second_date = settings.inputs[1];
                var min_date = datepicker.datepicker('option', 'minDate');
                    if(evt.target == first_date){
                        if(min_date != 0) {
                            datepicker.datepicker('option', 'minDate', 0);
                        }
                    } else if(min_date != first_date.value){
                        datepicker.datepicker('option', 'minDate', first_date.value);
                    }
            }
            datepicker.parent().show();
        }

        new_inputs.on('focusin click', input_focusin);

        appendTo.append(datepicker.parent());

        inputs.attr('data-datepicker', datepicker.attr('id'));
        inputs.change();
    }

    function getDTFromDateField($el) {
        var $dp = $('#' + $el.attr('data-datepicker'));
        var defaultFormat = $dp.datepicker('option', 'dateFormat');
        return $.datepicker.parseDate(defaultFormat, $el.val());
    }

    function getISODateFromDateField($el) {
        var dt = getDTFromDateField($el);
        return $.datepicker.formatDate('yy-mm-dd', dt);
    }

    function getDMFromDateField($el) {
        var dt = getDTFromDateField($el);

        var result = {
            day: null,
            month: null
        }
        if (isValidDate(dt)) {
            result.day = dt.getDate();
            result.month = monthNames[dt.getMonth()].toUpperCase();
        }
        return result;
    }

    function initTicketTab($container) {
        var segCookie = rc('segments');
        var segmentsOpenedMC = 0;
        var segmentsOpened = segCookie ? parseInt(segCookie, 10) : 0;

        function isPairAllowed(src, dst) {
            if ($.inArray(dst, farEastCities) != -1) {
                if ($.inArray(src, farEastDirections[dst]) != -1) {
                    return true;
                }
                return false;
            }

            if (dst && $.inArray(src, farEastCities) != -1) {
                if ($.inArray(dst, farEastDirections[src]) != -1) {
                    return true;
                }
                return false;
            }

            return dst != src;
        }

        function showRecentRoutes() {
            var recentRoutes = getRecentRoutes();
            if (recentRoutes.length) {
                $('#ttRecentRoutesBox').parents('tr').show();
                $('#ttRecentRoutesBox').show();
            }
        }

        function hideRecentRoutes() {
            $('#ttRecentRoutesBox').hide();
        }

        function getDirectionVal() {
            return $('.current', $directionTab).attr('data-value');
        }

        function getRealDirectionVal() {
            var directionVal = getDirectionVal();
            var returnDate0 = getISODateFromDateField(sGroups[0].returnDate);

            if (directionVal == 'RT' && !returnDate0) directionVal = 'OW';

            return directionVal;
        }

        function toggleSegmentElements(i, visible) {
            $('#ttTROri' + i).toggle(visible);
            $('#ttTRDest' + i).toggle(visible);
            $('#ttTRDates' + i).toggle(visible);

            if (!visible) {
                //clearErrors($('#ttTROri' + i));
                //clearErrors($('#ttTRDest' + i));
                //clearErrors($('#ttTRDates' + i));
            }
        }

        function showSegment(n) {
            sc('segments', n);
            segmentsOpened = n;
            for (var i = 0; i < settings.maxBookingSegments; i++) {
                toggleSegmentElements(i, i <= n);
                $('#ttMCSep' + i).toggle(i <= n + 1);
                $('#ttMCSep' + i + ' span').toggle(i <= n);
                $('#ttMCSep' + i + ' .addBtn').toggle(i == n + 1);
                $('#ttMCSep' + i + ' .delBtn').toggle(i == n || ((i == n) && (n == settings.maxBookingSegments)));
                if (i > n) {
                    $('#ttMCSep' + i + ' .csep').addClass('withBtn');
                } else {
                    $('#ttMCSep' + i + ' .csep').removeClass('withBtn');
                }
                if (i == n && $('#ttMCSep' + i + ' .delBtn').size()) {
                    $('#ttMCSep' + i + ' .csep').addClass('withClose');
                } else {
                    $('#ttMCSep' + i + ' .csep').removeClass('withClose');
                }
            }
            var date_inputs = $('[id^=ttLeaveDate]:visible', '.bookingBox');
            addDatepickerToInputs(date_inputs, date_inputs.last().parent(), true);
        }

        function showMC() {
            $leaveDate0.parent().parent().addClass('right');
            $returnDate0.parent().parent().parent().addClass('hidden');
            showSegment(segmentsOpenedMC);
        }

        function hideMC() {
            segmentsOpenedMC = segmentsOpened ? segmentsOpened : 1;
            segmentsOpened = 0;
            $leaveDate0.parent().parent().removeClass('right');
            $returnDate0.parent().parent().parent().removeClass('hidden');

            $('.ttMCSep').hide();
            for (var i = 1; i < settings.maxBookingSegments; i++) {
                toggleSegmentElements(i, false);
            }
        }

        function highlightResult(str, q, idx) {
            return str.substring(0, idx) +
                '<span>' +
                str.substr(idx, q.length) +
                '</span>' +
                str.substring(idx + q.length);
        }

        function formatResult(src, q) {
            var idx = src.toLowerCase().indexOf(q);
            if (idx > -1) {
                return highlightResult(src, q, idx);
            }
            return src;
        }

        function cityLabelByValue(val) {
            if (cityIndexer[val]) {
                return cityIndexer[val].title;
            }
            return val;
        }

        function showGeoModal(source, exclude) {
            $('#ttModalGeo').dialog('option', 'called_by', source);
            $('#ttModalGeo').dialog('option', 'exclude', exclude);
            $('#ttModalGeo').dialog('open');
        }

        function initToggleBtn($el, w1, w2) {
            $el.click(function(evt) {
                evt.preventDefault();

                var oriVal = w1.getValue();
                var destVal = w2.getValue();

                w1.setValue(destVal);
                w2.setValue(oriVal);
            });
        }

        function getCityDataSource(options) {
            var opt = {
                checkCity: function(code) { return true; }
            };

            for (pr in options) {
                opt[pr] = options[pr];
            }

            return function cityDataSource(request, response) {
                var qOri = request.term.toLowerCase();
                var qTrans = transliterate(qOri);

                var matches = [];
                for (var i = 0; i < cities.length; i++) {
                    var city = cities[i];
                    for (var k = 0; k < city.ss.length; k++) {
                        if (city.ss[k].toLowerCase().indexOf(qOri) > -1
                            || city.ss[k].toLowerCase().indexOf(qTrans) > -1) {
                            if (opt.checkCity(city.code)) {
                                var label = formatResult(city.title, qOri);
                                if (label == city.title) {
                                    label = formatResult(city.title, qTrans);
                                }
                                matches.push({
                                    label: label,
                                    value: city.code
                                });
                                break;
                            }
                        }
                    }
                }
                response(matches);
            }
        }

        function switchAlphabetical(target){
            target = target && $(target)
            if (target && !target.hasClass('alphab')){
                letter = target.text();
            } else {
                letter = 'ALL';
            }
            return letter;
        }

        function refreshExcluded() {
            var excl = $('#ttModalGeo').dialog('option', 'exclude');

            $('.ttGeoCityList').find('a').each(function(i, el) {
                for (var i = 0; i < excl.length; i++) {
                    if (isPairAllowed(el.getAttribute('data-city-id'), excl[i])) {
                        $(el).removeClass('excluded');
                    } else {
                        $(el).addClass('excluded');
                    }
                }
            });

            $('.ttGeoCityList').find('h4').each(function(i, el) {
                var country = $(el).attr('data-country-id');
                if (country) {
                    var allCities = $('.ttGeoCityList').find('a[data-country-id="' + country + '"]').length;
                    var hiddenCities = $('.ttGeoCityList').find('a.excluded[data-country-id="' + country + '"]').length;
                    if (allCities == hiddenCities) {
                        $(el).addClass('excluded');
                    }
                }

                var letter = $(el).attr('data-letter');
                if (letter) {
                    var allCities = $('.ttGeoCityList').find('a[data-letter="' + letter + '"]').length;
                    var hiddenCities = $('.ttGeoCityList').find('a.excluded[data-letter="' + letter + '"]').length;
                    if (allCities == hiddenCities) {
                        $(el).addClass('excluded');
                    }
                }
            });

            columnize(4);
        }

        function columnize(columnNum) {
            uncolumnize();

            var columnWidth = Math.floor(100 / columnNum);
            var initialWidth = $('.ttGeoCityList').css('width');
            $('.ttGeoCityList').css({
                width: columnWidth + '%',
                position: 'relative',
                visibility: 'hidden'
            });
            var containerH = $('.ttGeoCityList').parent().height();

            if ($('.ttGeoAlphabetical').is(':visible')) {
                containerH -= $('.ttGeoAlphabetical').outerHeight();
            }

            var listH = $('.ttGeoCityList').height();
            var columnHeight = Math.floor(listH / columnNum);
            if (containerH > columnHeight) {
                columnHeight = containerH;
            }

            var columns = [];
            for (var i = 0; i < columnNum; i++) {
                columns.push($('<div>').css({width: columnWidth + '%',
                                             'float': 'left'}));
            }

            var i = 0;
            var c = $('.ttGeoCityList').children();
            for (var k = 0; k < c.length; k++) {
                var $el = $(c[k]);
                var $nextEl = $(c[k + 1]);
                var pos = $nextEl.length ? $nextEl.position().top : $el.position().top + $el.outerHeight();
                if (pos > columnHeight * (i + 1)) {
                    i++;
                }
                var column = columns[i];
                if (!column) column = columns[columns.length - 1];
                column.append($el.clone(true));
            }

            $('.ttGeoCityList').children().remove();
            $('.ttGeoCityList').css({
                width: initialWidth,
                position: 'static',
                visibility: 'visible'
            });
            for (var i = 0; i < columns.length; i++) {
                if (columns[i]) columns[i].appendTo($('.ttGeoCityList'));
            }
            $('.ttGeoCityList').append('<div class="clear0"></div>');
            $('.ttGeoCityList').attr('data-columnized', 1);
        }

        function uncolumnize() {
            if (isTrue($('.ttGeoCityList').attr('data-columnized'))) {
                $('.ttGeoCityList').removeAttr('data-columnized');
                $('.ttGeoCityList a').unwrap();
                $('.ttGeoCityList div.clear0').remove();
            }
        }

        function switchRegion(evt){
            var region = $(evt.target).attr('target');
            if (typeof(region) == 'undefined') {
                return;
            }
            $('li, div, td', '#ttModalGeo').removeClass('current');
            $(evt.target).addClass('current');
            var alphabetical = false;
            if (region == 'alphabet') {
                alphabetical = true;
                $('li.alphab', '.ttGeoTabs').addClass('current');
                var letter = switchAlphabetical(evt.target);
                region = letter;
            }
            $('.ttGeoAlphabetical').toggle(alphabetical);
            if (typeof(region_htmls[region]) == 'undefined') {
                var html = [];
                if (alphabetical){
                    var letters = [letter];
                    if (region == 'ALL'){
                        letters = regions.alphabet.letters;
                    }
                    $.each(letters, function(i, l) {
                        regions.alphabet.dict[l].sort(getIndexSorter('name'));
                        if (regions.alphabet.dict[l].length > 0) {
                            html.push('<h4 data-letter="' + l + '">' + l + '</h4>');
                        }
                        $.each(regions.alphabet.dict[l], function(i, city) {
                            html.push('<a href="#" data-city-id="' + city.code + '" data-letter="' + l + '">' + city.name + '</a>');
                        });
                    });
                } else {
                    $.each(regions[region]['countries'], function(i, cntry) {
                        cntry['cities'].sort(getIndexSorter('name'));
                        if (cntry['cities'].length > 0) {
                            html.push('<h4 data-country-id="' + cntry.code + '">' + cntry.name + '</h4>');
                        }
                        $.each(cntry['cities'], function(i, city) {
                            html.push('<a href="#" data-city-id="' + city.code + '" data-country-id="' + cntry.code + '">' + city.name + '</a>');
                        });
                    });
                }

                region_htmls[region] = html;
            }

            $('.ttGeoCityList').removeAttr('data-columnized');
            $('.ttGeoCityList').children().remove();
            $('.ttGeoCityList').html(region_htmls[region].join(''));

            refreshExcluded();

            $('.ttGeoCityList a').click(function(e) {
                e.preventDefault();

                var widget = $('#ttModalGeo').dialog('option', 'called_by');
                var val = $(e.target).attr('data-city-id');

                $('#ttModalGeo').dialog('close');

                widget.setValue(val);
                widget.options.onSelect(val);
            });

            var $descr = $('.ttGeoTabsTabDescription', '.ttGeoSection');
            $descr.text('');
        }

        function checkForm() {
            var errors = [];

            var directionVal = getDirectionVal();
            var returnDate0 = getISODateFromDateField(sGroups[0].returnDate);
            if (directionVal == 'RT' && !returnDate0) {
                errors.push([sGroups[0].returnDate.parent(), t('REQUIRED_FIELD')]);
            }

            for (var i = 0; i < segmentsOpened + 1; i++) {
                if (!sGroups[i].ori.getValue()) {
                    errors.push([sGroups[i].ori.$container, t('INVALID_CITY')]);
                }
                if (!sGroups[i].dest.getValue()) {
                    errors.push([sGroups[i].dest.$container, t('INVALID_CITY')]);
                }
                if (!sGroups[i].leaveDate.val()) {
                    errors.push([sGroups[i].leaveDate.parent(), t('REQUIRED_FIELD')]);
                }
            }

            return errors;
        }

        function initCurrency() {
            var currencies = settings.currencyLimitations[settings.country.toLowerCase()];
            if (currencies) {
                $('#ttCurrency option').each(function(i, el) {
                    var $el = $(el);
                    if ($.inArray($el.attr('value'), currencies) == -1) {
                        $el.remove();
                    }
                });
                _log('Limit currencies to: ' + currencies.join(', '));
            }

            var currency = currentCurrency();
            if ($('#ttCurrency option[value="' + currency + '"]').length) {
                $('#ttCurrency').val(currentCurrency());
            }
        }

        // load geo data
        geoDataProcessingAllowed = true;
        var $script = $('script', $container);
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = $script.get(0).innerHTML;
        $script.remove();
        $('head').append(script);

        $('#ttCurrency').change(function(evt){
            sc('ttCurrency', evt.target.value);
        });

        // initial values
        initCurrency();

        var cabinCookie = rc('ttCabinClass');
        cabinCookie && $('#ttCabinClass').val(cabinCookie);
        $('#ttCabinClass').change(function(evt){
            sc('ttCabinClass', evt.target.value);

            setGACustomVar(2, 'classService_choose', $(this).val(), 1);
        });

        showRecentRoutes();
        initFormElements($container);

        for (var i = 0; i < settings.maxBookingSegments; i++) {
            adjustWidth($('#ttOri' + i));
            adjustWidth($('#ttDest' + i));
            adjustWidth($('#ttLeaveDate' + i));
            if ($('#ttReturnDate' + i).length) {
                adjustWidth($('#ttReturnDate' + i));
            }
        }
        adjustWidth($('#ttRecentRoutesBtn'));
        adjustWidth($('#ttPromoCode'));

        var $directionTab = $('#ttDirectionTab');
        var $redeemMiles = $('#ttRedeemMiles');
        var $addInsurance = $('#ttAddInsurance');
        var $leaveDate0 = $('#ttLeaveDate0');
        var $returnDate0 = $('#ttReturnDate0');

        // recent routes
        var recentRoutesWidget = new DropdownButtonWidget($('#ttRecentRoutesBtn'), {
            dataSource: function() {
                var routes = getRecentRoutes();
                var data = [];
                $(routes).each(function(i, route) {
                    var cityFrom = cityIndexer[route[0]];
                    var cityTo = cityIndexer[route[1]];
                    if (cityFrom && cityTo) {
                        data.push({
                            value: route,
                            label: cityFrom.name + ' &rarr; ' + cityTo.name
                        });
                    }
                });
                return data;
            },
            onSelect: function(val) {
                sGroups[0].ori.setValue(val[0]);
                sGroups[0].dest.setValue(val[1]);
            }
        });

        // init dates
        var date = new Date();
        date.setDate(date.getDate() + 1);

        var leaveDateCookie = rc($leaveDate0.attr('id'));
        if(leaveDateCookie){
            $leaveDate0.val(leaveDateCookie);
        } else {
            $leaveDate0.val($.datepicker.formatDate('dd.mm.yy', date));
        }

        date.setDate(date.getDate() + 2);

        var returnDateCookie = rc($returnDate0.attr('id'));

        if(returnDateCookie) {
            $returnDate0.val(returnDateCookie);
        } else {
            $returnDate0.val($.datepicker.formatDate('dd.mm.yy', date));
            $returnDate0.attr('preset', true);
        }

        for(var i = 1; i < settings.maxBookingSegments; i++){
            leaveDateCookie = rc('ttLeaveDate'+i);
            if(leaveDateCookie){
                $('#ttLeaveDate'+i).val(leaveDateCookie);
            }
            returnDateCookie = rc('ttReturnDate'+i);
            if(returnDateCookie){
                $('#ttReturnDate'+i).val(returnDateCookie);
            }
        }

        // directions
        $('a', $directionTab).click(function(evt) {
            evt.preventDefault();

            $('.date_picker_holder').hide();

            var val = $(this).attr('data-value');
            if (val == 'MC') {
                $leaveDate0.data('next', $('#ttOri1'));
                if ($redeemMiles.prop('checked')) {
                    return;
                } else {
                    disableBlock($('#ttRedeemMilesBox'));
                }
                hideRecentRoutes();
                showMC();
            } else {
                $leaveDate0.data('next', $returnDate0);
                if (!$addInsurance.prop('checked')) {
                    enableBlock($('#ttRedeemMilesBox'));
                }
                showRecentRoutes();
                hideMC();

                if (val == 'OW') {
                    disableBlock($returnDate0.parent().parent());
                    addDatepickerToInputs($leaveDate0, $leaveDate0.parent());
                } else if (val == 'RT') {
                    enableBlock($returnDate0.parent().parent());
                    addDatepickerToInputs($returnDate0.add($leaveDate0), $leaveDate0.parent());

                }
            }

            redrawTooltips($container);
            sc($directionTab.attr('id'), val);

            var directionTabHeight = $directionTab.height();
            var offset = $(this).index() * directionTabHeight;
            $directionTab.css('backgroundPosition', '0 ' + (-offset) + 'px');
            $('a', $directionTab).removeClass('current');
            $(this).addClass('current');

            adjustPanelHeight();
        });

        var cookiedTab = rc($directionTab.attr('id'));
        $('a:first-child', $directionTab).click();
        $('a', $directionTab).filter(function(){
            return $(this).attr('data-value') == cookiedTab;
        }).each(function(i, el){
            $(el).click();
        });

        // passengers
        var adtWidget = new PassengerWidget($('#ttADT'), {});
        var chdWidget = new PassengerWidget($('#ttCHD'), {});
        var infWidget = new PassengerWidget($('#ttINF'), {});
        var ythWidget = new PassengerWidget($('#ttYTH'), {});

        function onDisablerClick(evt) {
            var redeemMiles = $redeemMiles.prop('checked') && settings.ticketSSWr12MileageRedemptionEnabled;

            enableBlock(adtWidget.$el);
            enableBlock(chdWidget.$el);
            if (!redeemMiles) enableBlock(infWidget.$el);

            adtWidget.$el.removeClass('disabled');
            chdWidget.$el.removeClass('disabled');
            if (!redeemMiles) infWidget.$el.removeClass('disabled');

            hideTooltip(ythWidget.$el);
            ythWidget.setValue(0);
        }

        function selectHandler(w) {
            var redeemMiles = $redeemMiles.prop('checked') && settings.ticketSSWr12MileageRedemptionEnabled;

            // limits
            var adtVal = adtWidget.getValue();
            var chdVal = chdWidget.getValue();
            var infVal = infWidget.getValue();

            var chdLimit = function() {
                var chdMaxLimit = settings.maxPassengers - adtVal - infVal;
                chdWidget.setLimit(0, chdMaxLimit);
            };

            var infLimit = function() {
                var infMaxLimit = settings.maxPassengers - adtVal - chdVal;
                var infMaxVal = adtVal;
                if (infMaxVal > infMaxLimit) infMaxVal = infMaxLimit;
                infWidget.setLimit(0, infMaxVal);
            };

            if (w == adtWidget) {
                chdLimit();
                infLimit();
            } else if (w == chdWidget || w == infWidget) {
                var adtMinVal = infVal;
                if (adtMinVal < 1) adtMinVal = 1;
                var adtMaxLimit = settings.maxPassengers - infVal - chdVal;
                var adtMaxVal = adtWidget.maxVal;
                if (adtMaxVal > adtMaxLimit) adtMaxVal = adtMaxLimit;
                adtWidget.setLimit(adtMinVal, adtMaxVal);

                if (w == chdWidget) {
                    infLimit();
                } else if (w == infWidget) {
                    chdLimit();
                }
            }

            // disable
            if (w == ythWidget) {
                if (w.getValue() > 0) {
                    disableBlock(adtWidget.$el, false, onDisablerClick);
                    disableBlock(chdWidget.$el, false, onDisablerClick);
                    if (!redeemMiles) disableBlock(infWidget.$el, false, onDisablerClick);

                    adtWidget.$el.addClass('disabled');
                    chdWidget.$el.addClass('disabled');
                    if (!redeemMiles) infWidget.$el.addClass('disabled');

                    showTooltip(w.$el, t('TICKET_YTH_MESSAGE'), true);
                } else {
                    enableBlock(adtWidget.$el);
                    enableBlock(chdWidget.$el);
                    if (!redeemMiles) enableBlock(infWidget.$el);

                    adtWidget.$el.removeClass('disabled');
                    chdWidget.$el.removeClass('disabled');
                    if (!redeemMiles) infWidget.$el.removeClass('disabled');

                    hideTooltip(w.$el);
                }
            }
        }

        // redeem miles
        $redeemMiles.change(function(evt) {
            sc(this.getAttribute('id'), $(this).prop('checked') || '');
            if ($(this).prop('checked')) {
                if (settings.ticketSSWr12MileageRedemptionEnabled) {
                    window.setTimeout(function() {
                        ythWidget.setValue(0);
                        infWidget.setValue(0);
                    }, 1);

                    disableBlock(ythWidget.$el, true);
                    disableBlock(infWidget.$el, true);

                    ythWidget.$el.addClass('disabled');
                    infWidget.$el.addClass('disabled');

                    infWidget.$el.parent().css('height', 0);
                    ythWidget.$el.parent().css('height', 0);

                    $('#ttRedeemInfo').show();

                    disableBlock($('#ttCabinClassBox'));
                } else {
                    disableBlock($('#ttCurrencyBox'));
                    disableBlock($('#ttPromoCodeBox'));
                    disableBlock($('#ttAddInsuranceBox'));
                }

                $('#ttMC').addClass('disabled');
            } else {
                if (settings.ticketSSWr12MileageRedemptionEnabled) {
                    infWidget.$el.parent().css('height', 'auto');
                    ythWidget.$el.parent().css('height', 'auto');

                    enableBlock(ythWidget.$el);
                    enableBlock(infWidget.$el);

                    ythWidget.$el.removeClass('disabled');
                    infWidget.$el.removeClass('disabled');

                    $('#ttRedeemInfo').hide();

                    enableBlock($('#ttCabinClassBox'));
                } else {
                    enableBlock($('#ttCurrencyBox'));
                    enableBlock($('#ttPromoCodeBox'));
                    enableBlock($('#ttAddInsuranceBox'));
                }

                $('#ttMC').removeClass('disabled');
            }
        });

        $([adtWidget, chdWidget, infWidget, ythWidget]).each(function(i, w) {
            w.onChange = function() {
                selectHandler(w);
                sc(w.$el.attr('id'), w.getValue())
            };

            var cookie = rc(w.$el.attr('id')) || 0;
            if(!cookie && (w == adtWidget)){
                w.setValue(1);
            } else {
                w.setValue(cookie);
            }
        });

        var milesCookie = rc($redeemMiles.attr('id'));
        if (milesCookie && !$redeemMiles.is('.disabled')){
            $redeemMiles.prop('checked', true);
            $redeemMiles.change();
        }

        // insurance
        $addInsurance.change(function(evt) {
            if ($(this).prop('checked')) {
                disableBlock($('#ttRedeemMilesBox'));
            } else {
                if (getRealDirectionVal() != 'MC') {
                    enableBlock($('#ttRedeemMilesBox'));
                }
            }
        });

        // confirm
        $('#ttConfirm').change(function(evt) {
            var checked = $(this).prop('checked');
            sc($(this).attr('id'), 0 + checked);
            if (checked) {
                $('#ttSubmitBtn').removeClass('passive');
            } else {
                $('#ttSubmitBtn').addClass('passive');
            }
        });

        var _cv = rc($('#ttConfirm').attr('id'));
        _cv = _cv ? parseInt(_cv, 10) : 0;
        if (settings.language == 'en') {
            _cv = false;
        }
        if (_cv) {
            $('#ttConfirm').prop('checked', 'checked');
            $('#ttConfirm').trigger('change');
        }

        // segments
        var sGroups = [];
        for (var i = 0; i < settings.maxBookingSegments; i++) { sGroups.push({}); }
        $(sGroups).each(function(i, ob) {
            var oriCityWidget = new CityWidget($('#ttOri' + i), {
                data: getCityDataSource({
                    checkCity: function(code) {
                        return isPairAllowed(code, sGroups[i].dest.getValue());
                    }
                }),
                labelByValue: cityLabelByValue,
                cityLinkText: t('CITY_LIST'),
                clearText: t('CLEAR'),
                onSelect: function(val) {
                    sGroups[i].dest.$el.trigger('focus');
                    if (sGroups[i].dest.getValue() == val) {
                        sGroups[i].dest.setValue('');
                    }

                    var gaValue = sGroups[i].gaValue();
                    if (gaValue) {
                        setGACustomVar(5, 'search_route_short', gaValue, 1);
                    }
                },
                onSet: function(val){
                    if(!sGroups[i].ori.options.dontremember){
                        sc(sGroups[i].ori.$el.attr('id'), val);
                    }
                },
                onClear: function(){
                    sc(sGroups[i].ori.$el.attr('id'), '');
                },
                geoCallback: function() {
                    showGeoModal(sGroups[i].ori, [sGroups[i].dest.getValue()]);
                },
                onGeoLocationSelect: function(code) {
                    if (!isPairAllowed(code, sGroups[i].dest.getValue())) {
                        sGroups[i].dest.setValue('');
                    }
                }
            });

            var destCityWidget = new CityWidget($('#ttDest' + i), {
                data: getCityDataSource({
                    checkCity: function(code) {
                        return isPairAllowed(code, sGroups[i].ori.getValue());
                    }
                }),
                labelByValue: cityLabelByValue,
                cityLinkText: t('CITY_LIST'),
                clearText: t('CLEAR'),
                onSelect: function(val) {
                    sGroups[i].leaveDate.trigger('focus');

                    var gaValue = sGroups[i].gaValue();
                    if (gaValue) {
                        setGACustomVar(5, 'search_route_short', gaValue, 1);
                    }
                },
                onSet: function(val) {
                    if(!sGroups[i].dest.options.dontremember){
                        sc(sGroups[i].dest.$el.attr('id'), val);
                    }
                    if (sGroups[i + 1]) {
                        if (sGroups[i + 1].dest.getValue() != val) {
                            sGroups[i + 1].ori.setValue(val);
                        }
                    }
                },
                onClear: function(){
                    sc(sGroups[i].dest.$el.attr('id'), '');
                },
                geoCallback: function() {
                    showGeoModal(sGroups[i].dest, [sGroups[i].ori.getValue()]);
                },
                onGeoLocationSelect: function(code) {
                    if (!isPairAllowed(code, sGroups[i].ori.getValue())) {
                        sGroups[i].ori.setValue('');
                    }
                }
            });

            initToggleBtn($('#ttBtnToggle' + i), oriCityWidget, destCityWidget);
            (i>0) && $('#ttLeaveDate' + i).data('next', $('#ttOri' + (i + 1)));

            sGroups[i] = {
                ori: oriCityWidget,
                dest: destCityWidget,
                leaveDate: $('#ttLeaveDate' + i),
                returnDate: $('#ttReturnDate' + i),
                gaValue: function() {
                    var v1 = oriCityWidget.getValue();
                    var v2 = destCityWidget.getValue();
                    if (v1 && v2) {
                        return [v1, v2].join('_');
                    }
                    return '';
                }
            };
        });

        onSuccessGeolocation = function(code) {
            //sGroups[0].ori.setGeolocation(code); // only one field
            $(sGroups).each(function(i, group) {
                group.dest.options.dontremember = true;
                group.ori.options.dontremember = true;
            });

            $(sGroups).each(function(i, group) { // all fields
                group.dest.setGeolocation(code);
                group.ori.setGeolocation(code);

                var destCookie = rc(group.dest.$el.attr('id'));
                var oriCookie = rc(group.ori.$el.attr('id'));
                if(oriCookie == destCookie){
                    destCookie = "";
                }
                group.dest.setValue(destCookie);
                group.ori.setValue(oriCookie);
                if (!i && !group.ori.getValue() && !(group.dest.getValue() == code)) group.ori.setValue(code);
            });

            $(sGroups).each(function(i, group) {
                group.dest.options.dontremember = false;
                group.ori.options.dontremember = false;
            });
        };
        if (geolocationCity) {
            onSuccessGeolocation(geolocationCity);
        }

        $('.ttMCSep .addBtn').click(function(e) {
            e.preventDefault();
            showSegment(parseInt($(e.target).attr('data-segment'), 10));
            adjustPanelHeight();
            redrawTooltips($container);
        });

        $('.ttMCSep .delBtn').click(function(e) {
            e.preventDefault();
            showSegment(parseInt($(e.target).attr('data-segment'), 10) - 1);
            adjustPanelHeight();
            redrawTooltips($container);
        });

        // modals
        $('#ttModalGeo').dialog({
            autoOpen: false,
            width: 776,
            height: 516,
            modal: true,
            dialogClass: 'blueHeader',
            draggable: false,
            title: t('CITY_LIST'),
            closeText: t('CLOSE'),
            open: function() {
                if ($('.ttGeoTabs').html() == '') {
                    $.each(regions, function(i, e){
                        uncoded_name = e.name.replace('&amp;', '&');
                        var li = $('<li></li>').attr('target', i);
                        var a = $('<a>').attr('href', '#').text(uncoded_name);
                        li.append(a);
                        $('.ttGeoTabs').append(li);
                    });
                    if($.inArray(settings.language, settings.nonAlphabetLanguages)== -1) {
                        var alphab = $('<li class="alphab"></li>').attr('target', 'alphabet');
                        alphab.append($('<a>').attr('href', '#').text(t('ALPHABETICAL')));
                        var alphatable = '<table class="ttGeoAlphabet"><tbody><tr>';
                        $.each(regions.alphabet.letters, function(i, letter){
                            if(i && !(i%6)){
                                alphatable += '</tr><tr>';
                            }
                            alphatable += '<td target="alphabet"><a href="#">'+letter+'</a></td>';
                        });
                        alphatable += '</tr></tbody></table>';
                        alphab.append(alphatable);
                        alphab.click(function(){$('#ttGeoAlphaFilter').val('');});
                        $('.ttGeoTabs').append(alphab);
                    }

                    var first = $('li', '.ttGeoTabs').first()
                                                     .addClass('first');
                    var last = $('li', '.ttGeoTabs').last()
                                                    .addClass('last');

                    switchRegion({target: first});

                    $('.ttGeoTabs').on('click', 'a', function(evt) {
                        evt.preventDefault();
                        switchRegion({target: $(this).parent()});
                    });

                    var $descr = $('<div>').addClass('ttGeoTabsTabDescription');
                    $('.ttGeoSection').append($descr);
                }

                refreshExcluded();

                $('.current a', '.ttGeoTabs').trigger('focus');
            }
        });

        $('.ttGeoTabs').html('');
        $('.ttGeoCityList').html('');

        function refreshCities(filter) {
            var cities = $('a', '.ttGeoCityList').not('.excluded');
            cities.each(function(i, el) {
                if (!filter.test(el.text)) {
                    $(el).attr('data-filtered', 1);
                } else {
                    $(el).removeAttr('data-filtered');
                }
            });

            var visibleLetters = {};
            cities.each(function(i, el) {
                if (!$(el).attr('data-filtered')) {
                    visibleLetters[el.text.split('')[0]] = true;
                }
            });

            var headers = $('h4', '.ttGeoCityList');
            headers.each(function(i, el) {
                if (!visibleLetters[el.innerText]) {
                    $(el).attr('data-filtered', 1);
                } else {
                    $(el).removeAttr('data-filtered');
                }
            });

            $('a, h4', '.ttGeoCityList').removeClass('filtered');
            $('a[data-filtered="1"], h4[data-filtered="1"]', '.ttGeoCityList').addClass('filtered');
        }

        function escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        $('#ttGeoAlphaFilter').keyup(function(evt){
            var filter = evt.target.value;
            if (!filter){
                $('a, h4', '.ttGeoCityList').not('.excluded').removeClass('filtered');
                return;
            }
            var filter = new RegExp(escapeRegExp(filter) + '|' + escapeRegExp(transliterate(filter)), "i");
            refreshCities(filter);

            if ($('a', '.ttGeoCityList').not('.filtered').length == 0){
                switchRegion({target: $('li.alphab', '.ttGeoTabs')});
                refreshCities(filter);
            }

            columnize(4);
        });

        $('#ttGeoAlphaFilter').on('focusin focusout', function(evt){
            $(evt.target).parent().toggleClass('focus');
        });

        $(document).click(function(evt) {
            hideModalOnClick($('#ttModalGeo'), $(evt.target));
        });

        // exchange/refund
        $('#ttRefundLink').click(function(evt) {
            evt.preventDefault();

            var params = {
                page: 'ssw_GuestItinInfoDisplayMessage',
                action: 'GuestItinInfoDisplay',
                posid: currentPosId(),
                language: currentSSWR9Language()
            };

            redirectToURL(settings.SSWR9URL, params);
        });

        // submit
        $('#ttSubmitBtn').click(function(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            if (!$('#ttConfirm').prop('checked')) return;

            var errors = checkForm();
            clearErrors($container)
            if (errors.length) {
                showErrors(errors);
                return;
            }

            $('.aflBtnText', $('#ttSubmitBtn')).hide();
            $('.aflBtnLoader', $('#ttSubmitBtn')).show();

            var directionVal = getRealDirectionVal();
            var redeemMiles = $redeemMiles.prop('checked');

            if (directionVal != 'MC') {
                addRecentRoute(sGroups[0].ori.getValue(), sGroups[0].dest.getValue());
            }

            var gaData = parseGACookie();

            if (redeemMiles && directionVal != 'MC' && !settings.ticketSSWr12MileageRedemptionEnabled) {
                var leaveDM = getDMFromDateField(sGroups[0].leaveDate);
                var returnDM = getDMFromDateField(sGroups[0].returnDate);

                if (directionVal != 'RT') {
                    returnDM = leaveDM;
                }

                var params = {
                    mode: 'booking',
                    action: 'SSWAirAvailService',
                    actionType: 'redeemMiles',
                    page: 'ssw_RedeemMilesSearchMessage',
                    realRequestAir: 'realRequestAir',
                    rem1: 'aeroflotmain',
                    rem2: '',
                    rem3: '',
                    rem4: '',
                    rem5: '',
                    posid: currentPosId(),
                    language: currentSSWR9Language(),
                    geoCountry: settings.country.toLowerCase(),
                    direction: getSSWR9Direction(directionVal),
                    departCity: sGroups[0].ori.getValue(),
                    returnCity: sGroups[0].dest.getValue(),
                    depDay: leaveDM.day,
                    depMonth: leaveDM.month,
                    depTime: '0500',
                    retDay: returnDM.day,
                    retMonth: returnDM.month,
                    retTime: '0500',
                    ADT: adtWidget.getValue(),
                    CHD: chdWidget.getValue(),
                    INF: infWidget.getValue(),
                    YTH: ythWidget.getValue(),
                    classService: getSSWR9ClassService($('#ttCabinClass').val()),
                    flightType: 2 // 1: Any, 2: Non-stop
                };

                if (settings.sendGAData) {
                    params['rem2'] = gaData['utm_source'];
                    params['rem3'] = gaData['utm_campaign'];
                    params['rem4'] = gaData['utm_medium'];
                    params['rem5'] = gaData['utm_content'];

                    for (pr in gaData) {
                        params[pr] = gaData[pr];
                    }
                }

                redirectToURL(settings.SSWR9URL, params);
            } else {
                var leaveDate0 = getISODateFromDateField(sGroups[0].leaveDate);
                var returnDate0 = getISODateFromDateField(sGroups[0].returnDate);

                var params = {
                    searchType: 'NORMAL',
                    journeySpan: directionVal,
                    alternativeLandingPage: 1,
                    lang: currentLanguage(true),
                    currency: $('#ttCurrency').val(),
                    cabinClass: $('#ttCabinClass').val(),
                    referrerCode: 'AFLFORM'
                };

                if (directionVal == 'MC') {
                    if (segmentsOpened >= 0) {
                        params['origin'] = sGroups[0].ori.getValue();
                        params['destination'] = sGroups[0].dest.getValue();
                        params['departureDate'] = leaveDate0;
                    }
                    if (segmentsOpened >= 1) {
                        params['origin2'] = sGroups[1].ori.getValue();
                        params['destination2'] = sGroups[1].dest.getValue();
                        params['departureDate2'] = getISODateFromDateField(sGroups[1].leaveDate);
                    }
                    if (segmentsOpened >= 2) {
                        params['origin3'] = sGroups[2].ori.getValue();
                        params['destination3'] = sGroups[2].dest.getValue();
                        params['departureDate3'] = getISODateFromDateField(sGroups[2].leaveDate);
                    }
                    if (segmentsOpened >= 3) {
                        params['origin4'] = sGroups[3].ori.getValue();
                        params['destination4'] = sGroups[3].dest.getValue();
                        params['departureDate4'] = getISODateFromDateField(sGroups[3].leaveDate);
                    }
                } else {
                    params['origin'] = sGroups[0].ori.getValue();
                    params['destination'] = sGroups[0].dest.getValue();

                    params['departureDate'] = leaveDate0;
                    if (directionVal == 'RT') {
                        params['returnDate'] = returnDate0;
                    }
                }

                if (ythWidget.getValue()) {
                    params['numYouth'] = ythWidget.getValue();
                } else {
                    params['numAdults'] = adtWidget.getValue();
                    params['numChildren'] = chdWidget.getValue();
                    params['numInfants'] = infWidget.getValue();
                }

                if (settings.ticketCouponsEnabled) {
                    if ($.trim($('#ttPromoCode').val())) {
                        params['promoCode'] = $('#ttPromoCode').val();
                    }
                }

                if (redeemMiles && settings.ticketSSWr12MileageRedemptionEnabled) {
                    params['isAward'] = 1;
                    delete params['numInfants'];
                    delete params['numYouth'];
                    delete params['cabinClass'];
                }

                if (settings.sendGAData) {
                    for (pr in gaData) {
                        params[pr] = gaData[pr];
                    }
                }

                redirectToURL(settings.SSWR12URL, params);
            }
        });

        preloadImages(['pass_bg.png', 'pass_dis_bg.png', 'cl_input_a.gif'], settings.imagePath);
        preloadImages(['smoothness/close_orange.png', 'button_def.png', 'button_def_passive.png'], settings.themeImagePath);

        redrawTooltips($container);
    }

    function initEuropcarTab($container) {
        function setSelectVal($el, val, callback) {
            if (typeof(callback) == 'undefined') callback = function() {};

            var options = [];
            $('option', $el).each(function(i, el) {
                options.push($(el).val());
            });

            if ($.inArray(val, options) != -1) {
                $el.setVal(val);
                callback();
            }
        }

        function rebuldLocationSelect($el, data) {
            $('option', $el).remove();
            $el.append($('<option value="">' + t('SELECT_STATION') + '</option>'));
            for (var i = 0; i < data.length; i++) {
                var opt = data[i];
                $el.append($('<option value="' + opt[0] + '">' + opt[1] + '</option>'));
            }
            rebuildSelect($el);
        }

        function onCountryChange($country, $countryBox, $dest, $destBox, onSuccess) {
            if (typeof(onSuccess) == 'undefined') onSuccess = function(data) {};

            var params = {
                country: $country.val()
            };
            $.ajax({
                url: settings.europcarStationsURL,
                data: params,
                dataType: 'json',
                type: 'GET',
                beforeSend: function (xhr) {
                    showFieldLoader($destBox);
                },
                success: function (data) {
                    if (data.success && data.data) {
                        $country.data('options', data.data);
                        enableBlock($destBox);
                        rebuldLocationSelect($dest, data.data);
                        onSuccess(data);
                    }
                },
                complete: function () {
                    hideFieldLoader($destBox);
                },
                error: function () {}
            });
        }

        function setDestEvents() {
            $('#euDest').unbind('change');
            $('#euDest').change(function(evt) {
                $('#euDest').setVal($('#euDest').val());
                if ($('#euSameLocation').is(':checked')) {
                    $('#euReturnDest').setVal($('#euDest').val());
                }
            });
        }

        function euDateTime(date, time) {
            return date.replace(/-/g, '') + time.replace(':', '');
        }

        function checkForm() {
            var errors = [];

            var sameLocation = $('#euSameLocation').is(':checked');

            if (!$('#euCountry').val()) {
                errors.push([$('#euCountry'), t('INVALID_COUNTRY')]);
            }

            if (!$('#euDest').val()) {
                errors.push([$('#euDest'), t('INVALID_LOCATION')]);
            }

            if (!$('#euCountryOfResidence').val()) {
                errors.push([$('#euCountryOfResidence'), t('INVALID_COUNTRY')]);
            }

            if (!sameLocation) {
                if (!$('#euReturnCountry').val()) {
                    errors.push([$('#euReturnCountry'), t('INVALID_COUNTRY')]);
                }

                if (!$('#euReturnDest').val()) {
                    errors.push([$('#euReturnDest'), t('INVALID_LOCATION')]);
                }
            }

            return errors;
        }

        var fieldLoaderOffset = parseInt($('.fieldLoader').css('width'), 10);
        adjustWidth($('#euCountry'), $('#euCountry').parent(), -fieldLoaderOffset);
        adjustWidth($('#euDest'), $('#euDest').parent(), -fieldLoaderOffset);
        adjustWidth($('#euReturnCountry'), $('#euReturnCountry').parent(), -fieldLoaderOffset);
        adjustWidth($('#euReturnDest'), $('#euReturnDest').parent(), -fieldLoaderOffset);
        adjustWidth($('#euCountryOfResidence'), $('#euDest').parent(), -fieldLoaderOffset);
        adjustWidth($('#euPickUpTime'), $('#euPickUpTime').parent(), -fieldLoaderOffset);
        adjustWidth($('#euDropOffTime'), $('#euDropOffTime').parent(), -fieldLoaderOffset);

        initFormElements($container);

        adjustWidth($('#euPickUpDate'));
        adjustWidth($('#euDropOffDate'));

        disableBlock($('#euDestBox'));
        disableBlock($('#euReturnCountryBox'));
        disableBlock($('#euReturnDestBox'));

        var country = settings.country.toUpperCase();

        setSelectVal($('#euCountry'), country);
        setSelectVal($('#euReturnCountry'), country);
        setSelectVal($('#euCountryOfResidence'), country);

        onCountryChange($('#euCountry'), $('#euCountryBox'),
                        $('#euDest'), $('#euDestBox'),
                        function(data) {
                            setDestEvents();
                            rebuldLocationSelect($('#euReturnDest'), data.data);
                        });

        $('#euCountry').change(function(evt) {
            onCountryChange($('#euCountry'), $('#euCountryBox'),
                            $('#euDest'), $('#euDestBox'),
                            function(data) {
                                setDestEvents();
                                if ($('#euSameLocation').is(':checked')) {
                                    rebuldLocationSelect($('#euReturnDest'), data.data);
                                    $('#euReturnCountry').setVal($('#euCountry').val());
                                }
                            });
        });

        $('#euReturnCountry').change(function(evt) {
            if (!$('#euSameLocation').is(':checked')) {
                onCountryChange($('#euReturnCountry'), $('#euReturnCountryBox'),
                                $('#euReturnDest'), $('#euReturnDestBox'));
            }
        });

        $('#euSameLocation').change(function(evt) {
            if ($(this).is(':checked')) {
                $('#euReturnCountry').parent().removeClass('invalid');
                hideTooltip($('#euReturnCountry').parent());

                $('#euReturnDest').parent().removeClass('invalid');
                hideTooltip($('#euReturnDest').parent());

                rebuldLocationSelect($('#euReturnDest'), $('#euCountry').data('options'));
                $('#euReturnCountry').setVal($('#euCountry').val());
                $('#euReturnDest').setVal($('#euDest').val());

                disableBlock($('#euReturnCountryBox'));
                disableBlock($('#euReturnDestBox'));
            } else {
                enableBlock($('#euReturnCountryBox'));
                enableBlock($('#euReturnDestBox'));
            }
        });

        // init dates
        var date = new Date();
        date.setDate(date.getDate() + 1);
        $('#euPickUpDate').val(fmtDate(date, 'dd.mm.yyyy'));
        date.setDate(date.getDate() + 2);
        $('#euDropOffDate').val(fmtDate(date, 'dd.mm.yyyy'));
        addDatepickerToInputs($('#euPickUpDate, #euDropOffDate'), $('#euPickUpDate').parent());

        // init times
        $('#euPickUpTime').setVal('10:00');
        $('#euDropOffTime').setVal('10:00');

        // submit
        $('#euSubmitBtn').click(function(evt) {
            evt.preventDefault();

            var errors = checkForm();
            clearErrors($container)
            if (errors.length) {
                showErrors(errors);
                return;
            }

            $('.aflBtnText', $('#euSubmitBtn')).hide();
            $('.aflBtnLoader', $('#euSubmitBtn')).show();

            var pickUpDate = getISODateFromDateField($('#euPickUpDate'));
            var dropOffDate = getISODateFromDateField($('#euDropOffDate'));

            var params = {
                GA: '13307009-26',
                FTPROG: 'false',
                PROMO: '51972203',
                IATA: '01504791',
                SKIN: '11011',
                FLGT: '',
                SOURCE: 'aeroflot',
                SUPPORT: 'deeplink',
                CAMP: 'deeplinkgeneric',
                PERD: 'Y',
                xtor: 'AL-3000-[affiliate]-[aeroflot]-[0]-[aeroflot_deeplinkgeneric]-[]',

                locale: settings.language,
                DATECO: euDateTime(pickUpDate, $('#euPickUpTime').val()),
                DATECI: euDateTime(dropOffDate, $('#euDropOffTime').val()),
                STATIONCO: $('#euDest').val(),
                CNTRY: $('#euCountryOfResidence').val()
            };

            if ($('#euSameLocation').is(':checked')) {
                params['STATIONCI'] = params['STATIONCO'];
            } else {
                params['STATIONCI'] = $('#euReturnDest').val();
            }

            redirectToURL(settings.europcarLandingURL, params);
        });

        preloadImages(['loader.gif'], settings.imagePath);
        preloadImages(['smoothness/close_orange.png'], settings.themeImagePath);
    }

    function initHotelTab($container) {
        var data = {lang: currentLanguage()};
        hotelbook.initSearchForm(document.getElementById('HotelbookSearchForm'), data);
        adjustWidth($('div.cityWidget', $container));
        adjustWidth($('.ffSelectButton', $container), $('.hb-mt10', $container));
        $($container).on('hotelbook.resize', onWindowResize);
    }

    function adjustPanelHeight() {
        if (settings.adaptiveHeight) {
            var bannerBorderWidth = 3;
            var _f = function() {
                var $panel = $('#bookingTab');

                var $target = $('.main-body');
                var $banner = $('.block-banner');
                var diff = $banner.outerHeight() - bannerBorderWidth;
                if ($('body').hasClass('page-type-front')) {
                    $target = $banner ;
                    diff = -bannerBorderWidth;
                } else if ($('body').hasClass('page-type-front_bonus')) {
                    $target = $('.main-container').last();
                    diff = 0;
                }

                var tH = $target.outerHeight() + diff;
                var tO = $target.offset();
                var pH = $panel.outerHeight();
                var pO = $panel.offset();
                var oD = pO.top - tO.top;
                var d = (pH + oD) - tH;

                if (d < 0) {
                    $target.css('min-height', 0);

                    tH = $target.outerHeight() + diff;
                    tO = $target.offset();
                    pH = $panel.outerHeight();
                    pO = $panel.offset();
                    oD = pO.top - tO.top;
                    d = (pH + oD) - tH;

                    $panel.css('min-height', $panel.height() - d);
                }

                if (d > 0) {
                    $panel.css('min-height', 0);

                    tH = $target.outerHeight() + diff;
                    tO = $target.offset();
                    pH = $panel.outerHeight();
                    pO = $panel.offset();
                    oD = pO.top - tO.top;
                    d = (pH + oD) - tH;

                    $target.css('min-height', $target.height() + d);
                }
            }

            _f();
            _f();
        } else {
            return;

            var $target = $('.main-body');
            if ($('body').hasClass('page-type-front')) {
                $target = $('.block-banner');
            }

            if (typeof($target.attr('data-initial-height')) == 'undefined') {
                $target.attr('data-initial-height', $target.height());
            }

            var h1 = $('#bookingTab').outerHeight() + parseInt($('#bookingPanel').css('top'), 10);

            var h2 = $('.main-body').outerHeight();
            if ($('.block-banner').parent().is('body')) {
                h2 += $('.block-banner').outerHeight();
            }

            var h0 = parseInt($target.attr('data-initial-height'), 10);
            var d = h1 - h2;
            if (d) {
                var h = $target.height() + d;

                if (h > h0) {

                    $target.css('min-height', h);

                } else if ($target.height() != h0) {

                    $target.css('min-height', h0);
                }
            }
        }
    }

    function observe() {
        observerCounter = window.setTimeout(observe, observerInterval);
        adjustPanelHeight();
    }

    function startObserver() {
        if (!observerCounter) {
            observe();
        }
    }

    function stopObserver() {
        if (observerCounter) {
            window.clearTimeout(observerCounter);
            observerCounter = 0;
        }
    }

    var onLoadCallbacks = {
        ticket: initTicketTab,
        europcar: initEuropcarTab,
        hotel: initHotelTab
    };

    function init() {
        preloadImages([
            'loader.gif',
            'ticket_tab.png', 'europcar_tab.png', 'aeroexpress_tab.png',
            'ticket_tab_act.png', 'europcar_tab_act.png', 'aeroexpress_tab_act.png'
        ], settings.imagePath);

        $.datepicker.setDefaults($.datepicker.regional[settings.language]);

        var html = '' +
            '<div id="bookingPanel" class="bookingPanel' + (settings.opened ? '' : ' closed') + '">' +
                '<div id="bookingTab">' +
                    '<div class="bookingSection">' +
                        '<ul class="bookingTabs">' +
                            '<li data-target="ticketBox" id="ticketTab" class="current"><a href="#">' + t('TICKET') + '</a></li>' +
                            '<li data-target="hotelBox" id="hotelTab" style="display: none;"><a href="#">' + t('HOTEL') + '</a></li>' +
                            '<li data-target="europcarBox" id="europcarTab"><a href="#">' + t('EUROPCAR') + '</a></li>' +
                        '</ul>' +
                        '<div class="bookingBoxContainer">' +
                            '<div class="bookingBox" id="ticketBox" data-callback="ticket" data-href="' + settings.ticketURL + '"></div>' +
                            '<div class="bookingBox" id="hotelBox" data-callback="hotel" data-href="' + settings.hotelURL + '"></div>' +
                            '<div class="bookingBox" id="europcarBox" data-callback="europcar" data-href="' + settings.europcarURL + '"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
               ' <div id="bookingTabToggleBtn"></div>' +
            '</div>';
        ui.container.html(html);

        if (settings.showHotelTab) {
            $('#hotelTab').show();
        } else {
            $('.bookingTabs li').addClass('i2');
        }

        $('.bookingTabs a').click(function(evt) {
            evt.preventDefault();

            showTabContent($(this));
        });

        $('.bookingBox').each(function(i, el) {
            $(el).attr('data-min-height', $(el).css('minHeight'));
        });

        $('#bookingTabToggleBtn').click(function() {
            var visible = !$('#bookingPanel').hasClass('closed');
            var width = $('#bookingTab').width();

            if (visible) {
                // top menu
                //$('#topmenu').css('zIndex', 100);
                //$('#topmenu li').first().css('visibility', 'visible');

                $('.bookingBox').css('overflow', 'hidden');
            }

            $('#bookingPanel').animate({
                left: (visible ? -width : 0)
            }, 100, function() {
                if (visible) {
                    //stopObserver();

                    $('#bookingPanel').addClass('closed');
                } else {
                    //startObserver();

                    // top menu
                    //$('#topmenu li').first().css('visibility', 'hidden');
                    //$('#topmenu').css('zIndex', 210);

                    $('#bookingPanel').removeClass('closed');
                    showTabContent($('.bookingTabs .current a'));
                }
            });
        });

        if (!$('#bookingPanel').hasClass('closed')) {
            showTabContent($('.bookingTabs .current a'));
        }

        //if (settings.opened) {
        //    startObserver();
        //}

        onWindowResize();
        $(window).resize(onWindowResize);
    }

    module.init = function(options) {
        for (pr in options) {
            settings[pr] = options[pr];
        }

        for (pr in ui) {
            ui[pr] = $(ui[pr]);
        }

        init();
    };

    module.setGeoData = function(data, feDirections) {
        if (geoDataProcessingAllowed) {
            farEastDirections = feDirections;
            prepareGeoData(data, farEastDirections);
        }
    }

    return module;
}(jQuery));
