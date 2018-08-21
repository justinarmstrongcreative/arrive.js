

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

function onScreen(element) {
    $(element).each(function() {
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

            percent = 0,
            delay = 0.5;

        // percentage
        if(this_classes.indexOf('on-screen_percent') > -1) {
            for(var p = 0; p < this_class_array.length; p++) {
                if(this_class_array[p].indexOf('on-screen_percent') > -1) {
                    percent = parseInt(this_class_array[p].split('--').pop().trim()) / 100;
                }
            }
        }

        // duration
        if(this_classes.indexOf('on-screen_duration') > -1) {
            for(var du = 0; du < this_class_array.length; du++) {
                if(this_class_array[du].indexOf('on-screen_duration') > -1) {
                    duration = parseInt(this_class_array[du].split('--').pop().trim()) / 1000;
                    $this.css('transition-duration', duration+'s');
                }
            }
        }

        // delay
        if(this_classes.indexOf('on-screen_delay') > -1) {
            for(var de = 0; de < this_class_array.length; de++) {
                if(this_class_array[de].indexOf('on-screen_delay') > -1) {
                    delay = parseInt(this_class_array[de].split('--').pop().trim()) / 1000;
                    $this.css('transition-delay', delay+'s');
                }
            }
        }

        // Check if the element is on screen
        if (
            window_scroll_bottom > offset_top + (this_height * percent) && 
            window_scroll_top < offset_bot - (this_height * percent)
        ) {
            $this.addClass('on');
        }

        // if element has class'off-screen' it will unanimate
        else {
            if($this.hasClass('off-screen')) {
                $this.removeClass('on');
            }
        }
    });
};