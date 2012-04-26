$(document).ready(function() {






var $doer = $('#doer')
  , $womb = $('#womb')


$doer.submit(function(e) {
  e.preventDefault();
  var url = $('#url').val()
    , start = parseInt($('#start').val())
    , end = parseInt($('#end').val())
    , format = $('#format').val()
    , padding = parseInt($('#padding').val())
    , eTotal = end - start
    , isOk = true;

  if (eTotal < 0){
    alert('Ending number must be higher than starting number, mate!');
  }
  else if (eTotal > 100){
    isOk =  confirm('Your browser may get really slow if you render so many images. Continue anyway?');
  }

  if (isOk){
    generate(url, start, end, format, padding);
  }

});


var padZeros = function(theNumber, padding){
  var numStr = String(theNumber);
  while ( numStr.length < padding){
    numStr = '0' + numStr;
  }
  return numStr;
}


var generate = function(url, start, end, format, padding){
  $womb.empty();
  var htmlToAppend = '';
  for (var i = start; i <= end; i++){
    var num = padZeros(i, padding)
      , uri = url + num + format

    htmlToAppend += "<li><a href='"+ uri +"'><img src='"+ uri +"' alt='"+ num +"' title='"+ num +"'></a></li>";
  }
  $womb.append(htmlToAppend);

  $('a:visited img').css({'opacity':'0.5'});
}


$womb.on({

  mouseenter : function(){
    var $this = $(this)

    $this.addClass('imgHover');

    var $wrap = $('#wrap')
      , wrapWidth = $wrap.width()
      , wrapHeight = $wrap.height()
      , imgWidth = $this.width()
      , imgHeight = $this.height()
      , imgOffsetLeft = $this.offset().left
      , imgOffsetTop = $this.offset().top
      , imgDilate = imgOffsetTop + imgHeight
      , wrapMinHeight = parseInt($wrap.css('min-height'))

    if (imgWidth > wrapWidth){
      $this.offset({left:10});
      $this.css({'width':(wrapWidth-20)+'px'});

    }
    else if ((imgOffsetLeft+imgWidth)>wrapWidth){
      var goLeft = wrapWidth - imgWidth - 10;
      $this.offset({left:goLeft})
    }

    if (imgDilate > wrapMinHeight){
      $wrap.css({'min-height':imgDilate + 10});
    }
  },

  mouseleave : function(){
    $(this).removeClass('imgHover').removeAttr('style').removeAttr('left');
  }

}, 'img')






});
