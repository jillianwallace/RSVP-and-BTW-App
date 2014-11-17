var dinnerApp = {};

dinnerApp.apiId = 'a8accea6';
dinnerApp.apiKey = '9391f0c5352774c3af2d51cb31d6ecaa';
dinnerApp.recipeContainer = $('#recipeResults');


dinnerApp.init = function(){


	$('#search').on('click', function(){
		var allergy = [];
		var diet = '';
		var course = '';

		diet = $('input.diet:checked').val();

		course = $('input.course:checked').val();

		$('.sectionAllergy').find('input:checked').each(function(){
			if($(this).hasClass('allergy')){
				allergy.push($(this).val());
			}
		});

		$('span.buttonText').addClass('.buttonTextChange').text("Yummy!");

		// TAKE OUT THE CONSOLE LOGS WHEN YOU FINISH!
		console.log("Allergy: "+allergy); 
		console.log("Diet: "+diet); 
		console.log("Course: " +course);

		dinnerApp.getRecipes(course, diet, allergy);
	});

};



dinnerApp.getRecipes = function(course, diet, allergy){
	$.ajax({
		// searches for recipes
		url: 'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'jsonp',
			_app_id: dinnerApp.apiId,
			_app_key: dinnerApp.apiKey,
			requirePictures: true,
			maxResult: 9,
			'allowedCourse[]': course,
			'allowedDiet[]': diet,
			'allowedAllergy[]': allergy
		},
		success: function(result){
			console.log(result.matches);
			dinnerApp.recipeContainer.empty();
			dinnerApp.displayRecipes(result.matches);
		}
	});
};

// dinnerApp.getYield = function(recipeID){
// 	// searches for serving size
// 	$.ajax({
// 		url: 'http://api.yummly.com/v1/api/recipe/'+recipeID,
// 		type: 'GET',
// 		dataType: 'json',
// 		data: {
// 			format: 'jsonp',
// 			_app_id: dinnerApp.apiId,
// 			_app_key: dinnerApp.apiKey,
// 			// numberOfServings: 4,
// 		},
// 		success: function(resulttwo){
// 			console.log(resulttwo.yield);
// 			// console.log("Servings: "+ yield);
// 		}
// 	});
// };

dinnerApp.displayRecipes = function(data){
	// displays recipes on the page
	$.each(data, function(i, food){
		var title = $('<p>').text(food.recipeName);
		var recipeID = food.id;
		var img = $('<img>').attr('src', food.smallImageUrls[0].replace('=s90',''));
		var url = $('<a>').attr({'href':'http://www.yummly.com/recipe/'+recipeID, 'target': '_blank'});
		var wrapUrl = url.append(img, title);

		var recipeDiv = $('<div>').addClass('recipeColumn').append(wrapUrl);

		dinnerApp.recipeContainer.append(recipeDiv);
	});
};



$(function(){
	// jquery doc ready shorthand
	dinnerApp.init();
});