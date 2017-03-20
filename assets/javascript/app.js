var subjectValues = ["cats", "dogs", "ryan gosling"];


function apiGif(){

topic = $(this).attr('data-value');
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response) {

	$('.input-area').empty();

	var results = response.data;
	console.log(results);

	for (var i = 0; i < results.length; i++) {

		var gifDiv = $("<div class='gifDiv'>");

		var rating = results[i].rating;
		console.log(rating);
		var pRating = $("<p class='ratingGrade'>").html("Rating : " + rating);
		gifDiv.append(pRating);

		var topicImage = $('<img>');
		topicImage.attr('src', results[i].images.fixed_height_still.url);// this addition will give the still img
		topicImage.addClass("toggleState");
		topicImage.attr("data-state", "still");
		topicImage.attr("data-still", results[i].images.fixed_height_still.url);
		topicImage.attr("data-animate", results[i].images.fixed_height.url);
		gifDiv.prepend(topicImage);

		$('.input-area').prepend(gifDiv);
	}
});
};


function renderSubjectButton() {		
	$('.button-container').empty();

	for (var i = 0; i < subjectValues.length; i++) {

		var $buttonSub = $("<button class='btn btn-primary'>");

		$buttonSub.addClass('subject');
		$buttonSub.attr('data-value', subjectValues[i]);
		$buttonSub.text(subjectValues[i]);

		$('.button-container').append($buttonSub);
	}
}

$(document).ready(function() {

	renderSubjectButton();

	$(document).on('click', '.subject', function() {
		var subjectKey = $(this).attr('data-value');

		// alert(test);
	});


	$(document).on("click", ".toggleState", function() {
		var state = $(this).data('state');
		var animatedGif = $(this).data('animate');
		var stillGif = $(this).data('still');

		if (state === 'still') {
			$(this).attr('src', animatedGif);
			$(this).data('state', 'animate');
		}
		else {
			$(this).attr('src', stillGif);
			$(this).data('state', 'still');			
		}
	});


$('#add-value').on('click', function(event) {
	event.preventDefault();

	var topic = $('#value-input').val().trim();

	subjectValues.push(topic);

	renderSubjectButton();

	$('#value-input').val("");

});

});

$(document).on("click", ".subject", apiGif);








