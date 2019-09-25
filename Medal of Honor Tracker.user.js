// ==UserScript==
// @name       Medal of Honor Tracker
// @author OMGWTFISTHIS
// @namespace  https://github.com/OMGWTFISTHIS/Medal-of-Honor-Tracker/
// @version    1.0.0
// @description Track the scale progression of gaining the Medal of Honor award on Hack Forums.
// @require     https://code.jquery.com/jquery-3.1.1.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js
// @match      *://hackforums.net/gamecp.php?action=profile*
// @copyright  2016+
// @updateURL https://github.com/OMGWTFISTHIS/Medal-of-Honor-Tracker/raw/master/Medal%20of%20Honor%20Tracker.user.js
// @downloadURL https://github.com/OMGWTFISTHIS/Medal-of-Honor-Tracker/raw/master/Medal%20of%20Honor%20Tracker.user.js
// @iconURL https://github.com/OMGWTFISTHIS/Medal-of-Honor-Tracker/raw/master/MOH.png
// ==/UserScript==
// ------------------------------ Changelog -----------------------------
// v 1.0.0: MOH Tracker
// ------------------------------ Dev Notes -----------------------------
// Use at your own risk :)
// ------------------------------ SETTINGS ------------------------------
// Getting rid of the stupid '$ is not defined' error
var $ = window.jQuery;

// Append progress bar for level 50
var currentlevel = ($("#game_content_currentpage > tr:nth-child(2) > td > div.gtable > div:nth-child(2) > div.gtd.tcenter").text().replace('Level: ', ''));
switch (currentlevel) {
	case '1':
		currentlevel = '100';
		break;
	case '2':
		currentlevel = '400';
		break;
	case '3':
		currentlevel = '900';
		break;
	case '4':
		currentlevel = '1600';
		break;
	case '5':
		currentlevel = '2500';
		break;
	case '6':
		currentlevel = '3600';
		break;
	case '7':
		currentlevel = '4900';
		break;
	case '8':
		currentlevel = '6400';
		break;
	case '9':
		currentlevel = '8100';
		break;
	case '10':
		currentlevel = '10000';
		break;
	case '11':
		currentlevel = '12100';
		break;
	case '12':
		currentlevel = '14400';
		break;
	case '13':
		currentlevel = '16900';
		break;
	case '14':
		currentlevel = '19600';
		break;
	case '15':
		currentlevel = '22500';
		break;
	case '16':
		currentlevel = '25600';
		break;
	case '17':
		currentlevel = '28900';
		break;
	case '18':
		currentlevel = '32400';
		break;
	case '19':
		currentlevel = '36100';
		break;
	case '20':
		currentlevel = '40000';
		break;
	case '21':
		currentlevel = '44100';
		break;
	case '22':
		currentlevel = '48400';
		break;
	case '23':
		currentlevel = '52900';
		break;
	case '24':
		currentlevel = '57600';
		break;
	case '25':
		currentlevel = '62500';
		break;
	case '26':
		currentlevel = '67600';
		break;
	case '27':
		currentlevel = '72900';
		break;
	case '28':
		currentlevel = '78400';
		break;
	case '29':
		currentlevel = '84100';
		break;
	case '30':
		currentlevel = '90000';
		break;
	case '31':
		currentlevel = '96100';
		break;
	case '32':
		currentlevel = '108900';
		break;
	case '33':
		currentlevel = '108900';
		break;
	case '34':
		currentlevel = '115600';
		break;
	case '35':
		currentlevel = '122500';
		break;
	case '36':
		currentlevel = '129600';
		break;
	case '37':
		currentlevel = '140000';
		break;
	case '38':
		currentlevel = '144400';
		break;
	case '39':
		currentlevel = '152100';
		break;
	case '40':
		currentlevel = '160000';
		break;
	case '41':
		currentlevel = '168100';
		break;
	case '42':
		currentlevel = '176400';
		break;
	case '43':
		currentlevel = '184000';
		break;
	case '44':
		currentlevel = '193600';
		break;
	case '45':
		currentlevel = '202500';
		break;
	case '46':
		currentlevel = '211600';
		break;
	case '47':
		currentlevel = '220900';
		break;
	case '48':
		currentlevel = '230400';
		break;
	case '49':
		currentlevel = '240100';
		break;
	case '50':
		currentlevel = '250000';
		break;
		break
}

var MOH = "250,000"
// Exracts the current XP for the level and removes everything after the space
var currentlevelXP = ($("#game_content_currentpage > tr:nth-child(2) > td > div.game-profile-player.gboxshadow > div:nth-child(2) > div:nth-child(2) > span").text().replace(/\s(.*)/, ''));
var currentlevelXPnumbers = currentlevelXP.replace(',', '');

var totalxp = (+currentlevel + +currentlevelXP) / 250000 * 100.00 + "%";
$("#game_content_currentpage > tr:nth-child(2) > td > div.game-profile-player.gboxshadow > div:nth-child(2) > div:nth-child(2)")
	.append($("<div>").addClass("all-rounded game-progress-bar-1")
		.attr({
			"title": "Total Progress: " + totalxp,
			"id": "total-progress-bar"
		})
		.css({
			"width": "100%",
			"box-shadow": "inset 0px 0px 3px 1px #9090901c",
			"background": "#101010"
		})
	)
$("#total-progress-bar")
	.append($("<div>").addClass("all-rounded")
		.attr({
			"title": "Medal of Honor Progress: " + totalxp,
			"id": "total-progress-bar-percentage"
		})
		.css({
			"width": totalxp,
			"transition": "all 0.1s ease 0s",
			"background-color": "#e2ba2f",
			"box-shadow": "rgba(255, 255, 255, 0.07) 0px 0px 3px 1px inset",
			"border": "1px solid rgb(41, 41, 41)",
			"padding": "5px 0px",
			"text-align": "center",
			"height": "1px"
		})
	)

$("#game_content_currentpage > tr:nth-child(2) > td > div.game-profile-player.gboxshadow > div:nth-child(2) > div:nth-child(2)")
	.append($("<div>")
		.css({
			"margin-left": "5px"
		})
	)

$("#game_content_currentpage > tr:nth-child(2) > td > div.game-profile-player.gboxshadow > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)")
	.append($("<span>").addClass("tinytext")
		.attr({
			"id": "MOH Text"
		})

	)

document.getElementById('MOH Text').innerHTML = (+currentlevel + +currentlevelXP) + "/ 250,000"
