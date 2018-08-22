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
            percent = 0,
            move = 25;

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
            $this.prepend('<div class="mask"></div>').addClass('mask-added');
        }

        // move
        if(thisClasses.indexOf('on-screen_move') > -1) {
            for(var m = 0; m < thisClassArray.length; m++) {
                if(thisClassArray[m].indexOf('on-screen_move') > -1) {
                    move = parseInt(thisClassArray[m].split('--').pop().trim());
                }

                if(!isNaN(move)){
                    if(thisClasses.indexOf('move--in__up') > -1 || thisClasses.indexOf('move--out__up') > -1) {
                        $this.css('transform', 'translate(0,'+move+'%)');
                    }
                    if(thisClasses.indexOf('move--in__down') > -1 || thisClasses.indexOf('move--out__down') > -1) {
                        $this.css('transform', 'translate(0,-'+move+'%)');
                    }
                    if(thisClasses.indexOf('move--in__left') > -1 || thisClasses.indexOf('move--out__left') > -1) {
                        $this.css('transform', 'translate('+move+'%,0)');
                    }
                    if(thisClasses.indexOf('move--in__right') > -1 || thisClasses.indexOf('move--out__right') > -1) {
                        $this.css('transform', 'translate(-'+move+'%,0)');
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



        
        
        if(reverse === true) {
            // for on load display
            if(!$this.hasClass('reverse')){
                $this.addClass('on');
            }
            $this.addClass('reverse');
        }

        // check if the element is on screen
        setTimeout(function(){

            // add css transitions
            $this.css('transition', 'all '+duration+'ms');
            $mask.css('transition', 'all '+duration+'ms');

            if(reverse === true) {
                if (
                    windowScrollBottom > offsetTop + (thisHeight * percent) && 
                    windowScrollTop < offsetBot - (thisHeight * percent)
                ) {
                    $this.removeClass('on');
                }

                // if element has class'unanimate' it will unanimate
                else {
                    if($this.hasClass('unanimate')) {
                        $this.addClass('on');
                    }
                }
            } else {
                if (
                    windowScrollBottom > offsetTop + (thisHeight * percent) && 
                    windowScrollTop < offsetBot - (thisHeight * percent)
                ) {
                    $this.addClass('on');
                }

                // if element has class'unanimate' it will unanimate
                else {
                    if($this.hasClass('unanimate')) {
                        $this.removeClass('on');
                    }
                }
            }
        },delay);
        
    });
}