/* global $ */
import { toDoElement, DatabaseProcesses } from './dbProcesses.js';
import { constants } from './constants.js';

const findClickedElementIndex = (textToFind) => {
	let ClickedElementIndex = 0;
	console.log(toDoElement.toDo, textToFind);
	toDoElement.toDo.filter((element, i) => {
		if (element.value === textToFind) {
			ClickedElementIndex = i;
		}
	});
	return ClickedElementIndex;
};
const todoDataVisualization = (todoObj) => {
	console.log(todoObj);
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

const editToDoHandler = () => {
	newToDoTaskText = $(this).text();
	const input = `<input class='addToDo' 
	type='text' value='${newToDoTaskText}'>`;
	$(this).replaceWith(input);
};
const endOfEditHandler = function(event) {
	if (event.which === constants.ENTER_BUTTON_EVENT_CODE) {
		const toDoNewText = $(this).val();
		// DatabaseProcesses.currentToDo
		// 	.toDo[findClickedElementIndex(curWords[0])]
		// 	.value = toDoNewText;
		DatabaseProcesses
		.editToDo(findClickedElementIndex(newToDoTaskText), toDoNewText);
		// curWords.pop();
		$(this).val('');

		$(this).replaceWith(
			'<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
			toDoNewText +
			'<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>'
		);
	}
};
const deleteToDoTaskHandler = (event) => {
	console.log($(event.target).parent().parent().parent().text() );
	const index = findClickedElementIndex($(this).parent().text());
	DatabaseProcesses.deleteToDo(index);
	$(this)
	.parent()
	.fadeOut(500, function() {
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
		console.log(toDoElement);
	}
};
const toggleInputHandler = () => {
	$('input.addToDo').fadeToggle();
};
const toggleImportancyHandler = (event) => {
	const importancyStarSpan = $(event.target).parent();
	console.log(importancyStarSpan);
	const index = findClickedElementIndex(importancyStarSpan.parent().text());
	DatabaseProcesses.editImportance(index);
	$('svg').toggleClass('important');
	event.stopPropagation();
};
const toggleCalendar = () => {
	$('#container').trigger('todoclosed');
};
const setToDoEvents = function() {
	$('ul').on('click', 'li', editToDoHandler);
	$('ul').on('keypress', 'input', endOfEditHandler);
	$('ul').on('click', 'span.trash', deleteToDoTaskHandler);
	$('input.addToDo').keypress(addNewToDoHandler);
	$('#toggle-form').on('click', toggleInputHandler);
	$('ul').on('click', '.star svg', toggleImportancyHandler);
	$('#back-to-calendar').on('click', toggleCalendar);
};
export { todoDataVisualization };
export { setToDoEvents };
