/*
 * jQuery ppGallery 1.0
 *
 * Copyright (c) 2012 Gabriele Vanini
 * Licensed under the GPL license.
 *
 * http://www.gabrielevanini.altervista.org/
 *
 * Depends:
 * jquery-1.8.x.min.js
   Please use https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
   ...or later
*/

(function($){
	$.fn.ppGallery = function(options) {
  		// Create some defaults, extending them with any options that were provided
    	var settings = $.extend({
      		'width'         : 0,
      		'height'		: 800,
      		'background-color' : 'blue',
      		'scrollersWidth'	:	190,
      		'singlescrollerHeight' : 100
    	}, options);

     	var self = this, imgHtml = "", divImg, scrollLeft, scrollRight, _elScrollPos = 0, _elLength = 0, scrollersTopMargin;
     	//img html to paste into self
     	imgHtml = self.html();
     	
     	//create float div elements 
     	scrollLeft = document.createElement('div'); 
     	scrollRight = document.createElement('div');
     	divImg = document.createElement('div');
     	divImg.setAttribute("class", "contentContainer");
     	divImg.setAttribute("id", "id_contentContainer");
     	
		//add styles 
		$(divImg).css({
			"float" : "left",
			"width":settings.width+"px",
			"height":settings.height+"px",
			"-moz-user-select" : "none",
			"-webkit-user-select" : "none",
			"user-select" : "none",
			"border" : "10px solid white",
			"background-color" : "white"
		});
		$(scrollLeft).addClass("scrollLeftPP");
		$(scrollRight).addClass("scrollRightPP");
     	
     	//set self styles 
     	var _mrglft = (-((settings.width+settings.scrollersWidth)/2))+"px";
     	var _mrglftSimple = (-(settings.width/2))+"px";
     	var _width = (settings.width+settings.scrollersWidth)+"px"
     	
     	self.css({
   			'left' : '50%',
   			'margin-left' : _mrglft,
   			'width' : _width,
   			'top' : '50px'
		});
     	
     	//create html
     	self.html(divImg);
     	self.find("div").html(imgHtml);
     	self.prepend(scrollLeft);
     	self.append(scrollRight);     
     	
     	//vertical align scroller
     	scrollersTopMargin = (settings.height/2)-(settings.singlescrollerHeight/2);
     	$(scrollRight).css({
     		//"margin-top" : -(selfHeight/,
     		"margin-top" : scrollersTopMargin+"px"
     	});
     	$(scrollLeft).css({
     		//"margin-top" : -(selfHeight/,
     		"margin-top" : scrollersTopMargin+"px"
     	});
    	self.find("img").each(function(i){
    		if(i != 0) $(this).css("display","none");
    		_elLength+=1;
    	});
 	
    	  	
    	//bind events and control gallery navigation
    	if(_elLength > 1) {
    	
    		$(scrollRight).bind("click",function(){
    			if(_elScrollPos < (_elLength-1)){settings
    				++_elScrollPos;
    				self.find("img").each(function(i){
    					i == _elScrollPos ? $(this).fadeIn() : $(this).css("display","none");
    				});
    				if(_elScrollPos == 1) $(scrollLeft).css("visibility","visible");
    			}
    			if(_elScrollPos == _elLength-1) $(this).css("visibility","hidden");
    		})
    		$(scrollLeft).bind("click",function(){
    			if(_elScrollPos > 0){
    				--_elScrollPos;
    				self.find("img").each(function(i){
    					i == _elScrollPos ? $(this).fadeIn() : $(this).css("display","none");
    				});
    				if(_elScrollPos == (_elLength-2)) $(scrollRight).css("visibility","visible");
    			}
    			if(_elScrollPos == 0) $(this).css("visibility","hidden");
    		})
    		$(scrollRight).bind("mouseover",function(){
    			$(this).removeClass("scrollRightPP").addClass("scrollRightPP_over");
    		})
    		$(scrollRight).bind("mouseout",function(){
    			$(this).removeClass("scrollRightPP_over").addClass("scrollRightPP");
    		})
    		$(scrollLeft).bind("mouseover",function(){
    			$(this).removeClass("scrollLeftPP").addClass("scrollLeftPP_over");
    		})
    		$(scrollLeft).bind("mouseout",function(){
    			$(this).removeClass("scrollLeftPP_over").addClass("scrollLeftPP");
    		})
    	}
    	else
		$(scrollRight).css("visibility","hidden");
		 
    	$(scrollLeft).css("visibility","hidden");
    	
    	
    	//trigger with key arrows left & right
    	$(document).keydown(function(e){
    		switch(e.which) {
    			case 37: $(scrollLeft).trigger("click");
        		break;
        		case 39: $(scrollRight).trigger("click");
        		break;
        		default:return false; 
    		}
    	});
	};
})( jQuery );