$(document).ready(function() {
	$('#doit').click(function() {
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

		//the actual appending of elements to #womb
		var htmlToAppend = '';
		for ( var i = start; i <= end; i++ )
			htmlToAppend += "<li><a href='"+ url + padZeros(i) + format +"'><img src='"+ url + padZeros(i) + format +"' alt='"+ padZeros(i) +"' title='"+ padZeros(i) +"' /></a></li>";
		$("#womb").append(htmlToAppend);
		
		// last image in row; don't scape
		var wombWidth = $('#womb').width();
		var liWidth = $('#womb li').outerWidth();
		var numLiRaw =  wombWidth / liWidth;
		numLiRaw += 'a'
		var numLiNat = numLiRaw.replace(/(\d*).\d*a/,'$1');
		$('#womb li:nth-child('+ numLiNat +'n+1)').addClass('final');

		//visited image opaqued
		$('a:visited img').css('opacity','0.5');
	});
});