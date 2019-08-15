var xprizes = [ 0.01,1,5,10,25,50,75,100,200,300,400,500,750,1000,5000,10000,25000,50000,75000,100000,200000,300000,400000,500000,750000,1000000]; // liist of possible prizes.
var aprizes = []; // list of available prizes
var cases = []; // list of cases and their values
var picks = []; // list of user selected prizes
var offers = []; // collect offers in an array.
var finaloffer = [];
var usercase = 0;


	function calculateOffer(){
			var rc = aprizes.length; // get number of prizes left
			var totalp = 0; // create a total variable
			for (f=0; rc > f ; f++){totalp += aprizes[f];} // calculate total value of all remaining prizes
			var offer = totalp/rc; // calculate the average
				offer += totalp%rc; // calculate and add remainder
			  offer = offer.toFixed(2); // round off to the 100th decimal place
					console.log(offer) //$('').html(offer); //display offer
				offers.push(offer); // add offer to list of offers
			return offer;
	}

	function logStats(){
				console.log("prizes (" + aprizes.length + ") = " + aprizes);
				console.log("picks (" + picks.length + ") = " + picks);
				console.log("offers (" + offers.length + ") = " + offers);
	}

	function displayAvailablePrizes() {

		var html = "<b>Available Prizes</b>: ";
		for (n = 0; n < aprizes.length; n++) {
			html += "$" + aprizes[n] + ", ";
		}

		var x = document.getElementsByClassName("available_prizes") ;
		x[0].innerHTML= html; // add offer ammount to offer Pane
		x[1].innerHTML= html; // add offer ammount to offer Pane

	}

	function showOffer() { // display offer
		document.getElementById("bank_offer").innerHTML = "$" + calculateOffer(); // add offer ammount to offer Pane
		displayAvailablePrizes(); // show available prizes
			logStats();
		$('#offerPane').modal({backdrop: 'static' ,keyboard: false}); // display "deal or no deal Button"
	}

	function sFinalOffer() {
			var final_offer = calculateOffer(); // calculate final offer
			finaloffer.push(final_offer); // add offer to offerPane
			finaloffer.push(cases[usercase - 1]); // get value of last case
				aprizes.splice(usercase - 1, 1); // remove user selected case value from available prizes
			finaloffer.push(aprizes[0]); // get value of last case
			displayAvailablePrizes();
			logStats();

			$('#lastOffer').html(final_offer);
			$('#finalOfferPane').modal({backdrop: 'static' ,keyboard: false});// show final offer
		}

function selectCase(xy){ // function on case button click
			var cn = $(xy).attr('casenumber');// get the case #
		if (usercase && cn != usercase && cn != "0") { // if the user has selected a case
			var reward = cases[cn - 1] // get the value in case
				picks.push("case="+cn+";value="+reward+";"); // add this pick to the list of picks
					console.log("case="+cn+";value="+reward+";");//***********
			var userround = picks.length; // save the number of picks to calculate what round the user is in
				console.log("round= " + userround); //***********
			xy.innerHTML = cn + "<br> <span class='small'>$" + reward + "</span>"; // display value in case

			var valueIndex = aprizes.indexOf(reward); // find the selected cases value in the list of available prizes
				console.log(aprizes[valueIndex]); //***********
			aprizes.splice(valueIndex, 1); // remove the selected value from available prizes.


			if (userround == 6 || userround == 11 || userround == 15 || userround == 18) {showOffer();} //check if this round is an offer
			if (userround > 19 && userround < 24){showOffer();} // if user has selected 20 or more cases, show an offer after every pick;
			if(userround == 24) { sFinalOffer(); }; // show final offer in last round.

			xy.setAttribute("casenumber", "0"); // set the case number to false so you can not select same case twice.

		} else if (cn == "0") {
			xy.setAttribute("class", "danger"); // else if the case number = 0, this case has been selected already, display danger
			console.log("error! this case has been selected already");
		} else { // else the user has not yet selected a case
			usercase = $(xy).attr('casenumber'); // get the case #
			$(xy).addClass('selectedcase'); // add class to the selected case
				console.log(usercase); //**********************
			xy.innerHTML = cn + "<br> <span class='small'> Your Case! </span>"; // display value in case

		}
}

function finalPick(x){ // on click of final option display the prize
		document.getElementById("modalbody2").innerHTML = "<h1>You Won...</h1> <h3>$" + finaloffer[x] + "</h3>"; // adds html to final pane on click
}

function deal(){ // when use selects deal
		document.getElementById("modalbody1").innerHTML = "<h1>You Won...</h1> <h3>$" + calculateOffer() + "</h3><p> your case had $" + cases[usercase - 1] + " </p>"; // add offer to the offer pane
		document.getElementById("mdf1").innerHTML = "<button type='button' class='btn btn-primary' onclick='resetGame()'>Play Again!</button>"; // add "play again" button to offer pane
};

function setUpGame(prizes) {
		aprizes = aprizes.concat(prizes); // add submitted prizes to list of prizes
		displayAvailablePrizes();

		var phprizes = prizes; // copy prizes
		for ( i=0; phprizes.length > 0; i++) {
			var plen = phprizes.length; // save prizes length, use for while statment.
			var rc = Math.floor(Math.random() * plen);// get a random # to put a prize # in a case
			var prize_pick = phprizes[rc]; // select a prize ammount from the prizes array
				cases.push(prize_pick); // add the prize amount to a case
				phprizes.splice(rc, 1); // remove the prize ammount from the prizes array so that it wont be selected again.
		}

		var html = "<h1 class='text-center'>Cases</h1>"; // to create html for cases

		for (j=0; j < cases.length; j++) { //itterate through the casess
			html += "<button onclick='selectCase(this)' class='button' casenumber='" + (j+1) + "'>" + (j+1) + "</button>"; // add cases html together
			}

		displayAvailablePrizes(); // show available prizes
		document.getElementById("casesWrapper").innerHTML = html;// display cases

		$('#offerPane').modal('hide'); // show final offer
		$('#finalOfferPane').modal('hide'); // show final offer

	}

	function resetGame() {
		xprizes = [ 0.01,1,5,10,25,50,75,100,200,300,400,500,750,1000,5000,10000,25000,50000,75000,100000,200000,300000,400000,500000,750000,1000000]; // liist of possible prizes.
		aprizes = []; // list of available prizes
		cases = []; // list of cases and their values
		offers = []; // collect offers in an array.
		finaloffer = [];
		picks = [];
		usercase = 0;
		var html = '<p>The offer from the banker is ...</p>';
			html += '<h2 id="bank_offer"></h2>';
			html += '<p id="available_prizes"></p>';
			document.getElementById("modalbody1").innerHTML =  html;
			html = '<p>The final offer from the banker is ...</p>'
			html += '<h2 id="lastOffer"></h2>'
			html += '<p>You can choose either the last available case, the offer from the banker, Or your case.</p>';
			document.getElementById("modalbody2").innerHTML =  html;
			html = '<button type="button" class="btn btn-primary" onclick="deal()">Deal!</button>';
			html += '<button type="button" class="btn btn-secondary" data-dismiss="modal">No Deal!</button>';
			document.getElementById("mdf1").innerHTML =  html;
		setUpGame(xprizes);
	}