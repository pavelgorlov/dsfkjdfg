$.createSelect = function( id_prefix ){
  var hideQJTimeout = false;
  var nameView = new String();
  nameView = $('#'+id_prefix+'Area #name_view').attr('class');
  nameView = nameView.replace (/_/g,'-');
  var list = $('.view-'+nameView+' .view-content .item-list ul').clone(true);
  $('#'+id_prefix+'Options').empty();
  $('#'+id_prefix+'Options').html(list);

  function hideQuickJump(){
    resetQuickJump();
    hideQJTimeout = setTimeout(function(){ if( ! $('#'+id_prefix+'Options li.select-option-hovered').length ){ $('#'+id_prefix+'Options').fadeOut(); } }, Drupal.settings.jumpSelectTimeHide);
  }
  function resetQuickJump(){
   clearTimeout( hideQJTimeout );
  }

  $('#'+id_prefix+'Area').click(function(){
 	if( $('#'+id_prefix+'Options').is(':hidden') ){
	   resetQuickJump();
	   if( $('#'+id_prefix+'Options').is('.select-options-invisible') )
	   $('#'+id_prefix+'Options').removeClass('select-options-invisible').addClass('select-options-visible').appendTo('body');
	   $('#'+id_prefix+'Options').css({ position: 'absolute', top: $(this).offset().top + $(this).height() - 1, left: $(this).offset().left + ($.browser.mozilla ? 1 : 0), width: $(this).width() - 2 }).show();
	   var offset = $('#'+id_prefix+'Options').offset().top + $('#'+id_prefix+'Options').height();
	   offset -= $(window).height();
	   var ScrollTop = document.body.scrollTop;
	   if (ScrollTop == 0) {
	     if (window.pageYOffset)
		   ScrollTop = window.pageYOffset;
		 else
		   ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
	   } 
	   offset -= ScrollTop;
	   if( offset > 0 ){
		 if( $(this).offset().top - $('#'+id_prefix+'Options').height() > ScrollTop ){
		   $('#'+id_prefix+'Options').css({ position: 'absolute', 'top': $(this).offset().top - $('#'+id_prefix+'Options').height() - 2, left: $(this).offset().left + ($.browser.mozilla ? 1 : 0), width: $(this).width() - 2 });
		 }else{
		   $.scrollTo('+=' + (offset + 10) + 'px', { duration:Drupal.settings.jumpSelectTimeHide, easing:'swing' });
		 }
	   }
   }else{
		$('#'+id_prefix+'Options').hide();
   }
  }).mouseover( resetQuickJump ).mouseout( hideQuickJump )
  .children('#'+id_prefix+'Options').hover( resetQuickJump, hideQuickJump )
  .children('li').hover(function(){
  resetQuickJump();
  $(this).addClass('select-option-hovered');
  },function(){
	$(this).removeClass('select-option-hovered');
  }).children('a').click(function(){
    $('#'+id_prefix+'Text').text($(this).text());
  });
} 