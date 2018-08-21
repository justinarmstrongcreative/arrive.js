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
        var window_height = window.innerHeight,
            window_scroll_top = window.scrollY || document.documentElement.scrollTop,
            window_scroll_bottom = window_scroll_top + window_height,

            $this = $(this), // The element
            this_classes = $this.attr('class'),
            this_class_array = this_classes.split(' '),
            this_height = $this.outerHeight(),
            this_offset = $this.offset(),

            offset_top = this_offset.top, // Element offset top
            offset_bot = offset_top + this_height, // Element offset bottom

            percent = 0;

        // if has percentage
        if(this_classes.indexOf('on-screen_percent') > -1) {
            for(var i = 0; i < this_class_array.length; i++) {
                if(this_class_array[i].indexOf('on-screen_percent') > -1) {
                    percent = parseInt(this_class_array[i].split('--').pop().trim()) / 100;
                }
            }
        }

        // Check if the element is on screen
        if (
            window_scroll_bottom > offset_top + (this_height * percent) && 
            window_scroll_top < offset_bot
        ) {
            $this.addClass('on');
        }

        // comment this 'else' out if you don't want it to run on scroll up
        else {
            $this.removeClass('on');
        }
    });
}