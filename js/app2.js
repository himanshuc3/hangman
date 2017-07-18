var word = ["Bumfuzzle",
			"canoodle",
			"dongle",
			"banjo",
			"Awkward",
			"zealous",
			"oxygen",
			"Snail",
			"rain",
			"secret",
			"empty"];

var missedit = [ "Ohhh, Snap!! You missed it",
				 "Short on letters!!",
				 "He's dying solo!!!",
				 "Sorry, for the tragedy!!",
				 "Shoooooooooot!!"];
					


$(function(){
        var container = $(".hang");
        container.shuffleLetters();
});



		
var randomindex = Math.floor(Math.random()*word.length);
var randomWord = word[randomindex];
var normalizedWord = randomWord.toUpperCase();
const MAX_MISSES = 7;
var numberOfMisses = 0;
var textDisplayed = "";


function display(){
	var display = "";
	for(var i = 0 ; i<normalizedWord.length ; i++){
		display += "_";
	}

		$(".theword h1").text(display);
		$(".hanger h1").text("Total Trials: " + MAX_MISSES);
		textDisplayed = display;
}

// function reset(){
// 	$("button").prop("disabled", false);
// 	numberOfMisses = 0;
// 	$(".hanger h2").empty();
// }

display();


function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}

function rand(){
	return word[Math.floor(Math.random()*randomWord.length)];
}


function renderedText(letter){
	
	for(var i = 0 ; i<randomWord.length ; i++){

		if(letter === normalizedWord[i]){
			textDisplayed = setCharAt(textDisplayed,i,letter);
		}
	}

	$(".theword h1").text(textDisplayed);
}

function again(){
			$(".theword h1").empty();
			normalizedWord = rand().toUpperCase();
			display();
			$("button").css("color", "#e9ece5");
			$("button").prop("disabled", false);
}

function isWon(){

	var checkword = $(".theword h1").text();
	return !checkword.includes("_");
}



$("button").click(function(){
	var letter = $(this).text();


	if(normalizedWord.includes(letter)){

		$(this).css("color","green");
		renderedText(letter);
		$(".hanger h1").text("Total number of chances remaining:" + (MAX_MISSES - numberOfMisses));
		
		if(isWon()){
			$(".hanger h2").empty();
			$(".hanger h2").text("CONGO !!!! You WON !!! THE WORD WAS " +
				normalizedWord);
			again();
		}

	} else {
		$(this).css("color","red");
		numberOfMisses += 1;
		$(".hanger h1").text("Total number of chances remaining:" + (MAX_MISSES - numberOfMisses));

		if(numberOfMisses == 7){
			$(".hanger h2").empty();
			$(".hanger h2").text("RRRRhhhhh !!!! You LOST !!! THE WORD WAS " +
				normalizedWord);
			again();
		}else{
		$(".hanger h2").empty();
		$(".hanger h2").text(missedit[Math.floor(Math.random()*missedit.length)]);
		}
		
	}
	$(this).prop("disabled",true);


});