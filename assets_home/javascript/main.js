// script loaded in all pages

// enable CSS selectors dependent on scripting
$('html').addClass('js');

// main control block, on DOM-ready..
$(function () {
	// correct the viewport meta entry when gestures available - safari re-orientation bug. See: http://adactio.com/journal/4470/
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		var viewportmeta = document.querySelector('meta[name="viewport"]');
		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
			document.body.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
			}, false);
		}
	} 
	
	// viewport size dependent function calls: ranges should match those in the CSS media queries..
	enquire.register('screen and (max-width: 767px)', {
		match : function() {
			
		}
	}).register('screen and (min-width: 768px)', {
		match : function() {
			
		}
	}).register('screen and (min-width: 899px)', {
		match : function() {
           
		}
	}).register('screen and (min-width: 900px)', {
		match : function() {
			
		}
	}).register('screen and (min-width: 1024px)', {
		match : function() {
			
		},
		unmatch : function() {
			
		}
	}).listen(50); // milliseconds


	// non viewport size dependent function calls..

	// add the Informa top ribbon behaviour
	if ($('#iribbon-container').length){
		showHideInformaTopRibbon();
	}

	// add the cookie-consent panel
	showHideInformaCookieNotice();

});


// METHODS

// Informa top ribbon show/hide behaviour
var showHideInformaTopRibbon = function(){
	
	// cache the DOM elements
	var $this = $('#iribbon-container');
	var $that = $('#iribbon-detail');
	
	// hide the ribbon and set the tabindex so that hidden links can't receive focus until visible
	$that.addClass('ribbon-hide').find('a').attr('tabindex', -1);

	// add the control button
	$this.prepend('<button id="iribbon-title" title="show/hide">Informa</button>');
	var $ribbonButton = $this.find('#iribbon-title');
	
	$ribbonButton.on('click', function(){
		if ($that.hasClass('ribbon-hide')){
		    // open it
		    $that.removeClass('ribbon-hide').addClass('ribbon-show').find('a').attr('tabindex', 0);
		    
		    // if user tabs out of the last of the ribbon links then hide the ribbon
		    $that.find('a').last().keydown(function(e){ 
			    // if 'Shift + Tab' pressed = tabbing backwards
			    if (e.shiftKey && e.keyCode == 9) { 
				    return;
			    } else if (e.keyCode == 9) { // if 'Tab' only pressed = tabbing forwards
				    $that.removeClass('ribbon-show').addClass('ribbon-hide').find('a').attr('tabindex', -1);
		            $(this).removeClass('active');
			    }
		    });
		    
		    // if user shift-tabs back out of the ribbon controls then hide the ribbon
		    $ribbonButton.keydown(function(e){
		        // if 'Shift + Tab' pressed = tabbing backwards
			    if (e.shiftKey && e.keyCode == 9) { 
			        $that.removeClass('ribbon-show').addClass('ribbon-hide').find('a').attr('tabindex', -1);
		            $(this).removeClass('active');
			    }
		    });
		    
		    // toggle button image position
		    $(this).addClass('active');
		} else {
		    // shut it
		    $that.removeClass('ribbon-show').addClass('ribbon-hide').find('a').attr('tabindex', -1);
		    
		    // toggle button image position
		    $(this).removeClass('active');
		}
	});
}

// Informa cookie policy notice, dependency: /javascript/js.cookie.js
var showHideInformaCookieNotice = function() {
	
	if ($.cookie('acceptCookies') === undefined) {
		//ToDo: HTML fragment is script-written into the DOM as the cookie functionality is as yet script-driven only.. 
		$('body').append('<div id="notice-cookie"><p>We use cookies to help provide you with the best possible online experience. Please read our <a href="http://www.informa.com/Generic-content/Privacy-Policy/">Privacy Policy</a> and <a href="http://www.informa.com/Generic-content/Terms--conditions/">Terms & Conditions</a> for information about which cookies we use and what information we collect on our site. By continuing to use this site, you agree that we may store and access cookies on your device. <button id="btn-cookies-accept" class="btn-def inline" title="Accept cookies">OK</button></p></div>')

		var $container = $('#notice-cookie');
		var $buttonAccept = $('#btn-cookies-accept');

		$buttonAccept.on('click', function(){
			$.cookie('acceptCookies', '', { expires: 365 });
			// add a value
			$.cookie('acceptCookies',1);
			//$.removeCookie('cookiePolicyViewed');
			$container.remove();
		});
	}
}
