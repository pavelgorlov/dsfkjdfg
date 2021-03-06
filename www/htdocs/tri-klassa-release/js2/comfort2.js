/*! Social Likes v3.0.2 by Artem Sapegin - http://sapegin.github.com/social-likes - Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a,b){this.container=a,this.options=b,this.init()}function c(b,c){this.widget=b,this.options=a.extend({},c),this.detectService(),this.service&&this.init()}function d(a){function b(a,b){return b.toUpper()}var c={},d=a.data();for(var e in d){var f=d[e];"yes"===f?f=!0:"no"===f&&(f=!1),c[e.replace(/-(\w)/g,b)]=f}return c}function e(a,b){return f(a,b,encodeURIComponent)}function f(a,b,c){return a.replace(/\{([^\}]+)\}/g,function(a,d){return d in b?c?c(b[d]):b[d]:a})}function g(a,b){var c=k+a;return c+" "+c+"_"+b}function h(b,c){function d(g){"keydown"===g.type&&27!==g.which||a(g.target).closest(b).length||(b.removeClass(l),e.off(f,d),a.isFunction(c)&&c())}var e=a(document),f="click touchstart keydown";e.on(f,d)}function i(a){var b=10;if(document.documentElement.getBoundingClientRect){var c=parseInt(a.css("left"),10),d=parseInt(a.css("top"),10),e=a[0].getBoundingClientRect();e.left<b?a.css("left",b-e.left+c):e.right>window.innerWidth-b&&a.css("left",window.innerWidth-e.right-b+c),e.top<b?a.css("top",b-e.top+d):e.bottom>window.innerHeight-b&&a.css("top",window.innerHeight-e.bottom-b+d)}a.addClass(l)}var j="social-likes",k=j+"__",l=j+"_opened",m="https:"===location.protocol?"https:":"http:",n={facebook:{counterUrl:"https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",convertNumber:function(a){return a.data[0].total_count},popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",popupWidth:600,popupHeight:500},twitter:{counterUrl:m+"//urls.api.twitter.com/1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:m+"//twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){return/[\.:\-вЂ“вЂ”]\s*$/.test(this.options.title)||(this.options.title+=":"),!0}},mailru:{counterUrl:m+"//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",convertNumber:function(a){for(var b in a)if(a.hasOwnProperty(b))return a[b].shares},popupUrl:m+"//connect.mail.ru/share?share_url={url}&title={title}",popupWidth:550,popupHeight:360},vkontakte:{counterUrl:m+"//vk.com/share.php?act=count&url={url}&index={index}",counter:function(b,c){var d=n.vkontakte;d._||(d._=[],window.VK||(window.VK={}),window.VK.Share={count:function(a,b){d._[a].resolve(b)}});var f=d._.length;d._.push(c),a.getScript(e(b,{index:f})).fail(c.reject)},popupUrl:m+"//vk.com/share.php?url={url}&title={title}",popupWidth:550,popupHeight:330},odnoklassniki:{counterUrl:m+"//www.odnoklassniki.ru/dk?st.cmd=shareData&ref={url}&cb=?",convertNumber:function(a){return a.count},popupUrl:m+"//www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl={url}",popupWidth:550,popupHeight:360},plusone:{counterUrl:m+"//share.yandex.ru/gpp.xml?url={url}",counter:function(b,c){var d=n.plusone;return d._?(c.reject(),void 0):(window.services||(window.services={}),window.services.gplus={cb:function(a){d._.resolve(a)}},d._=c,a.getScript(e(b)).fail(c.reject),void 0)},popupUrl:"https://plus.google.com/share?url={url}",popupWidth:700,popupHeight:500},pinterest:{counterUrl:m+"//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:m+"//pinterest.com/pin/create/button/?url={url}&description={title}",popupWidth:630,popupHeight:270}},o={promises:{},fetch:function(b,c,d){o.promises[b]||(o.promises[b]={});var f=o.promises[b];if(!d.forceUpdate&&f[c])return f[c];var g=a.extend({},n[b],d),h=a.Deferred(),i=g.counterUrl&&e(g.counterUrl,{url:c});return a.isFunction(g.counter)?g.counter(i,h):g.counterUrl?a.getJSON(i).done(function(b){try{var c=b;a.isFunction(g.convertNumber)&&(c=g.convertNumber(b)),h.resolve(c)}catch(d){h.reject()}}).fail(h.reject):h.reject(),f[c]=h.promise(),f[c]}};a.fn.socialLikes=function(c){return this.each(function(){var e=a(this),f=e.data(j);f?a.isPlainObject(c)&&f.update(c):(f=new b(e,a.extend({},a.fn.socialLikes.defaults,c,d(e))),e.data(j,f))})},a.fn.socialLikes.defaults={url:window.location.href.replace(window.location.hash,""),title:document.title,counters:!0,zeroes:!1,wait:500,popupCheckInterval:500,singleTitle:"Share"},b.prototype={init:function(){this.container.addClass(j),this.single=this.container.hasClass(j+"_single"),this.initUserButtons(),this.number=0,this.container.on("counter."+j,a.proxy(this.updateCounter,this));var b=this.container.children();this.countersLeft=b.length,this.makeSingleButton(),this.buttons=[],b.each(a.proxy(function(b,d){this.buttons.push(new c(a(d),this.options))},this)),this.options.counters?this.timer=setTimeout(a.proxy(this.appear,this),this.options.wait):this.appear()},initUserButtons:function(){!this.userButtonInited&&window.socialLikesButtons&&a.extend(!0,n,socialLikesButtons),this.userButtonInited=!0},makeSingleButton:function(){if(this.single){var b=this.container;b.addClass(j+"_vertical"),b.wrap(a("<div>",{"class":j+"_single-w"}));var c=b.parent(),d=a("<div>",{"class":g("widget","single")}),e=a(f('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>',{buttonCls:g("button","single"),iconCls:g("icon","single"),title:this.options.singleTitle}));d.append(e),c.append(d),d.click(function(){var a=j+"__widget_active";return d.addClass(a),b.css({left:-(b.width()-d.width())/2,top:-b.height()}),i(b),h(b,function(){d.removeClass(a)}),!1}),this.widget=d}},update:function(b){if(b.forceUpdate||b.url!==this.options.url){this.number=0,this.countersLeft=this.buttons.length,this.widget&&this.widget.find("."+j+"__counter").remove(),a.extend(this.options,b);for(var c=0;c<this.buttons.length;c++)this.buttons[c].update(b)}},updateCounter:function(a,b,c){c&&(this.number+=c,this.single&&this.getCounterElem().text(this.number)),this.countersLeft--,0===this.countersLeft&&(this.appear(),this.container.addClass(j+"_ready"),this.container.trigger("ready."+j,this.number))},appear:function(){this.container.addClass(j+"_visible")},getCounterElem:function(){var b=this.widget.find("."+k+"counter_single");return b.length||(b=a("<span>",{"class":g("counter","single")}),this.widget.append(b)),b}},c.prototype={init:function(){this.detectParams(),this.initHtml(),this.initCounter()},update:function(b){a.extend(this.options,{forceUpdate:!1},b),this.widget.find("."+j+"__counter").remove(),this.initCounter()},detectService:function(){for(var b=this.widget[0].classList||this.widget[0].className.split(" "),c=0;c<b.length;c++){var d=b[c];if(n[d])return this.service=d,a.extend(this.options,n[d]),void 0}},detectParams:function(){var a=this.widget.data();if(a.counter){var b=parseInt(a.counter,10);isNaN(b)?this.options.counterUrl=a.counter:this.options.counterNumber=b}a.title&&(this.options.title=a.title),a.url&&(this.options.url=a.url)},initHtml:function(){var b=this.options,c=this.widget,d=c.find("a");d.length&&this.cloneDataAttrs(d,c);var f=a("<span>",{"class":this.getElementClassNames("button"),text:c.text()});if(b.clickUrl){var g=e(b.clickUrl,{url:b.url,title:b.title}),h=a("<a>",{href:g});this.cloneDataAttrs(c,h),c.replaceWith(h),this.widget=c=h}else c.click(a.proxy(this.click,this));c.removeClass(this.service),c.addClass(this.getElementClassNames("widget")),f.prepend(a("<span>",{"class":this.getElementClassNames("icon")})),c.empty().append(f),this.button=f},initCounter:function(){if(this.options.counters)if(this.options.counterNumber)this.updateCounter(this.options.counterNumber);else{var b={counterUrl:this.options.counterUrl,forceUpdate:this.options.forceUpdate};o.fetch(this.service,this.options.url,b).always(a.proxy(this.updateCounter,this))}},cloneDataAttrs:function(a,b){var c=a.data();for(var d in c)c.hasOwnProperty(d)&&b.data(d,c[d])},getElementClassNames:function(a){return g(a,this.service)},updateCounter:function(b){b=parseInt(b,10)||0;var c={"class":this.getElementClassNames("counter"),text:b};b||this.options.zeroes||(c["class"]+=" "+j+"__counter_empty",c.text="");var d=a("<span>",c);this.widget.append(d),this.widget.trigger("counter."+j,[this.service,b])},click:function(b){var c=this.options,d=!0;if(a.isFunction(c.click)&&(d=c.click.call(this,b)),d){var f=e(c.popupUrl,{url:c.url,title:c.title});f=this.addAdditionalParamsToUrl(f),this.openPopup(f,{width:c.popupWidth,height:c.popupHeight})}return!1},addAdditionalParamsToUrl:function(b){var c=a.param(a.extend(this.widget.data(),this.options.data));if(a.isEmptyObject(c))return b;var d=-1===b.indexOf("?")?"?":"&";return b+d+c},openPopup:function(b,c){var d=Math.round(screen.width/2-c.width/2),e=0;screen.height>c.height&&(e=Math.round(screen.height/3-c.height/2));var f=window.open(b,"sl_"+this.service,"left="+d+",top="+e+",width="+c.width+",height="+c.height+",personalbar=0,toolbar=0,scrollbars=1,resizable=1");if(f){f.focus(),this.widget.trigger("popup_opened."+j,[this.service,f]);var g=setInterval(a.proxy(function(){f.closed&&(clearInterval(g),this.widget.trigger("popup_closed."+j,this.service))},this),this.options.popupCheckInterval)}else location.href=b}},a(function(){a("."+j).socialLikes()})});
;(function($, undefined) {
  function initComfortCarousel() {
    var slicer = $('div.comfort'),
        slicer_width = slicer.width(),
        node = $('div.comfort-node', slicer),
        pages = $('div.comfort-nav > a'),
        pages_len = pages.length,
        index = 0,
        prev = $('a.comfort-prev', slicer),
        next = $('a.comfort-next', slicer);

    function resetSlicer() {
      slicer_width = slicer.width();
      node.css({
        left: -index * slicer_width
      });
    }
    resetSlicer();
    $(window).resize(function() {
      resetSlicer();
    });

    function nodeMove() {
      pages
        .removeClass('current')
        .eq(index).addClass('current');

      node
        .stop()
        .animate({
          left: -slicer_width * index
        }, {
          duration: 200,
          easing: 'linear'
        })
    }

    pages.eq(index).addClass('current');

    pages.click(function() {
      index = pages.index(this);

      nodeMove();

      return false;
    });

    prev.click(function() {
      if ( index > 0 ) {
        index--;
      } else {
        index = pages_len - 1;
      }

      nodeMove();

      return false;
    });

    next.click(function() {
      if ( index < pages_len - 1 ) {
        index++;
      } else {
        index = 0;
      }

      nodeMove();

      return false;
    });
  }

  function initComfortPlus() {
    var c_plus = $('.comfort-plus'),
        c_over = c_plus.eq(0).closest('div.comfort-slide').find('div.comfort-overlay'),
        c_img = c_plus.eq(0).closest('div.comfort-slide').find('img.comfort-img-scale');

    c_plus.each(function() {
      var comfort = $(this),
          comfortOpener = $('div.comfort-plus-icon', comfort),
          comfortCloser = $('a.comfort-plus-close', comfort);

      comfortOpener.click(function() {
        if ( comfort.hasClass('open') ) {
          return;
        } else {
          var c_o = $('.comfort-plus').filter('.open');

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

      if ( !target.hasClass('comfort-plus') && target.parents('.comfort-plus').length === 0 ) {
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
  }

  function initComfortFeatures() {
    $('div.comfort-features').each(function() {
      var feats = $(this),
          feat = $('div.comfort-feature', feats);

      feat.click(function() {
        var that = $(this);

        if ( that.hasClass('open') ) {
          that.removeClass('open');
        } else {
          feat.removeClass('open');
          that.addClass('open');
        }
      })
    })
  }

  $(function() {
    initComfortCarousel();
    initComfortPlus();
    initComfortFeatures();
  });
})(jQuery);
