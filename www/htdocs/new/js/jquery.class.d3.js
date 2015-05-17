var aeroclass = window.aeroclass || {};

aeroclass.log = aeroclass.log || function(msg) {
    if (typeof window.console !== 'undefined') {
        console.log(msg);
    }
};

aeroclass.tlenbow = [
    "#ffffff",
    "#f5f5f5",
    "#ebebeb",
    "#e1e1e1",
    "#d7d7d7",
    "#d2d2d2",
    "#cdcdcd",
    "#c3c3c3",
    "#b8b8b8",
    "#aeaeae",
    "#a4a4a4",
    "#9a9a9a",
    "#8f8f8f",
    "#858585",
    "#7b7b7b",
    "#717171",
    "#666666",
    "#5c5c5c",
    "#525252",
    "#484848",
    "#3d3d3d",
    "#333333",
    "#2a2a2a",
    "#1f1f1f",
    "#141414",
    "#000000",
    "#000000"
];

aeroclass.tlenbow330 = [
    "#ffffff",
    "#00ff00",
    "#0022ff",
    "#33bbcc",
    "#bada55",
    "#336699",
    "#ff33ff",
    "#0022ff",
    "#33bbcc",
    "#bada55",
    "#336699",
    "#ff33ff",
    "#00ffff",
    "#ffff00",
    "#00ff00",
    "#ff00ff",
    "#ff0000",
    "#0022ff",
    "#33bbcc",
    "#bada55",
    "#336699",
    "#ff33ff",
    "#00ffff",
    "#ffff00",
    "#00ff00",
    "#000000",
    "#000000"
];

aeroclass.chair = function (obj) {
    obj = $(obj);

    var that = this;
    var toLoad = 0;
    var images = {};
    var cnv, el, ctx, cnv_bg, bg;

    that.images = {};
    that.busy = false;
    that.state = '';
    that.frame = 0;
    that.parent = obj.parent();

    if ( Modernizr.canvas ) {
        cnv = $('<canvas class="aerod3_cnv"></canvas>');
        cnv.attr({
            width: obj.attr('data-w'),
            height: obj.attr('data-h')
        });
        obj.prepend(cnv);
        ctx = cnv.get(0).getContext('2d');

        cnv_bg = $('<canvas class="aerod3_bg"></canvas>');
        cnv_bg.attr({
            width: that.parent.width(),
            height: obj.attr('data-h')
        });
        obj.prepend(cnv);
        obj.prepend(cnv_bg);
        bg = cnv_bg.get(0).getContext('2d');
    } else {
        el = $('<img class="aerod3_image" alt="">');
        el.attr({
            width: obj.attr('data-w'),
            height: obj.attr('data-h')
        });
        obj.prepend(el);
        bg = $('<img class="aerod3_bg" alt="">');
        bg.attr({
            width: that.parent.width(),
            height: obj.attr('data-h')
        });
        obj.prepend(bg);
    }

    var images_path = obj.attr('data-path');
    var images_ext = obj.attr('data-ext');
    var plane_id = obj.attr('data-id');
    images.rotate = obj.attr('data-rotate');
    images.expand = obj.attr('data-expand');
    images.light = obj.attr('data-light');
    images.podgolovnik = obj.attr('data-podgolovnik');
    images.table = obj.attr('data-table');
    images.footer = obj.attr('data-footer');

    // load image
    that.process = function(src, draw) {
        var img = new Image(),
            now;

        if ( !Modernizr.canvas ) {
            now = '?anticache=' + (+new Date());
        } else {
            now = '';
        }

        $(img)
            .on('load', function() {
                img._ready = true;

                if ( draw ) {
                    if ( Modernizr.canvas ) {
                        try {
                            ctx.drawImage(img, 0, 0);
                        } catch(e) {
                            aeroclass.log(e);
                        }
                    } else {
                        try {
                            el.attr('src', img.src);
                        } catch(e) {
                            aeroclass.log(e);
                        }
                    }
                }
                toLoad--;
                if ( toLoad === 0 ) {
                    obj.addClass('ready');
                }
            })
            .on('error', function(e) {
                aeroclass.log('[Image ' + src + ' loading error]');
                img._error = true;
            })
            .attr({
                src: src + now
            });

        return img;
    };

    // image name add zero
    function addZero(name) {
        name = name.toString();

        if (name.length === 2) {
            return '0' + name;
        } else if (name.length === 1) {
            return '00' + name;
        }

        return name;
    }

    // process images on start
    function loadImages() {
        obj.removeClass('ready');
        for (var key in images) {
            if ( typeof images[key] !== 'undefined' ) {
                that.images[key] = [];
                var key_len = parseInt(images[key], 10);

                toLoad += key_len;

                for (var i = 0; i < key_len; i++) {
                    var drawFirst = false;
                    if (key === 'expand' && i === 0) {
                        drawFirst = true;
                    }
                    that.images[key][i] = that.process( images_path + key + '/' + addZero(i) + '.' + images_ext, drawFirst);
                }
            }
        }
    }

    // table animation
    function _tableAnim(callback) {
        if ( that.state === 'light' ) {
            that.anim('light', function() {
                that.anim('expand', function() {
                    that.anim('table');
                });
            });
        } else if ( that.state === 'footer' ) {
            that.anim('footer', function() {
                that.anim('table');
            });
        } else if ( that.state === 'podgolovnik' ) {
            that.anim('podgolovnik', function() {
                that.anim('table');
            });
        } else if ( that.state === 'expanded' ) {
            that.anim('expand', function() {
                that.anim('table');
            });
        } else if ( that.state === 'table' ) {
            that.busy = true;

            var i, len;
            var rAFte;

            i = that.images['table'].length - 1;

            function _collapseTableStep() {
                if ( i > 0 ) {
                    i--;
                } else if (rAFte) {
                    cancelAnimationFrame(rAFte);
                    rAFte = null;
                    that.busy = false;

                    that.state = '';
                    that.parent.removeClass('table');

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['table'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['table'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animateTableCollapse() {
                rAFte = requestAnimationFrame( animateTableCollapse );
                _collapseTableStep();
            }

            rAFte = requestAnimationFrame( animateTableCollapse );
        } else if ( that.frame !== 0 ) {
            that.parent.addClass('expanded');
            that.state = 'expanded';
            that.anim('expand', function() {
                that.anim('table');
            });
        } else {
            that.busy = true;

            var i, len;
            var rAFtc;

            i = 0;
            len = that.images['table'].length - 1;

            function _expandTableStep() {
                if ( i < len ) {
                    i++;
                } else if (rAFtc) {
                    cancelAnimationFrame(rAFtc);
                    rAFtc = null;
                    that.busy = false;

                    that.state = 'table';
                    that.parent.addClass('table');

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['table'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['table'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animateTableExpand() {
                rAFtc = requestAnimationFrame( animateTableExpand );
                _expandTableStep();
            }

            rAFtc = requestAnimationFrame( animateTableExpand );
        }
    }

    // rotate animation
    function _rotateAnim(callback) {
        if ( that.state === 'light' ) {
            that.anim('light', function() {
                that.anim('expand', function() {
                    that.anim('rotate');
                });
            });
        } else if ( that.state === 'footer' ) {
            that.anim('footer', function() {
                that.anim('rotate');
            });
        } else if ( that.state === 'podgolovnik' ) {
            that.anim('podgolovnik', function() {
                that.anim('rotate');
            });
        } else if ( that.state === 'table' ) {
            that.anim('table', function() {
                that.anim('rotate');
            });
        } else if ( that.state === 'expanded' ) {
            // if expanded
            // collapse and rotate
            that.anim('expand', function() {
                that.anim('rotate');
            });
        } else if ( that.frame !== that.images['expand'].length - 1 && that.frame !== 0 ) {
            that.parent.addClass('expanded');
            that.state = 'expanded';
            that.anim('expand', function() {
                that.anim('rotate');
            });
        } else {
            // rotate
            that.busy = true;
            that.parent.addClass('rotated');

            var i = 0,
                len = that.images['rotate'].length - 1,
                rAF;

            function _rotateStep() {
                if ( i < len ) {
                    i++;
                } else if (rAF) {
                    cancelAnimationFrame(rAF);
                    rAF = null;
                    that.busy = false;
                    that.parent.removeClass('rotated');
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['rotate'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['rotate'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animateRotation() {
                rAF = requestAnimationFrame( animateRotation );
                _rotateStep();
            }

            rAF = requestAnimationFrame( animateRotation );
        }
    }

    // expand animation
    function _expandAnim(callback) {
        if ( that.state === 'table' ) {
            that.anim('table', function() {
                that.anim('expand');
            });
        } else if ( that.state === 'podgolovnik' ) {
            that.anim('podgolovnik', function() {
                that.anim('expand');
            });
        } else if ( that.state === 'footer' ) {
            that.anim('footer', function() {
                that.anim('expand');
            });
        } else if ( that.state === 'light' ) {
            that.anim('light', function() {
                that.anim('expand');
            });
        } else if ( that.state === 'expanded' ) {
            that.busy = true;

            var i, len;
            var rAFe;

            i = that.frame;

            function _collapseStep() {
                if ( i > 0 ) {
                    i--;
                } else if (rAFe) {
                    cancelAnimationFrame(rAFe);
                    rAFe = null;
                    that.busy = false;

                    that.state = '';
                    obj.removeClass('expanded');
                    // that.slider('value', 0);
                    that.frame = 0;

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['expand'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['expand'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animateCollapse() {
                rAFe = requestAnimationFrame( animateCollapse );
                _collapseStep();
            }

            rAFe = requestAnimationFrame( animateCollapse );
        } else {
            that.busy = true;

            var i, len;
            var rAFc;

            //i = 0;
            i = that.frame;
            len = that.images['expand'].length - 1;
            function _expandStep() {
                if ( i < len ) {
                    i++;
                } else if (rAFc) {
                    cancelAnimationFrame(rAFc);
                    rAFc = null;
                    that.busy = false;

                    that.state = 'expanded';
                    obj.addClass('expanded');
                    // that.slider('value', that.images['expand'].length - 1);
                    that.frame = that.images['expand'].length - 1;

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['expand'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['expand'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animateExpand() {
                rAFc = requestAnimationFrame( animateExpand );
                _expandStep();
            }

            rAFc = requestAnimationFrame( animateExpand );
        }
    }

    // light animation
    function _lightAnim(callback) {
        if ( that.state === 'expanded' ) {
            if ( that.frame !== that.images['expand'].length - 1 ) {
                that.state = '';
                that.parent.removeClass('expanded');
                that.anim('light');
            } else {
                that.busy = true;

                // turn on the light
                var i, len;
                var rAFon;
                var bg_w, bg_h;

                if ( Modernizr.canvas ) {
                    bg_w = cnv_bg.width();
                    bg_h = cnv_bg.height();
                    cnv_bg.show();
                } else {
                    bg.show();
                }

                i = 0;
                len = that.images['light'].length - 1;

                function _lightStep() {
                    if ( i < len ) {
                        i++;
                    } else if (rAFon) {
                        cancelAnimationFrame(rAFon);
                        rAFon = null;
                        that.busy = false;

                        that.state = 'light';
                        that.parent.addClass('light');

                        if ( $.isFunction(callback) ) {
                            callback.apply(this);
                        }
                    }

                    if ( Modernizr.canvas ) {
                        try {
                            ctx.drawImage(that.images['light'][i], 0, 0);
                            if (plane_id === '330') {
                                bg.fillStyle = aeroclass.tlenbow330[i];
                            } else {
                                bg.fillStyle = aeroclass.tlenbow[i];
                            }
                            bg.fillRect(0, 0, bg_w, bg_h);
                        } catch(e) {
                            aeroclass.log(e);
                        }
                    } else {
                        if (plane_id === '330') {
                            bg.css({
                                backgroundColor: aeroclass.tlenbow330[i]
                            });
                        } else {
                            bg.css({
                                backgroundColor: aeroclass.tlenbow[i]
                            });
                        }

                        try {
                            el.attr('src', that.images['light'][i].src);
                        } catch(e) {
                            aeroclass.log(e);
                        }
                    }
                }

                function animateLightOn() {
                    rAFon = requestAnimationFrame( animateLightOn );
                    _lightStep();
                }

                rAFon = requestAnimationFrame( animateLightOn );

            }
        } else if ( that.state === 'light' ) {
            that.busy = true;

            // turn off the light
            var i, len;
            var rAFoff;
            var bg_w, bg_h;

            if ( Modernizr.canvas ) {
                bg_w = cnv_bg.width();
                bg_h = cnv_bg.height();
            }

            i = that.images['light'].length - 1;

            function _lightOffStep() {
                if ( i > 0 ) {
                    i--;
                } else if (rAFoff) {
                    cancelAnimationFrame(rAFoff);
                    rAFoff = null;
                    that.busy = false;

                    that.state = 'expanded';
                    that.parent.removeClass('light');
                    that.parent.addClass('expanded');
                    if ( Modernizr.canvas ) {
                        cnv_bg.hide();
                    } else {
                        bg.hide();
                    }

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['light'][i], 0, 0);
                        if (plane_id === '330') {
                            bg.fillStyle = aeroclass.tlenbow330[i];
                        } else {
                            bg.fillStyle = aeroclass.tlenbow[i];
                        }

                        bg.fillRect(0, 0, bg_w, bg_h);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['light'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                    if (plane_id === '330') {
                        bg.css({
                            backgroundColor: aeroclass.tlenbow330[i]
                        });
                    } else {
                        bg.css({
                            backgroundColor: aeroclass.tlenbow[i]
                        });
                    }

                }
            }

            function animateLightOff() {
                rAFoff = requestAnimationFrame( animateLightOff );
                _lightOffStep();
            }

            rAFoff = requestAnimationFrame( animateLightOff );

            // that.parent.css({
            //   backgroundColor: '#fff'
            // });
        } else if ( that.state === 'table' ) {
            that.anim('table', function() {
                that.anim('expand', function() {
                    that.anim('light');
                });
            });
        } else if ( that.state === 'podgolovnik' ) {
            that.anim('podgolovnik', function() {
                that.anim('expand', function() {
                    that.anim('light');
                });
            });
        } else if ( that.state === 'footer' ) {
            that.anim('footer', function() {
                that.anim('expand', function() {
                    that.anim('light');
                });
            });
        } else {
            // expand and turn on the light
            that.anim('expand', function() {
                that.anim('light');
            });
        }
    }

    // footer animation
    function _footerAnim(callback) {
        if ( that.state === 'expanded' ) {
            // turn off expand
            that.anim('expand', function() {
                // turn on footer
                that.anim('footer');
            });
        } else if ( that.state === 'table' ) {
            // turn off table
            that.anim('table', function() {
                // turn on footer
                that.anim('footer');
            });
        } else if ( that.state === 'podgolovnik' ) {
            // turn off podgolovnik
            that.anim('podgolovnik', function() {
                // turn on footer
                that.anim('footer');
            });
        } else if ( that.state === 'light' ) {
            // turn off light
            that.anim('light', function() {
                // turn off expand
                that.anim('expand', function() {
                    // turn on footer
                    that.anim('footer');
                });
            });
        } else if ( that.state === 'footer' ) {
            // turn off footer
            that.busy = true;

            var i, len;
            var rAFfe;

            i = that.images['footer'].length - 1;

            function _collapseFooterStep() {
                if ( i > 0 ) {
                    i--;
                } else if (rAFfe) {
                    cancelAnimationFrame(rAFfe);
                    rAFfe = null;
                    that.busy = false;

                    that.state = '';
                    that.parent.removeClass('footer');

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['footer'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['footer'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animateFooterCollapse() {
                rAFfe = requestAnimationFrame( animateFooterCollapse );
                _collapseFooterStep();
            }

            rAFfe = requestAnimationFrame( animateFooterCollapse );
        } else {
            // turn on footer
            that.busy = true;

            var i, len;
            var rAFfc;

            i = 0;
            len = that.images['footer'].length - 1;

            function _expandFooterStep() {
                if ( i < len ) {
                    i++;
                } else if (rAFfc) {
                    cancelAnimationFrame(rAFfc);
                    rAFfc = null;
                    that.busy = false;

                    that.state = 'footer';
                    that.parent.addClass('footer');

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['footer'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['footer'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animateFooterExpand() {
                rAFfc = requestAnimationFrame( animateFooterExpand );
                _expandFooterStep();
            }

            rAFfc = requestAnimationFrame( animateFooterExpand );
        }
    }

    // podgolovnik animation
    function _podgolovnikAnim(callback) {
        if ( that.state === 'expanded' ) {
            // turn off expand
            that.anim('expand', function() {
                // turn on footer
                that.anim('footer');
            });
        } else if ( that.state === 'footer' ) {
            that.anim('footer', function() {
                that.anim('podgolovnik');
            });
        } else if ( that.state === 'table' ) {
            // turn off table
            that.anim('table', function() {
                // turn on footer
                that.anim('footer');
            });
        } else if ( that.state === 'light' ) {
            // turn off light
            that.anim('light', function() {
                // turn off expand
                that.anim('expand', function() {
                    // turn on footer
                    that.anim('footer');
                });
            });
        } else if ( that.state === 'podgolovnik' ) {
            // turn off podgolovnik
            that.busy = true;

            var i, len;
            var rAFhe;

            i = that.images['podgolovnik'].length - 1;

            function _collapsePodgolovnikStep() {
                if ( i > 0 ) {
                    i--;
                } else if (rAFhe) {
                    cancelAnimationFrame(rAFhe);
                    rAFhe = null;
                    that.busy = false;

                    that.state = '';
                    that.parent.removeClass('podgolovnik');

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['podgolovnik'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['podgolovnik'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animatePodgolovnikCollapse() {
                rAFhe = requestAnimationFrame( animatePodgolovnikCollapse );
                _collapsePodgolovnikStep();
            }

            rAFhe = requestAnimationFrame( animatePodgolovnikCollapse );
        } else {
            // turn on podgolovnik
            that.busy = true;

            var i, len;
            var rAFhc;

            i = 0;
            len = that.images['podgolovnik'].length - 1;

            function _expandPodgolovnikStep() {
                if ( i < len ) {
                    i++;
                } else if (rAFhc) {
                    cancelAnimationFrame(rAFhc);
                    rAFhc = null;
                    that.busy = false;

                    that.state = 'podgolovnik';
                    that.parent.addClass('podgolovnik');

                    if ( $.isFunction(callback) ) {
                        callback.apply(this);
                    }
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['podgolovnik'][i], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['podgolovnik'][i].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }

            function animatePodgolovnikExpand() {
                rAFhc = requestAnimationFrame( animatePodgolovnikExpand );
                _expandPodgolovnikStep();
            }

            rAFhc = requestAnimationFrame( animatePodgolovnikExpand );
        }
    }

    // animations
    that.anim = function(type, callback) {
        if ( that.busy ) {
            return;
        }

        switch (type) {
            case 'rotate':
                _rotateAnim(callback);
                break;
            case 'light':
                _lightAnim(callback);
                break;
            case 'expand':
                _expandAnim(callback);
                break;
            case 'table':
                _tableAnim(callback);
                break;
            case 'footer':
                _footerAnim(callback);
                break;
            case 'podgolovnik':
                _podgolovnikAnim(callback);
        }
    };

    // expand slider
    function sliderInit() {
        if (typeof $.fn.slider === 'undefined') {
            return;
        }

        that.slider = that.parent.find('div.slider');

        that.slider.slider({
            min: 0,
            max: that.images['expand'].length - 1,
            slide: function( event, ui ) {
                that.frame = ui.value;

                if ( that.frame === 0 ) {
                    // min
                    that.parent.removeClass('expanded');
                } else if ( that.frame === that.images['expand'].length - 1 ) {
                    // max
                    that.parent.addClass('expanded');
                    that.state = 'expanded';
                }

                if ( Modernizr.canvas ) {
                    try {
                        ctx.drawImage(that.images['expand'][that.frame], 0, 0);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                } else {
                    try {
                        el.attr('src', that.images['expand'][that.frame].src);
                    } catch(e) {
                        aeroclass.log(e);
                    }
                }
            }
        });
    }

    that.inited = false;

    that.init = function() {
        if (that.inited) {
            return;
        }

        loadImages();
        sliderInit();

        $('a.rotate', obj).on('click', function() {
            that.anim('rotate');
            return false;
        });

        $('a.light', obj).on('click', function() {
            that.anim('light');
            return false;
        });

        $('a.expand', obj).on('click', function() {
            that.anim('expand');
            return false;
        });

        $('a.table', obj).on('click', function() {
            that.anim('table');
            return false;
        });

        $('a.footer', obj).on('click', function() {
            that.anim('footer');
            return false;
        });

        $('a.podgolovnik', obj).on('click', function() {
            that.anim('podgolovnik');
            return false;
        });

        that.inited = true;
    };

    obj.data('3d', that);

    return obj;
};
$(function() {
    $('div.aerod3-js').each(function() {
        var acl3d = new aeroclass.chair(this);
        if ( acl3d.is(':visible') ) {
            var acl3d_api = $(this).data('3d');
            acl3d_api.init();
        }
    });
});