/*
 * scrollMagic init for dashboard landing
 */

var animScene1Exists = document.getElementsByClassName("animationScene1");

if (animScene1Exists.length) {

	//store the counter intervals that will be animated
	var counterArray = [];

	document.addEventListener("DOMContentLoaded", function(event) {

		var controller = new ScrollMagic.Controller();

		//create scene for first table
		var scene1Element = document.querySelector('.animationScene1');

		var scene1 = new ScrollMagic.Scene({
			duration:1000,
			triggerElement: scene1Element,
			reverse:false,
			loglevel:3,
			offset: 200,
			triggerHook: 1
		}).addTo(controller);

		//create scene for second table
		var scene2Element = document.querySelector('.animationScene2');

		var scene2 = new ScrollMagic.Scene({
			duration:1000,
			triggerElement: scene2Element,
			reverse:false,
			loglevel:3,
			offset: 200,
			triggerHook: 1
		}).addTo(controller);

		//create scene for third table
		var scene3Element = document.querySelector('.animationScene3');

		var scene3 = new ScrollMagic.Scene({
			duration:1000,
			triggerElement: scene3Element,
			reverse:false,
			loglevel:3,
			offset: 200,
			triggerHook: 1
		}).addTo(controller);

		//create scene for fourth table
		var scene4Element = document.querySelector('.animationScene4');

		var scene4 = new ScrollMagic.Scene({
			duration:1000,
			triggerElement: scene4Element,
			reverse:false,
			loglevel:3,
			offset: 300,
			triggerHook: 1
		}).addTo(controller);

		//create scene for fifth table
		var scene5Element = document.querySelector('.animationScene5');

		var scene5 = new ScrollMagic.Scene({
			duration:1000,
			triggerElement: scene5Element,
			reverse:false,
			loglevel:3,
			offset: 300,
			triggerHook: 1
		}).addTo(controller);

		//create scene for sixth table
		var scene6Element = document.querySelector('.animationScene6');

		var scene6 = new ScrollMagic.Scene({
			duration:1000,
			triggerElement: scene6Element,
			reverse:false,
			loglevel:3,
			offset: 300,
			triggerHook: 1
		}).addTo(controller);

		//create scene for seventh table
		var scene7Element = document.querySelector('.animationScene7');

		var scene7 = new ScrollMagic.Scene({
			duration:1000,
			triggerElement: scene7Element,
			reverse:false,
			loglevel:3,
			offset: 300,
			triggerHook: 1
		}).addTo(controller);

		//create scene for seventh table
		var scene8Element = document.querySelector('.animationScene8');

		var scene8 = new ScrollMagic.Scene({
			duration:1000,
			triggerElement: scene8Element,
			reverse:false,
			loglevel:3,
			offset: 300,
			triggerHook: 1
		}).addTo(controller);

		scene1.on('enter', function() {

			var elementsArray = Array.prototype.slice.call(this.triggerElement().querySelectorAll('[data-animationOrder]'));

			//sort the elements to be animated by their animation order
			var animationQueue = buildAnimationQueue(elementsArray);

			var animationDelay = 600;

			for (var i=0; i<=(animationQueue.length-1); i++) {

				timing = animationDelay * (i);

				var whichElement = animationQueue[i];

				//start the counter
				if (whichElement.dataset.animationorder === "2") {
					//for elements that count up, call the count function, passing the
					//interval to count by, the element, and the start and end count
					var elementToBeIncremented = whichElement.querySelector('.numberToBeCounted');
					var counterID = new Date().getTime();
					var intervalID = setInterval(count.bind(counterID,.1,elementToBeIncremented,whichElement.dataset.counterstart, whichElement.dataset.counterend),15);
					counterArray.push({intervalID: intervalID, counterID: counterID});
				}

				setTimeout(fadeIn, timing, whichElement);

			}
		});

		scene2.on('enter', function() {

			var elementsArray = Array.prototype.slice.call(this.triggerElement().querySelectorAll('[data-animationOrder]'));

			//sort the elements to be animated by their animation order
			var animationQueue = buildAnimationQueue(elementsArray);

			var animationDelay = 600;

			for (var i=0; i<=(animationQueue.length-1); i++) {

				timing = animationDelay * (i);

				var whichElement = animationQueue[i];

				//start the counter
				if (whichElement.dataset.animationorder === "2") {
					//for elements that count up, call the count function, passing the
					//interval to count by, the element, and the start and end count
					var elementToBeIncremented = whichElement.querySelector('.numberToBeCounted');
					var counterID = new Date().getTime();
					var intervalID = setInterval(count.bind(counterID,1,elementToBeIncremented,whichElement.dataset.counterstart, whichElement.dataset.counterend),15);
					counterArray.push({intervalID: intervalID, counterID: counterID});
				}

				setTimeout(fadeIn, timing, whichElement);

			}
		});

		scene3.on('enter', function() {

			var elementsArray = Array.prototype.slice.call(this.triggerElement().querySelectorAll('[data-animationOrder]'));

			//sort the elements to be animated by their animation order
			var animationQueue = buildAnimationQueue(elementsArray);

			var animationDelay = 600;

			for (var i=0; i<=(animationQueue.length-1); i++) {

				timing = animationDelay * (i);

				var whichElement = animationQueue[i];

				//start the counter
				if (whichElement.dataset.animationorder === "2") {
					//for elements that count up, call the count function, passing the
					//interval to count by, the element, and the start and end count
					var elementToBeIncremented = whichElement.querySelector('.numberToBeCounted');
					var counterID = new Date().getTime();
					var intervalID = setInterval(count.bind(counterID,1,elementToBeIncremented,whichElement.dataset.counterstart, whichElement.dataset.counterend),15);
					counterArray.push({intervalID: intervalID, counterID: counterID});
				}

				setTimeout(fadeIn, timing, whichElement);

			}
		});

		scene4.on('enter', function() {

			var elementsArray = Array.prototype.slice.call(this.triggerElement().querySelectorAll('[data-animationOrder]'));

			//sort the elements to be animated by their animation order
			var animationQueue = buildAnimationQueue(elementsArray);

			var animationDelay = 600;

			for (var i=0; i<=(animationQueue.length-1); i++) {

				timing = animationDelay * (i);

				var whichElement = animationQueue[i];

				//start the counter
				if (whichElement.dataset.animationorder === "2") {
					//for elements that count up, call the count function, passing the
					//interval to count by, the element, and the start and end count
					var elementToBeIncremented = whichElement.querySelector('.numberToBeCounted');
					var counterID = new Date().getTime();
					var intervalID = setInterval(count.bind(counterID,1,elementToBeIncremented,whichElement.dataset.counterstart, whichElement.dataset.counterend),15);
					counterArray.push({intervalID: intervalID, counterID: counterID});
				}

				setTimeout(fadeIn, timing, whichElement);

			}
		});

		scene5.on('enter', function() {

			var elementsArray = Array.prototype.slice.call(this.triggerElement().querySelectorAll('[data-animationOrder]'));

			//sort the elements to be animated by their animation order
			var animationQueue = buildAnimationQueue(elementsArray);

			var animationDelay = 600;

			for (var i=0; i<=(animationQueue.length-1); i++) {

				timing = animationDelay * (i);

				var whichElement = animationQueue[i];

				//start the counter
				if (whichElement.dataset.animationorder === "2") {
					//for elements that count up, call the count function, passing the
					//interval to count by, the element, and the start and end count
					var elementToBeIncremented = whichElement.querySelector('.numberToBeCounted');
					var counterID = new Date().getTime();
					var intervalID = setInterval(count.bind(counterID,1,elementToBeIncremented,whichElement.dataset.counterstart, whichElement.dataset.counterend),15);
					counterArray.push({intervalID: intervalID, counterID: counterID});
				}

				setTimeout(fadeIn, timing, whichElement);

			}
		});

		scene6.on('enter', function() {

			var elementsArray = Array.prototype.slice.call(this.triggerElement().querySelectorAll('[data-animationOrder]'));

			//sort the elements to be animated by their animation order
			var animationQueue = buildAnimationQueue(elementsArray);

			var animationDelay = 600;

			for (var i=0; i<=(animationQueue.length-1); i++) {

				timing = animationDelay * (i);

				var whichElement = animationQueue[i];

				//start the counter
				if (whichElement.dataset.animationorder === "2") {
					//for elements that count up, call the count function, passing the
					//interval to count by, the element, and the start and end count
					var elementToBeIncremented = whichElement.querySelector('.numberToBeCounted');
					var counterID = new Date().getTime();
					var intervalID = setInterval(count.bind(counterID,1,elementToBeIncremented,whichElement.dataset.counterstart, whichElement.dataset.counterend),15);
					counterArray.push({intervalID: intervalID, counterID: counterID});
				}

				setTimeout(fadeIn, timing, whichElement);

			}
		});

		scene7.on('enter', function() {

			var elementsArray = Array.prototype.slice.call(this.triggerElement().querySelectorAll('[data-animationOrder]'));

			//sort the elements to be animated by their animation order
			var animationQueue = buildAnimationQueue(elementsArray);

			var animationDelay = 600;

			for (var i=0; i<=(animationQueue.length-1); i++) {

				timing = animationDelay * (i);

				var whichElement = animationQueue[i];

				//start the counter
				if (whichElement.dataset.animationorder === "2") {
					//for elements that count up, call the count function, passing the
					//interval to count by, the element, and the start and end count
					var elementToBeIncremented = whichElement.querySelector('.numberToBeCounted');
					var counterID = new Date().getTime();
					var intervalID = setInterval(count.bind(counterID,1,elementToBeIncremented,whichElement.dataset.counterstart, whichElement.dataset.counterend),15);
					counterArray.push({intervalID: intervalID, counterID: counterID});
				}

				setTimeout(fadeIn, timing, whichElement);

			}
		});

		scene8.on('enter', function() {

			var elementsArray = Array.prototype.slice.call(this.triggerElement().querySelectorAll('[data-animationOrder]'));

			//sort the elements to be animated by their animation order
			var animationQueue = buildAnimationQueue(elementsArray);

			var animationDelay = 600;

			for (var i=0; i<=(animationQueue.length-1); i++) {

				timing = animationDelay * (i);

				var whichElement = animationQueue[i];

				//start the counter
				if (whichElement.dataset.animationorder === "2") {
					//for elements that count up, call the count function, passing the
					//interval to count by, the element, and the start and end count
					var elementToBeIncremented = whichElement.querySelector('.numberToBeCounted');
					var counterID = new Date().getTime();
					var intervalID = setInterval(count.bind(counterID,1,elementToBeIncremented,whichElement.dataset.counterstart, whichElement.dataset.counterend),15);
					counterArray.push({intervalID: intervalID, counterID: counterID});
				}

				setTimeout(fadeIn, timing, whichElement);

			}
		});

	});

	//this is needed because when we get the elements in a scene to be animated, using
	//querySelectorAll with their data attributes, they don't come back in any certain order
	function buildAnimationQueue(elementArray) {

		var sortedArray = elementArray.sort(function(a,b) {

			var orderA = Number(a.dataset.animationOrder);
			var orderB = Number(b.dataset.animationOrder);

			if (a > b) {
				return 1;
			}

			if (a < b) {
				return -1;
			}
		});

		return sortedArray;

	}

	function fadeIn(whichElement) {
		whichElement.classList.add('fadeIn');
	}

	function count(whichInterval, whichElement,start, end) {

		var currentNumber = Number(whichElement.innerHTML);

		//console.log(currentNumber);

		if (isNaN(currentNumber)) {
			currentNumber = start;
		}

		currentNumber += whichInterval;

		if (currentNumber <= end) {
			whichElement.innerHTML = formatCommas(currentNumber.toString());
		} else {
			whichElement.innerHTML = formatCommas(end.toString());
			//find the counterID in the counter array and clear the corresponding interval ID
			var thisCounter = counterArray.filter(function(element) {
				if (element.counterID == this) {
					return true;
				} else {
					return false;
				}
			}, this);

			clearInterval(thisCounter[0].intervalID);

		}
	}

	//this function will take the text strings that are numbers and format them with commas
	//and 2 decimal places
	function formatCommas(number) {

		number += '';
		x = number.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] + '0' : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2.substring(0,3);
	}

}
