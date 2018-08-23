

// file: source/onScreen.js

$(document).ready(function() {
    arrive('.arrive');
});

$(window).resize(function() {
    arrive('.arrive');
});

window.addEventListener('scroll', function() {
    arrive('.arrive');
});

function arrive(element) {

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
            $mask = $('.mask', this),

            // defaults
            reverse = false,
            delay = 500,
            duration = 500,
            timing = 'ease',
            mask = false,
            maskColor = 'ffffff',
            percent = 0,
            move = false,
            moveAmount = 25;

        if(thisClasses.indexOf('_out') > -1) {
            reverse = true;
        }

        // delay
        if(thisClasses.indexOf('arrive-delay') > -1) {
            for(var de = 0; de < thisClassArray.length; de++) {
                if(thisClassArray[de].indexOf('arrive-delay') > -1) {
                    delay = parseInt(thisClassArray[de].split('_').pop().trim()); // / 1000
                }
            }
        }

        // duration
        if(thisClasses.indexOf('arrive-duration') > -1) {
            for(var du = 0; du < thisClassArray.length; du++) {
                if(thisClassArray[du].indexOf('arrive-duration') > -1) {
                    duration = parseInt(thisClassArray[du].split('_').pop().trim());
                }
            }
        }

        // timing
        if(thisClasses.indexOf('arrive-timing') > -1) {
            for(var ti = 0; ti < thisClassArray.length; ti++) {
                if(thisClassArray[ti].indexOf('arrive-timing') > -1) {
                    timing = thisClassArray[ti].split('_').pop().trim();
                    console.log(timing);
                }
            }
        }

        // mask
        if(thisClasses.indexOf('arrive-mask') > -1 && !$this.hasClass('mask-added')) {
            mask = true;

            for(var mc = 0; mc < thisClassArray.length; mc++) {
                if(thisClassArray[mc].indexOf('arrive-mask_color') > -1) {
                    maskColor = thisClassArray[mc].split('--').pop().trim();
                }
            }
            // prepend div rather than using psuedo element
            $this.prepend('<div class="mask" style="background-color: #'+maskColor+'; transition: all '+duration+'ms '+timing+'"></div>').addClass('mask-added');
        }

        // move
        if(thisClasses.indexOf('arrive-move') > -1) {
            move = true;

            for(var m = 0; m < thisClassArray.length; m++) {
                if(thisClassArray[m].indexOf('arrive-move') > -1) {
                    moveAmount = parseInt(thisClassArray[m].split('_').pop().trim());
                }

                if(!isNaN(moveAmount)){
                    if(thisClasses.indexOf('move_in--up') > -1 || thisClasses.indexOf('move_out--up') > -1) {
                        $this.css('transform', 'translate(0,'+moveAmount+'%)');
                    }
                    if(thisClasses.indexOf('move_in--down') > -1 || thisClasses.indexOf('move_out--down') > -1) {
                        $this.css('transform', 'translate(0,-'+moveAmount+'%)');
                    }
                    if(thisClasses.indexOf('move_in--left') > -1 || thisClasses.indexOf('move_out--left') > -1) {
                        $this.css('transform', 'translate('+moveAmount+'%,0)');
                    }
                    if(thisClasses.indexOf('move_in--right') > -1 || thisClasses.indexOf('move_out--right') > -1) {
                        $this.css('transform', 'translate(-'+moveAmount+'%,0)');
                    }
                }
            }
        }

        // percentage
        if(thisClasses.indexOf('arrive-percent') > -1) {
            for(var p = 0; p < thisClassArray.length; p++) {
                if(thisClassArray[p].indexOf('arrive-percent') > -1) {
                    percent = parseInt(thisClassArray[p].split('_').pop().trim()) / 100;
                }
            }
        }

        // reverse
        if(reverse === true) {
            // for on load display
            if(!$this.hasClass('arrive-reverse')){
                $this.addClass('active');
            }
            $this.addClass('arrive-reverse');
        }

        setTimeout(function(){

            // add transition
            $this.css('transition', 'all '+duration+'ms '+timing+'');

            // check if the element is on screen
            if (
                windowScrollBottom > offsetTop + (thisHeight * percent) && 
                windowScrollTop < offsetBot - (thisHeight * percent)
            ) {
                if(reverse === true) {
                    $this.removeClass('active');
                } else {
                    $this.addClass('active');
                }
            }

            // if element has class'arrive-unanimate' it will unanimate
            else {
                if($this.hasClass('arrive-unanimate')) {
                    if(reverse === true) {
                        $this.addClass('active');
                    } else {
                        $this.removeClass('active');
                    }
                }
            }

        },delay);
        
    });

};