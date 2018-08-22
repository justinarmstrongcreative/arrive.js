

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
            mask = false,
            maskColor = 'ffffff',
            percent = 0,
            move = false,
            moveAmount = 25;

        if(thisClasses.indexOf('--out') > -1) {
            reverse = true;
        }

        // delay
        if(thisClasses.indexOf('on-screen_delay') > -1) {
            for(var de = 0; de < thisClassArray.length; de++) {
                if(thisClassArray[de].indexOf('on-screen_delay') > -1) {
                    delay = parseInt(thisClassArray[de].split('--').pop().trim()); // / 1000
                }
            }
        }

        // duration
        if(thisClasses.indexOf('on-screen_duration') > -1) {
            for(var du = 0; du < thisClassArray.length; du++) {
                if(thisClassArray[du].indexOf('on-screen_duration') > -1) {
                    duration = parseInt(thisClassArray[du].split('--').pop().trim());
                }
            }
        }

        // mask
        if(thisClasses.indexOf('on-screen_mask') > -1 && !$this.hasClass('mask-added')) {
            mask = true;

            for(var mc = 0; mc < thisClassArray.length; mc++) {
                if(thisClassArray[mc].indexOf('on-screen_mask--color') > -1) {
                    maskColor = thisClassArray[mc].split('__').pop().trim();
                }
            }

            $this.prepend('<div class="mask" style="background-color: #'+maskColor+'; transition: all '+duration+'ms"></div>').addClass('mask-added');
        }

        // move
        if(thisClasses.indexOf('on-screen_move') > -1) {
            move = true;

            for(var m = 0; m < thisClassArray.length; m++) {
                if(thisClassArray[m].indexOf('on-screen_move') > -1) {
                    moveAmount = parseInt(thisClassArray[m].split('--').pop().trim());
                }

                if(!isNaN(moveAmount)){
                    if(thisClasses.indexOf('move--in__up') > -1 || thisClasses.indexOf('move--out__up') > -1) {
                        $this.css('transform', 'translate(0,'+moveAmount+'%)');
                    }
                    if(thisClasses.indexOf('move--in__down') > -1 || thisClasses.indexOf('move--out__down') > -1) {
                        $this.css('transform', 'translate(0,-'+moveAmount+'%)');
                    }
                    if(thisClasses.indexOf('move--in__left') > -1 || thisClasses.indexOf('move--out__left') > -1) {
                        $this.css('transform', 'translate('+moveAmount+'%,0)');
                    }
                    if(thisClasses.indexOf('move--in__right') > -1 || thisClasses.indexOf('move--out__right') > -1) {
                        $this.css('transform', 'translate(-'+moveAmount+'%,0)');
                    }
                }
            }
        }

        // percentage
        if(thisClasses.indexOf('on-screen_percent') > -1) {
            for(var p = 0; p < thisClassArray.length; p++) {
                if(thisClassArray[p].indexOf('on-screen_percent') > -1) {
                    percent = parseInt(thisClassArray[p].split('--').pop().trim()) / 100;
                }
            }
        }

        // add transition
        if(move === false) {
            $this.css('transition', 'all '+duration+'ms');
        }

        // reverse
        if(reverse === true) {
            // for on load display
            if(!$this.hasClass('reverse')){
                $this.addClass('on');
            }
            $this.addClass('reverse');
        }

        setTimeout(function(){

            // move needs transition added after delay
            if(move === true) {
                $this.css('transition', 'all '+duration+'ms');
            }

            // check if the element is on screen
            if (
                windowScrollBottom > offsetTop + (thisHeight * percent) && 
                windowScrollTop < offsetBot - (thisHeight * percent)
            ) {
                if(reverse === true) {
                    $this.removeClass('on');
                } else {
                    $this.addClass('on');
                }
            }

            // if element has class'unanimate' it will unanimate
            else {
                if($this.hasClass('unanimate')) {
                    if(reverse === true) {
                        $this.addClass('on');
                    } else {
                        $this.removeClass('on');
                    }
                }
            }

        },delay);
        
    });
};