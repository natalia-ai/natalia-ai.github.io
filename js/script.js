$(document).ready(function() {

    //Home Slider init
    $('#home-slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    });

    $('.home-slider__arrow--right').click(function() {
        $('#home-slider').slick("slickNext");
    });
    $('.home-slider__arrow--left').click(function() {
        $('#home-slider').slick("slickPrev");
    });


    //Menu
    $('.page-header__nav-toggle').on('click', function() {
        $('.page-header__nav').fadeToggle();
    });

    $(window).resize(function(){
        var wid = $(window).width();
        if(wid > 768) {
            $('.page-header__nav').show();
        }
    });

});