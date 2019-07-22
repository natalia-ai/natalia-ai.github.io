use strict';
(function ($) {
	/*scroll from top*/
	$(document).ready(function () {
		$('.main-nav__link').click(function (evt) {
			evt.preventDefault();
			var linkHref = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(linkHref).offset().top
			}, 1000);

		})
	});

	/*scroll from bottom*/
	$(function () {
      var headerHeight = $('.ei-slider').outerHeight();
			var functionsHeight = headerHeight + $('.health-diary').outerHeight();
			var opportunitiesHeight = functionsHeight + $('.opportunities').outerHeight();
      var specialistsHeight = opportunitiesHeight + $('.to-specialists').outerHeight() + 500;
			$('#about-service-up').click(function () {
				$('html, body').animate({ scrollTop: headerHeight }, 1000);
				return false;
			})
			$('#functions-up').click(function () {
				$('html, body').animate({ scrollTop: functionsHeight }, 1000);
				return false;
			})
			$('#opportunities-up').click(function () {
				$('html, body').animate({ scrollTop: opportunitiesHeight }, 1000);
				return false;
			})
			$('#to-specialists-up').click(function () {
				$('html, body').animate({ scrollTop: specialistsHeight }, 1000);
				return false;
			})

  })
  
})(jQuery)
