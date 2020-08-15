// ==UserScript==
// @name       Medal of Honor Tracker
// @author OMGWTFISTHIS
// @namespace  https://github.com/OMGWTFISTHIS/Medal-of-Honor-Tracker/
// @version    1.0.4
// @description Track the scale progression of gaining the Medal of Honor award on Hack Forums.
// @require     https://code.jquery.com/jquery-3.1.1.js
// @match      *://hackforums.net/gamecp.php?action=profile*
// @copyright  2019+
// @updateURL https://github.com/OMGWTFISTHIS/Medal-of-Honor-Tracker/raw/master/Medal%20of%20Honor%20Tracker.user.js
// @downloadURL https://github.com/OMGWTFISTHIS/Medal-of-Honor-Tracker/raw/master/Medal%20of%20Honor%20Tracker.user.js
// @iconURL https://github.com/OMGWTFISTHIS/Medal-of-Honor-Tracker/raw/master/MOH.png
// ==/UserScript==
// ------------------------------ Changelog -----------------------------
// v 1.0.4: Fixed the progress bar when a user has greater than the maximum XP required for the MOH award
// v 1.0.3: Added decimals to percentage for more precise tracking
// v 1.0.2: Fixed progressbar title
// v 1.0.1: Rewrote v1 & implemented formula for level xp
// v 1.0.0: MOH Tracker
// ------------------------------ Dev Notes -----------------------------
// Adam was here
// ------------------------------ SETTINGS ------------------------------
var goal = 250000;
var debug = false;
// ------------------------------ Code ------------------------------
// Get current level
var currentlevel = $("#game_content_currentpage > tr:nth-child(2) > td > div.gtable > div:nth-child(2) > div.gtd.tcenter").text().replace('Level: ', '');
debugPrint("Current level: " + currentlevel);
debugPrint("Current xp to level: " + determineLevelXP(currentlevel))

// Exracts the current XP for the level and removes everything after the space
var currentlevelXP = $("#game_content_currentpage > tr:nth-child(2) > td > div.game-profile-player.gboxshadow > div:nth-child(2) > div:nth-child(2) > span").text()
	.replace(/\s(.*)/, '').replace(',', '');
debugPrint("Current xp of level: " + currentlevelXP);

// Total XP
var totalXP = parseInt(determineLevelXP(currentlevel)) + parseInt(currentlevelXP);
debugPrint("Total xp: " + totalXP);

// Tooltip percentage
var wholePercent = getWholePercent(totalXP,goal);
if (wholePercent >= 100) {
 wholePercent = 100;
}

// Clone existing progress bar (and children) but change the IDs to be unique
$("#progress-bar").parent().clone().appendTo(".game-profile-player")
	.children().first().attr("id", "myProgressBar")
	.children().first().attr("id", "myProgressBarPercentage");

// Change style properties of the clone (and child)
$("#myProgressBar")
    .attr({
        "title": "Medal of Honor Progress: " + wholePercent + "%"
    })
    .css({
	"border-radius": "6px"
});
$("#myProgressBarPercentage")
	.attr({
		"title": "Medal of Honor Progress: " + wholePercent + "%"
	})
	.css({
	"width": wholePercent + "%",
	"transition": "0.1s",
	"background-color": "#e2ba2f",
	"box-shadow": "inset 0px 0px 3px 1px #ffffff12",
	"border": "1px solid #292929",
	"height": "11px",
	"border-radius": "6px"
});

// Update progress text
$("#myProgressBar").parent().find(".tinytext").text(numberWithCommas(totalXP) + " / " + numberWithCommas(goal) + " xp");
debugPrint((Math.round((totalXP / goal) * 100 * 100) / 100))


// ------------------------------ FUNCTIONS ------------------------------
function determineLevelXP(level) {
	return Math.pow(level, 2) * 100;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function debugPrint(text) {
	if (debug) console.log(text);
}

function getWholePercent(percentFor, percentOf) {
	return Math.round((totalXP / goal) * 100 * 100) / 100;
}
