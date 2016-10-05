function onScreen(){
	var win_height = window.innerHeight; // Window height
	var win_scroll = window.scrollY; // Window scroll
	var elements = document.getElementsByClassName('thing'); // Gather elements into an array

	for(i=0; i<elements.length; i++) {
		var position_top = elements[i].offsetTop; // Element offset top
		var position_bot = position_top - win_height; // Element offset bottom

		// Check if the element is on screen
		if(win_scroll > position_bot && win_scroll < position_top) {
			elements[i].classList.add('on-screen');
			// Or do other stuff
		} else {
			elements[i].classList.remove('on-screen');
			// Or don't do other stuff
		}
	}
}