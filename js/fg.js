// Google Analytics
(function(){
    var script_tag = document.createElement('script');
    script_tag.src='https://www.googletagmanager.com/gtag/js?id=G-083TM90LBK';
    document.head.appendChild(script_tag);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-083TM90LBK');
})();

$(window).load(function() {
  // auto focus on food journal entry area
  $('#q').focus(); 
  
  // Replace the placeholder text in the search bar
  replaceSearchPlaceHolderText();
  
  // Send user to google.com to perform site search
  $('#search-form').submit(function() {
    var search_string = $('#q').val();
	var search_query = encodeURI('q=site:foodgeeks.com ' + search_string);
	var redirect_url = "https://www.google.com/search?" + search_query;
    window.location.href = redirect_url;
	return false;
  });
  
  // Send user to google.com to perform site search
  $('#search-form-bottom').submit(function() {
    var search_string = $('#q2').val();
	var search_query = encodeURI('q=site:foodgeeks.com ' + search_string);
	var redirect_url = "https://www.google.com/search?" + search_query;
    window.location.href = redirect_url;
	return false;
  });
  
  // Print current year in copyright
  $("#copyright-to-date").html(new Date().getFullYear());
});

function replaceSearchPlaceHolderText() {
  var placeholder_texts = [
    'Search over 100,000 recipes',
    'Was that your tummy?',
    'What is thine belly’s desire?',
    'Hungles?',
    'Which dish do you wish?',
    'Tickle each of your 10,000 taste buds',
    'Hunt and gather tasty recipes',
    'Embrace your inner Pavlov',
    'Get your noms on'
  ];
  var placeholder_text = placeholder_texts[Math.floor (Math.random() * placeholder_texts.length)];
  $("#q").attr("placeholder", placeholder_text);
  $("#q2").attr("placeholder", placeholder_text);
}

// Show or hide the bottom navigation bars 
function showHideBars() {
  var bars = document.getElementById('bars');
  if (!bars.style.display || bars.style.display == "none") {
	  $("#bars-search").hide("fast");
	  $("#bars").show("fast");
  } else {
	  $("#bars-search").hide("fast");	
	  $("#bars").hide("fast");		
  }
}

// Show or hide the bottom search bars 
function showSearchBar() {
  var bars = document.getElementById('bars-search');
  if (!bars.style.display || bars.style.display == "none") {
	  $("#bars").hide("fast");	
	  $("#bars-search").show("fast");		  
  } else {
	  $("#bars").hide("fast");		
	  $("#bars-search").hide("fast");	
  }
}

// Grab the browser height
function getBrowserHeight() {
  var height = window.innerHeight ||
               document.documentElement.clientHeight ||
               document.body.clientHeight;
  return height;
}

// Grab the browser height / width
function getBrowserWidth() {
  var width = window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
  return width;
}

// Determine whether or not to display the leaderboard advertisement
function removeLeaderboardAd(desktopLeaderboard, tabletLeaderboard) {
  var desktopLeaderboard = parseInt(desktopLeaderboard);
  var tabletLeaderboard = parseInt(tabletLeaderboard);
  var width = getBrowserWidth();
  if (width >= 992 && desktopLeaderboard == 728) {
    return true;
  }
  else if (width >= 768 && width < 992 && tabletLeaderboard == 728) {
    return true;		
  } 
  else {
    $("#ad-top-container").remove();		
	$("#ad-top-leaderboard").remove();	
  }
}

// Determine whether or not to display the mobile leaderboard advertisement (display when browser width < 768px)
function removeMobileLeaderboardAd() {
  var width = getBrowserWidth();
  if (width < 768) {
	return true;
  } else {
    $("#ad-top-container").remove();	
    $("#ad-top-mobile-leaderboard").remove();	
  }
}

// Determine whether or not to display the right advertisement (display when browser width >= 992px)
function removeRightAd() {
  var width = getBrowserWidth();
  if (width >= 992) {
	return true;
  } else {
    $("#ad-right").remove();
    $("#ad-right-2").remove();	
  }
}

// Handles the clicking of the stars in recipe review area
function recipeReviewRating(num) {
  // clean out the stars
  for (i = 1; i <= 5; i++) {
  	var elementId = 'star_' + i;
      $('#' + elementId).addClass('fa-star-o');
      $('#' + elementId).removeClass('fa-star');		
  }
  // add the stars back in
  for (i = 1; i <= num; i++) {
  	var elementId = 'star_' + i;
      $('#' + elementId).addClass('fa-star');
      $('#' + elementId).removeClass('fa-star-o');
  }
  $("#rating").val(num);	 
}

// Determine whether or not a username is available
function usernameAvailable(){
	var username = document.getElementById('username').value;
	$.ajax({
   		type: "POST",
   		url: "auth/register_username_available",
   		data: "username="+username+"&ajax=1",
		dataType: "json",
   		success: function(msg){
			$("#username-group").removeClass("has-error");
			$("#username-group").removeClass("has-success");
			$("#usernameStatus").removeClass("glyphicon-ok");
			$("#usernameStatus").removeClass("glyphicon-remove");
		    if (msg.status == 'error') {
				$("#username-group").addClass('has-error');			
				$("#username-group").addClass('has-feedback');	
				$("#usernameStatus").addClass("glyphicon-remove");
		    }
			if (msg.status == 'success') {
				$("#username-group").addClass('has-success');			
				$("#username-group").addClass('has-feedback');	
				$("#usernameStatus").addClass("glyphicon-ok");				
			}
			$("#usernameAvailable").show('fast');
			$("#usernameAvailable").addClass(msg.status);
			$("#usernameAvailable").html(msg.message);
 		}
 	});
}

// alter images on recipe page
function alterImage() {
  var elementId = 'primary-image';
  if (img = document.getElementById(elementId)) {
    var width = img.naturalWidth;
    var height = img.naturalHeight;
    var browserWidth = getBrowserWidth();
    if (height >= width && browserWidth > 767) {
      $( "#recipe-photo" ).addClass( "recipe-photo-portrait" );
      $( "#recipe-photo" ).removeClass( "recipe-photo-landscape" );  
    
      $( "#table-recipe-title" ).addClass( "recipe-title-time-photo-portrait" );
      $( "#table-recipe-title" ).removeClass( "recipe-title-time-photo-landscape" );  
    }
  }
}

$(window).load(function() {
  alterImage(); // 
  $('#newsletter-form').ajaxChimp({
      url: '//foodgeeks.us9.list-manage.com/subscribe/post?u=76be613b66b5ca8ef987e666a&amp;id=754843176b'
  }); // mailchimp newsletter submit 1
});

// mailchimp newsletter submit 2
(function ($) {
    'use strict';
    $.ajaxChimp = {
        responses: {
            'Please check your email.'                                             : 0,
            'Please enter a value'                                                              : 1,
            'An email address must contain a single @'                                          : 2,
            'The domain portion of the email address is invalid (the portion after the @: )'    : 3,
            'The username portion of the email address is invalid (the portion before the @: )' : 4,
            'This email address looks fake or invalid. Please enter a real email address'       : 5
        },
        translations: {
            'en': null
        },
        init: function (selector, options) {
            $(selector).ajaxChimp(options);
        }

    };

    $.fn.ajaxChimp = function (options) {
        $(this).each(function(i, elem) {
            var form = $(elem);
            var email = form.find('input[type=email]');
            var alert_message = $('#newsletter-alert-message');

            var settings = $.extend({
                'url': form.attr('action'),
                'language': 'en'
            }, options);

            var url = settings.url.replace('/post?', '/post-json?').concat('&c=?');

            form.attr('novalidate', 'true');
            email.attr('name', 'EMAIL');

            form.submit(function () {
                function successCallback(resp) {
                    if (resp.result === 'success') {
                        msg = 'Yesss! Check your email, and click the link in the confirmation email to receive tasty updates in your inbox.';
	                    $('#newsletter-alert').addClass('alert-success');
	                    $('#newsletter-alert').removeClass('alert-danger');
						$('#newsletter-alert').show();
						$('#newsletter-email').hide();
						$('#newsletter-email-submit').hide();
						$('#newsletter-description').hide();
                    } else {
	                    $('#newsletter-email').addClass('alert-danger');
	                    $('#newsletter-alert').addClass('alert-danger');
						$('#newsletter-alert').show();
                        var index = -1;
                        var msg;
                        try {
                            var parts = resp.msg.split(' - ', 2);
                            if (parts[1] === undefined) {
                                msg = resp.msg;
                            } else {
                                var i = parseInt(parts[0], 10);
                                if (i.toString() === parts[0]) {
                                    index = parts[0];
                                    msg = parts[1];
                                } else {
                                    index = -1;
                                    msg = resp.msg;
                                }
                            }
                        }
                        catch (e) {
                            index = -1;
                            msg = resp.msg;
                        }
                    }

                    // Translate and display message
                    if (
                        settings.language !== 'en' 
                        && $.ajaxChimp.responses[msg]
                        && $.ajaxChimp.translations
                        && $.ajaxChimp.translations[settings.language]
                        && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]
                    ) {
                        msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]];
                    }
                    alert_message.html(msg);

                    alert_message.show(2000);
                    if (settings.callback) {
                        settings.callback(resp);
                    }
                }

                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function (index, item) {
                    data[item.name] = item.value;
                });

                $.ajax({
                    url: url,
                    data: data,
                    success: successCallback,
                    dataType: 'jsonp',
                    error: function (resp, text) {
                        console.log('mailchimp ajax submit error: ' + text);
                    }
                });

                // Translate and display submit message
                var submitMsg = 'Submitting...';
                if( 
                    settings.language !== 'en'
                    && $.ajaxChimp.translations
                    && $.ajaxChimp.translations[settings.language]
                    && $.ajaxChimp.translations[settings.language]['submit']
                ) {
                    submitMsg = $.ajaxChimp.translations[settings.language]['submit'];
                }
                alert_message.html(submitMsg).show(2000);

                return false;
            });
        });
        return this;
    };
})(jQuery);
