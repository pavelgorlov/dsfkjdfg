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
          .attr( "title", "Show All Items" )
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
    $('#combobox').combobox();
};

aeroclass.init = function() {
  aeroclass.plus();
  aeroclass.combo();
}

$(aeroclass.init)
