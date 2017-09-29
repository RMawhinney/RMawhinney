'use strict';
// returns the element for Haunty.
function findHaunty() {
return document.querySelector('[data-image-role="haunty"]');
}
// returns the element for the Stalker.
function findStalker() {
return document.querySelector('[data-image-role="stalker"]');
}
// returns a slice of string with the Monster's elements.
function getMonsterMash() {
    return [].slice.call(document.querySelectorAll('[data-image-role="monster"]'))
}
// Using a monster element, returns the value within data-image-class.
function getMonsterName(monster) {
	return monster.getAttribute('data-image-class');
}
// Returns a map of the names of the monsters.
// My friend hooked me up with the info about maps. Using maps I was able to pass multiple
// values from an array through the same function and create an array of the results.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
var monsterList = getMonsterMash().map(getMonsterName);

// Returns a random name from the monsterList. 
//Source: https://zenscript.wordpress.com/2013/11/23/how-to-pick-a-random-entry-out-of-an-array-javascript/
function randomMonster() {
	return monsterList[Math.floor(Math.random() *4)];
}
// Declares a timeout variable to be used.
var timeOut;

// Overwrites the Stalker class with the name passed in.
// removeAttributeNode found via developer.mozilla.org
function setStalker(stalkerID) {
	var newStalker = getMonsterName(stalkerID);
	console.log("He's being stalked by ", newStalker);
	findStalker().removeAttribute("class");
	findStalker().classList.add(newStalker);
}

// While a bit blunt, this function selects Haunty and applies the Shivering ID to him, allowing him to be scared.
function shivering() {
	findHaunty().setAttribute('id', 'spooked');
}

// Adds a listener to all monsters that sets Haunty up to Shiver, and sets the new Stalker when clicked after a slight delay, then resets the jumpScare countdown.
function listenMonsterClick() {
	getMonsterMash().forEach(function(monster) {
		monster.addEventListener('click', function (event) {
			event.preventDefault();
			shivering();
			setTimeout(function() {
				setStalker(monster);
			}, 251);
			window.clearTimeout(timeOut);
			jumpScare();
			console.log("Jumpscare reset")
		}
	)});
}

// Adds a listener on Haunty waiting for clicks, which is a mobile functionality form of the same CSS hover features, holding him in place and exchanging his state.
// Either way, it resets the jumpScare countdown whenever he is clicked or un-hovered.
function hauntyListener() {
	findHaunty().addEventListener('click', function (event) {
		event.preventDefault();
		var monsterPresence = monsterList.map (function(name) {
			return findStalker().classList.contains(name);}
		);
		var isThereAMonster = false;
		monsterPresence.forEach(function(presence) {
			if (presence == true) {
				isThereAMonster = true}
		});
		if (isThereAMonster) {	
			console.log("there is a monster")
			if (document.getElementById("checkspooked")) {
				console.log("He is not scared")
				haunty.setAttribute("id", "spooked");
			} 
			else
			{
			console.log("He is scared")
			findHaunty().setAttribute('id', 'checkspooked');
			}
		} 
		else 
		{
		findHaunty().classList.toggle('check');
		}
		window.clearTimeout(timeOut);
		jumpScare();
		console.log("Jumpscare reset")
	});
	findHaunty().addEventListener('mouseout', function (event) {
		window.clearTimeout(timeOut);
		jumpScare();
		console.log("Jumpscare reset");
	});
}

// Creates a countdown before triggering Haunty and the Stalker with a random value
//Source: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
function jumpScare() {
	timeOut = setTimeout(function() {
		findHaunty().removeAttribute('id');
		setTimeout(function() {
			findStalker().removeAttribute('class');
			findStalker().classList.add(randomMonster());
			findHaunty().setAttribute('id', 'checkspooked');
			}, 251)}, 10000);

}
// initiates the scripts
function doTheThing() {
	hauntyListener();
	listenMonsterClick();
	jumpScare();
}


doTheThing();
