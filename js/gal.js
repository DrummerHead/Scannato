$(document).ready(function() {
	$('#doer').submit(function() {
		//getting all the form values
		var url = $('#url').val();
		var start = $('#start').val();
		var end = $('#end').val();
		var format = $('#format').val();
		var padding = $('#padding').val();

		//padding zeroes to make things like 002.jpg instead of just 2.jpg
		function padZeros(theNumber) {
			var numStr = String(theNumber);
		
			while ( numStr.length < padding) {
				numStr = '0' + numStr;
			}
			return numStr;
		};
		
		//this "cleans" the #womb when clicking twice in a row
		$("#womb").html("<span></span>");
		
		//testing setinterval way of putting the code in the page
		/*var ij = start;
		var nEnd = end - start;
		var nSta = 0;
		var timeStretch = 0;
		var addimgs = [];
		while (nSta <= nEnd){
			setTimeout(function(){
				ji = padZeros(ij);
				address = url + ji + format;
				$("#womb").append("<li><a href='"+ address +"'><img src='"+ address +"' alt='"+ ji +"' title='"+ ji +"' /></a></li>");
				ij++;
			}, timeStretch);
			nSta++;
			timeStretch=nSta+(nSta*nSta);
		}*/

		//testing setinterval way of putting the code in the page
		/*var ij = start;
		var nEnd = end - start;
		var nSta = 0;
		var timeStretch = 100
		var metele = setInterval(function(){
			if (nSta <= nEnd) {
				ji = padZeros(ij);
				address = url + ji + format;
				$("#womb").append("<li><a href='"+ address +"'><img src='"+ address +"' alt='"+ ji +"' title='"+ ji +"' /></a></li>");
				ij++;
				nSta++;
				timeStretch = (nSta*2)+100;
				console.log(timeStretch);
			} else {
				clearInterval(metele);
			}
		}, timeStretch);*/

		//the actual appending of elements to #womb
		var htmlToAppend = '';
		for ( var i = start; i <= end; i++ )
			htmlToAppend += "<li><a href='"+ url + padZeros(i) + format +"'><img src='"+ url + padZeros(i) + format +"' alt='"+ padZeros(i) +"' title='"+ padZeros(i) +"' /></a></li>";
		$("#womb").append(htmlToAppend);
		
		$('img').hover(function(){
				var wrapWidth = $('#wrap').width();
				var wrapHeight = $('#wrap').height();
				$(this).addClass('imgHover');

				var imgWidth = $(this).width();
				var imgHeight = $(this).height();
				var imgOffsetLeft = $(this).offset().left
				var imgOffsetTop = $(this).offset().top
				var imgDilate = imgOffsetTop + imgHeight;

				if (imgWidth>wrapWidth) {
					$(this).offset({left:10});
					$(this).css({'width':(wrapWidth-20)+'px'});
					var wrapMinHeight = parseInt($('#wrap').css('min-height'));
					if (imgDilate > wrapMinHeight) {
						$('#wrap').css({'min-height':imgDilate+10});
					}
					
				} else if((imgOffsetLeft+imgWidth)>wrapWidth) {
					var goLeft = wrapWidth-imgWidth-10;
					$(this).offset({left:goLeft})
					var wrapMinHeight = parseInt($('#wrap').css('min-height'));
					if (imgDilate > wrapMinHeight) {
						$('#wrap').css({'min-height':imgDilate+10});
					}
				} else {
					var wrapMinHeight = parseInt($('#wrap').css('min-height'));
					if (imgDilate > wrapMinHeight) {
						$('#wrap').css({'min-height':imgDilate+10});
					}
				}
			},function(){
				$(this).removeClass('imgHover').removeAttr("style").removeAttr("left");				
		})
		
		// last image in row; don't scape
		//the below code does not work anymore with line23
		/*var wombWidth = $('#womb').width();
		var liWidth = $('#womb li').outerWidth();
		var numLiRaw =  wombWidth / liWidth;
		numLiRaw += 'a'
		var numLiNat = numLiRaw.replace(/(\d*).\d*a/,'$1');
		$('#womb li:nth-child('+ numLiNat +'n+1)').addClass('final');*/

		//visited image opaqued
		$('a:visited img').css({'opacity':'0.5'});
		
		return false;
	});
});















