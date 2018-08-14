

// file: source/onScreen.js

$(document).ready(function() {
    onScreen('.on-screen');
});

$(window).resize(function() {
    onScreen('.on-screen');
});

window.addEventListener('scroll', function() {
    onScreen('.on-screen');
});

function onScreen(thing) {
    $(thing).each(function() {
        var win_scroll = window.scrollY || document.documentElement.scrollTop,
            window_height = window.innerHeight,
            element = $(this), // The element
            element_height = element.outerHeight(),
            element_offset = element.offset(),
            position_top = element_offset.top, // Element offset top
            position_bot = position_top - window_height; // Element offset bottom

        // Check if the element is on screen
        if (
            win_scroll > position_bot &&
            win_scroll < position_top + element_height
        ) {
            $(this).addClass('on');
        }
        else { // comment this else out if you don't want it to run on scroll up
            $(this).removeClass('on');
        }
    });
};