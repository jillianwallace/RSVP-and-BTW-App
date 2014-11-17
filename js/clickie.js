$.fn.clickie = function(options){

	var settings = $.extend({
		animation: 'fadeIn'
	}, options);

	var animation = 'animated '+settings.animation;

	$(this).on('click', function(){


		var $src = $(this).data('src');
	
		var $altsrc = $(this).data('altsrc');
		
		
		var $original = $('<img>').attr('src', $src).addClass(animation);
		var $alternate = $('<img>').attr('src', $altsrc).addClass(animation);

		

		if ($(this).find('img').attr('src') == $src) {
			$(this).empty().append($alternate);
			$(this).find('.labelspace').css({
				'color': '#ef6f26',
				'font-size': '20px'
			});

		}else {
			$(this).empty().append($original);
		}

	});
		
}
