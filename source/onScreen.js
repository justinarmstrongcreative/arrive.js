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
        var windowHeight = window.innerHeight,
            windowScrollTop = window.scrollY || document.documentElement.scrollTop,
            windowScrollBottom = windowScrollTop + windowHeight,

            $this = $(this), // the element
            thisClasses = $this.attr('class'), // get element classes
            thisClassArray = thisClasses.split(' '), // put classes in an array
            thisHeight = $this.outerHeight(), // element height
            thisOffset = $this.offset(), // element offset
            offsetTop = thisOffset.top, // element offset top
            offsetBot = offsetTop + thisHeight, // element offset bottom

            percent = 0,
            delay = 0.5;

        // percentage
        if(thisClasses.indexOf('on-screen_percent') > -1) {
            for(var p = 0; p < thisClassArray.length; p++) {
                if(thisClassArray[p].indexOf('on-screen_percent') > -1) {
                    percent = parseInt(thisClassArray[p].split('--').pop().trim()) / 100;
                }
            }
        }

        // duration
        if(thisClasses.indexOf('on-screen_duration') > -1) {
            for(var du = 0; du < thisClassArray.length; du++) {
                if(thisClassArray[du].indexOf('on-screen_duration') > -1) {
                    duration = parseInt(thisClassArray[du].split('--').pop().trim()) / 1000;
                    $this.css('transition-duration', duration+'s');
                }
            }
        }

        // delay
        if(thisClasses.indexOf('on-screen_delay') > -1) {
            for(var de = 0; de < thisClassArray.length; de++) {
                if(thisClassArray[de].indexOf('on-screen_delay') > -1) {
                    delay = parseInt(thisClassArray[de].split('--').pop().trim()) / 1000;
                    $this.css('transition-delay', delay+'s');
                }
            }
        }

        // check if the element is on screen
        if (
            windowScrollBottom > offsetTop + (thisHeight * percent) && 
            windowScrollTop < offsetBot - (thisHeight * percent)
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
}