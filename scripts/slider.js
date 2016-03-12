/* Slider Toggle */
$(".menu").click( function() {
    if($(".site-wrap").hasClass("slide-right")) {
        $(".site-wrap").toggleClass("slide-right");
        $(".site-wrap,.darken").animate({
            left: "-=250"
            }, 300, function() {
        });
        $('.darken').fadeOut({queue: false});
        $(".menu .top").toggleClass( "is-rotated-cw" );
        $(".menu .middle").toggleClass( "is-transparent" );
        $(".menu .bottom").toggleClass( "is-rotated-ccw" );
    }
    else {
        $(".site-wrap").toggleClass("slide-right");
        $(".site-wrap,.darken").animate({
            left: "+=250" }, 300, function() {
        });
        $('.darken').fadeIn({queue: false});
        $(".menu .top").toggleClass( "is-rotated-cw" );
        $(".menu .middle").toggleClass( "is-transparent" );
        $(".menu .bottom").toggleClass( "is-rotated-ccw" );
    }
});
