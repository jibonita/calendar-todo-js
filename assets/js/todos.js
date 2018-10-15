/* global $ */
import {
	toDoElement,
	DatabaseProcesses
} from './dbProcesses.js';
import {
	constants
} from './constants.js';

const trueOrFalseImportant = (condition, element, textToAppend) => {
	if (condition) {
		element.replaceWith(
			'<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
			textToAppend +
			'<span class=\'star important\'><i class=\'fa fa-star\'></i></span></li>'
		);
	} else {
		element.replaceWith(
			'<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
			textToAppend +
			'<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>'
		);
	}

}

const findClickedElementIndex = (textToFind) => {
	let ClickedElementIndex = 0;
	toDoElement.toDo.filter((element, i) => {
		if (element.value === textToFind) {
			ClickedElementIndex = i;
		}
	});
	return ClickedElementIndex;
};
const todoDataVisualization = (todoObj) => {

	if (todoObj.toDo.length !== 0) {
		for (let i = 0; i < todoObj.toDo.length; i++) {
			const isImportant = todoObj.toDo[i].important;
			if (isImportant) {
				$('#toDos').append(
					'<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
					todoObj.toDo[i].value +
					'<span class=\'star important\'><i class=\'fa fa-star\'></i></span></li>'
				);
			} else {
				$('#toDos').append(
					'<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
					todoObj.toDo[i].value +
					'<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>'
				);
			}
		}
	}
};
let newToDoTaskText;

const editToDoHandler = (event) => {

	newToDoTaskText = $(event.target).text();
	const input = `<input maxlength="20" class='addToDo' id='editInput'
	type='text' value='${newToDoTaskText}'>`;
	$(event.target).replaceWith(input);
	$('#editInput').focus();
	$('#editInput').blur(() => {
		let index = findClickedElementIndex(newToDoTaskText)

		trueOrFalseImportant(toDoElement.toDo[index].important == true, $('#editInput'), newToDoTaskText)
	});

};



const endOfEditHandler = function (event) {


	//===================================================================================================
	if (event.which === constants.ENTER_BUTTON_EVENT_CODE) {
		const toDoNewText = $(this).val();
		let index = findClickedElementIndex(newToDoTaskText)
		DatabaseProcesses
			.editToDo(index, toDoNewText);
		$(this).val('');
		console.log(toDoElement.toDo);
		console.log(index);

		trueOrFalseImportant(toDoElement.toDo[index].important == true, $(this), toDoNewText)

	}
};
const deleteToDoTaskHandler = (event) => {

	let toDoToDelete = $(event.target).closest('li');

	const toDoToDeleteContent = toDoToDelete.text();
	console.log(toDoToDeleteContent)

	const index = findClickedElementIndex(toDoToDeleteContent);
	DatabaseProcesses.deleteToDo(index);
	toDoToDelete
		.fadeOut(500, function () {
			$(this).remove();
		});
	event.stopPropagation();
};
const addNewToDoHandler = (event) => {
	if (event.which === constants.ENTER_BUTTON_EVENT_CODE) {
		const todoText = $(event.target).val();
		$(event.target).val('');
		$('ul').append(
			'<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
			todoText +
			'<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>'
		);
		DatabaseProcesses.pushToDate(todoText);
	}
};
const toggleInputHandler = () => {
	$('input.addToDo').fadeToggle(300, () => $(this).toggleClass('.hide'));
};

const toggleImportancyHandler = (event) => {
	const importancyStarText = $(event.target).closest('li').text();
	const index = findClickedElementIndex(importancyStarText);
	DatabaseProcesses.editImportance(index);
	$(event.target).closest('span').toggleClass('important');
	console.log(toDoElement.toDo);

	event.stopPropagation();
};
const toggleCalendar = () => {
	$('ul').empty();
	$(constants.TODO_CONTAINER).trigger('todoclosed');
};
const setToDoEvents = function () {
	$('ul').on('click', 'li', editToDoHandler);
	$('ul').on('keypress', 'input', endOfEditHandler);
	$('ul').on('click', 'span.trash', deleteToDoTaskHandler);
	$('input.addToDo').keypress(addNewToDoHandler);
	$('#toggle-form').on('click', toggleInputHandler);
	$('ul').on('click', '.svg-inline--fa.fa-star', toggleImportancyHandler);
	$('#back-to-calendar').on('click', toggleCalendar);
};
export {
	todoDataVisualization
};
export {
	setToDoEvents
};
