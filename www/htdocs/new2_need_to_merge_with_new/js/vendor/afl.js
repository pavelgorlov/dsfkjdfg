var AFL = (function($) {
    var module = {};

    var settings = {
        basePath: '/',
        language: 'en',
        lkURL: 'https://www.aeroflot.ru/personal'
    };

    var ui = {
        pageNavBlock: '.page_nav',
        planeBlock: '#plane',
        contentTopImage: '.contentTop',
        toolbarBlock: '.pageToolbar',
        contentBlock: '.content',

        actionLinksCollection: '.action_link'
    };

    function getRequsetVar(name){
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
            return decodeURIComponent(name[1]);
        }
    }

    function getLKLanguage() {
        return (settings.language == 'ru' ? 'ru' : 'en');
    }

    function getActionLinkButtonStyle() {
        var styleMap = {
            ru: 'background:url(' + settings.basePath + 'files/category_pictures/button_u.jpg) no-repeat top left; width:231px; height: 32px; display: inline-block; padding: 0; margin: 0; text-decoration: none;',
            en: 'background:url(' + settings.basePath + 'files/category_pictures/aeroflotbonus/Sing-in.jpg) no-repeat top left; width:167px; height: 32px; display: inline-block; padding: 0; margin: 0; text-decoration: none;'
        };

        if (styleMap[settings.language] != undefined) {
            return styleMap[settings.language];
        }

        var langSuffix = settings.language != 'ru' ? '_' + settings.language : '';
        return 'background:url(' + settings.basePath + 'sites/all/themes/aeroflot/media/img/subscribe_to' + langSuffix + '.jpg) no-repeat top left; width:137px; height: 26px; display: inline-block; padding: 0; margin: 0; text-decoration: none;';
    }

    function initTables() {
        $('.tariff_list').each(function(){
            var rowNum = $(this).find('tr').size();
            var rowType = ['white_bg', 'grey_bg'];

            $(this.rows[0]).addClass('first');
            $(this.rows[0]).find('th:first').addClass('one');
            var k = 0;
            for (var i = 1; i < rowNum; i++) {
                var $tr = $(this.rows[i]);
                var rowspan = $('td', $tr).first().attr('rowspan');
                if (rowspan) k = parseInt(rowspan, 10);

                var t = i % 2;
                if (k) t = k % 2;
                $(this.rows[i]).addClass(rowType[t]);

                if (k) k -= 1;
            }
        });

        $('.list').each(function() {
            $(this.rows[0]).addClass('first');
            $(this.rows[0]).find('th:first').addClass('one');
            $(this.rows[0]).find('th:not(:first)').wrapInner('<div />');
            $(this).find('tr:even(not:first) td').addClass('grey_bg');
        });
    }

    function initPlane() {
        if (!ui.planeBlock.length) return;

        if ($.fn.flash.hasFlash()) {
            ui.planeBlock.flash({
                src: settings.basePath + 'sites/all/themes/aeroflot/static/swf/plane.swf',
                width: '100%',
                height: '100%',
                version: '8',
                wmode: 'transparent'
            });
        } else {
            var $img = $('<img>').attr('src', settings.basePath + 'sites/all/themes/aeroflot/static/img/plane.png');
            ui.planeBlock.append($img);
        }
    }

    function initActionLinks() {
        if (!ui.actionLinksCollection.length) return;

        var member_id = getRequsetVar('member_id');
        var action_code = getRequsetVar('action_code');
        var source = getRequsetVar('source');
        var hash = getRequsetVar('hash');

        var from_query_string = false;
        var href;

        if (member_id && action_code && source && hash) {
            from_query_string = true;
            href = settings.lkURL + '/promotions/register/' + member_id + '/' + action_code + '/' + source + '/' + hash + '/?_preferredLanguage=' + settings.language;
        }

        ui.actionLinksCollection.each(function() {
            if (!from_query_string) {
                action_code = $(this).attr('action_code');
                source = $(this).attr('source');
                href = settings.lkURL + '/promotions/register/' + action_code + '/' + source + '/?_preferredLanguage=' + getLKLanguage();
            }
            $(this).before('<a href="' + href + '" title="" style="' + getActionLinkButtonStyle() + '"></a>');
        });
        ui.actionLinksCollection.remove();
    }

    function initToolbar() {
        if (!ui.toolbarBlock.length) return;

        var html = '';
        ui.toolbarBlock.each(function(i, el) {
            html += $(el).html();
        });

        var $title = $('<div>').attr('class', 'pageTitle');
        var $toolbar = $('<div>').attr('class', 'pageToolbar').html(html);
        $title.append($toolbar);
        $title.append($('<h1>').html($('h1').html()));
        $title.append($('<div>').addClass('clear0'));

        $('h1').remove();
        ui.toolbarBlock.remove();

        ui.contentBlock.prepend($title);

        //$('h1').css('marginRight', $toolbar.width() + 40);
    }

    function initContentTopImage() {
        if (!ui.contentTopImage.length) return;

        var $contentBlock = $('.content');
        if (!$contentBlock.parent().hasClass('contentOuter')) {
            $contentBlock.wrap($('<div class="contentOuter"></div>'));
        }

        var $contentOuterBlock = $('.contentOuter');
        ui.contentTopImage.prependTo($contentOuterBlock);
    }

    function initPage() {
        $('.content ol > li').wrapInner('<span>');
        $('div.content a.cbx_popup').colorbox();

        // fix old style colorbox call
        $('a[onclick^="$.fn.colorbox"]').each(function() {
            var onclick = $(this).attr('onclick');
            onclick = onclick.replace('$.fn.colorbox', '$.colorbox');
            $(this).attr('onclick', '');
            this.onclick = '';
            $(this).click(function(evt) {
                evt.preventDefault();
                eval('(function(){' + onclick + '})()');
            });
        });
    }

    function init() {
        initToolbar();
        initContentTopImage();
        initTables();
        initPage();
        initPlane();
        initActionLinks();
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

    return module;
}(jQuery));


function show_hide(id) {
    $('#' + id).toggle();
}
