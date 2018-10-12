//import * as ceca from './toDoFunctions.js';

const toDosDataInfo = [{
	key: 20181010,
	toDo: [{
			value: 'buy tobacco',
			important: false,
		},
		{
			value: 'make shisha',
			important: true,
		},
		{
			value: 'chill',
			important: false,
		},

	],
}];

const keyTofind = 20181010;
const ceca = toDosDataInfo.filter((x) => x.key === keyTofind);
console.log(ceca.ceca);

// if (toDosDataInfo[0].toDo.length != 0) {
if (ceca[0].toDo.length != 0) {
	for (let i = 0; i < toDosDataInfo[0].toDo.length; i++) {
		const isImportant = toDosDataInfo[0].toDo[i].important;
		if (isImportant) {
			$('#toDos').append('<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
				toDosDataInfo[0].toDo[i].value + '<span class=\'star important\'><i class=\'fa fa-star\'></i></span></li>');
		} else {
			$('#toDos').append('<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
				toDosDataInfo[0].toDo[i].value + '<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>');
		}
	}
}
// ////////////////////////////// li to input
const curWords = [];

$('body').click(() => console.log())

$('ul').on('click', 'li', function () {
	const textToFix = $(this).text();
	curWords.push(textToFix);
	const input = `<input class='addToDo' type='text' value='${textToFix}'>`;
	$(this).replaceWith(input);
	console.log(curWords[0]);
});

// ///////////////////////////////////////////////////


// /////////////////////////////////////////// redaktirane

const simpleFunctionToFindIndex = (textToFind) => {
	let tova = 0;
	ceca[0].toDo.filter((element, i) => {
		if (element.value == textToFind) {
			tova = i;
		}
	});
	return tova;
};


$('ul').on('keypress', 'input', function (event) {
	if (event.which === 13) {
		const todoText = $(this).val();


		ceca[0].toDo[simpleFunctionToFindIndex(curWords[0])].value = todoText;
		curWords.pop;
		$(this).val('');

		$(this).replaceWith('<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
			todoText + '<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>');
	}
});
// ///////////////////////////////////////////

// ////////////////////////////////////////////// triene
$('ul').on('click', 'span.trash', function (event) {
	const index = simpleFunctionToFindIndex($(this).parent().text());
	ceca[0].toDo.splice(index, 1);

	$(this).parent().fadeOut(500, function () {
		$(this).remove();
	});
	event.stopPropagation();
	console.log(ceca[0].toDo.length);
});

console.log(ceca[0].toDo.length);
// /////////////////////////////////////////////////

// //////////////////////////////////////////// addToDo
$('input[type=\'text\']').keypress(function (event) {
	if (event.which === 13) {
		const todoText = $(this).val();
		$(this).val('');

		$('ul').append('<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
			todoText + '<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>');
		ceca[0].toDo.push({
			value: todoText,
			important: false,
		});
	}


	// pushtodate(text)
});
// ///////////////////////////

// //////////////////////////// + toggle input
$('#toggle-form').click(function () {
	$('input[type=\'text\']').fadeToggle();
});
// ///////////////////////////////////

// ///////////////////////////////// star importnt toggle
$('ul').on('click', 'span.star', function (event) {
	const index = simpleFunctionToFindIndex($(this).parent().text());
	console.log(index);
	ceca[0].toDo[index].important = !ceca[0].toDo[index].important;
	$(this).toggleClass('important');

	event.stopPropagation();
});

$('#back-to-calendar').click(ceca.hideToDoList())
