$(".menu").click( function() {
    menuSlide();
});

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $( ".site-wrap").on( "swiperight", menuSlide );
    $(".darken").on( "swipeleft", menuSlide );
}

$(document).keydown(function(e) {
    switch(e.which) {
        case 37:  case 39: // left & right
            menuSlide();
            break;
        default: return;
    }
});

function menuSlide (event) {
    if($(".site-wrap").hasClass("slide-right")) {
        $(".site-wrap").toggleClass("slide-right");
        $(".site-wrap,.darken").animate({
            left: "-=250"
            }, 300, function() {
        });
        $('.darken').fadeOut({queue: false});
        menuTransform();
    }
    else {
        $(".site-wrap").toggleClass("slide-right");
        $(".site-wrap,.darken").animate({
            left: "+=250" }, 300, function() {
        });
        $('.darken').fadeIn({queue: false});
        menuTransform();
    }
}

function menuTransform () {
        $(".menu .top").toggleClass( "is-rotated-cw" );
        $(".menu .middle").toggleClass( "is-transparent" );
        $(".menu .bottom").toggleClass( "is-rotated-ccw" );
}