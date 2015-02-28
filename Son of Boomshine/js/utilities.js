	"use strict";
	//returns the mouse position in local coordinate system of element
	function getMouse(e)
	{
		var mouse = {};
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		return mouse;
	}
	
	function pointInsideCircle(x, y, I)
	{
		var dx = x - I.x;
		var dy = y - I.y;
		return dx * dx + dy * dy <= I.radius * I.radius;
	}
	
	//are these two circles overlapping?
	function circlesIntersect(c1, c2)
	{
		var dx = c2.x - c1.x;
		var dy = c2.y - c1.y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		return distance < c1.radius + c2.radius;
	}
	
	function getRandom(min, max)
	{
		return Math.random() * (max - min) + min;
	}
	
	// returns a random color of alpha 1.0
	// http://paulirish.com/2009/random-hex-color-code-snippets/
	function getRandomColor(){
		var red = Math.round(Math.random()*200+55);
		var green = Math.round(Math.random()*200+55);
		var blue=Math.round(Math.random()*200+55);
		var color='rgb('+red+','+green+','+blue+')';
		// OR	if you want to change alpha
		// var color='rgba('+red+','+green+','+blue+',0.50)'; // 0.50
		return color;
	}
	
	//helper function
	function getRandomUnitVector()
	{
		var x = getRandom(-1,1);
		var y = getRandom(-1,1);
		var length = Math.sqrt(x*x + y*y);
		if (length == 0)
		{
			x = 1; //point right
			y = 0;
			length = 1;
		}
		else
		{
			x /= length;
			y /= length;
		}
		
		return {x:x, y:y};
	}
	
	// Sound Functions
	function soundIsPlaying(sound) {
    	return !sound.ended && sound.currentTime > 0 && !sound.paused;
   	}
	
	// plays a sound element on the page - will not allow sound to be started over
   	function playSingleSound(soundElement, volume, pauseSound){
   		soundElement.volume = volume;
   		if (!soundIsPlaying(soundElement) && !pauseSound) {
            soundElement.play();
         }
         if(pauseSound){
         	soundElement.pause();
         }
   	}
   	
   	
   	// plays a sound element on the page - will start the sound again even if it is playing
   	// you can't call this one very often or you get clicking
   	// overdoing sound is the fastest way to crash the browser
   	// keep your game sound effects minimal and subtle
   	function playSound(soundElement){
   		soundElement.volume = 0;
   		soundElement.currentTime = 0;
   		soundElement.pause();
   		soundElement.volume = 0.5;
   		soundElement.play();
   	}