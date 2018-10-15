/* global $ */
import { toDoElement, DatabaseProcesses } from './dbProcesses.js';
import { constants } from './constants.js';

const getTaskHTMLCode = (textToAdd, importancyFlag) => {
	const important = importancyFlag ? 'important' : '';
	return '<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>'
		+ textToAdd
		+ `<span class=\'star ${important}\'>
			<i class=\'fa fa-star\'></i></span></li>`;
};

const findClickedElementIndex = (textToFind) => {
	let ClickedElementIndex = 0;
	toDoElement.toDo.filter((element, i) => {
		if (element.value === textToFind.trim()) {
			ClickedElementIndex = i;
		}
	});
	return ClickedElementIndex;
};

const todoDataVisualization = (todoObj) => {
	if (todoObj.toDo.length !== 0) {
		for (let i = 0; i < todoObj.toDo.length; i++) {
			const isImportant = todoObj.toDo[i].important;
			$('#toDos').append(getTaskHTMLCode(todoObj.toDo[i].value, isImportant));
		}
	}
};

const editToDoHandler = (event) => {
	const newToDoTaskText = $(event.target).text();
	const input = `<input maxlength="35" class='addToDo' id='editInput'
				type='text' value='${newToDoTaskText}' 
				oldvalue='${newToDoTaskText.trim()}'>`;
	$(event.target).replaceWith(input);
	$('#editInput').focus();
	$('#editInput').blur(() => {
		const index = findClickedElementIndex(newToDoTaskText);
		$('#editInput').replaceWith(
			getTaskHTMLCode(newToDoTaskText, toDoElement.toDo[index].important));
	});

};

const endOfEditHandler = (event) => {
	if (event.which === constants.ENTER_BUTTON_EVENT_CODE) {
		const toDoNewText = $(event.target).val();
		const taskOldValue = $(event.target).attr('oldvalue');
		const index = findClickedElementIndex(taskOldValue);

		DatabaseProcesses.editToDo(index, toDoNewText);
		$(event.target).val('');

		$(event.target).replaceWith(getTaskHTMLCode(toDoNewText,
						toDoElement.toDo[index].important));
	}
};
const deleteToDoTaskHandler = (event) => {
	const toDoToDelete = $(event.target).closest('li');
	const toDoToDeleteContent = toDoToDelete.text();
	const index = findClickedElementIndex(toDoToDeleteContent);

	DatabaseProcesses.deleteToDo(index);
	toDoToDelete
		.fadeOut(500, function() {
			$(this).remove();
		});
	event.stopPropagation();
};
const addNewToDoHandler = (event) => {
	if (event.which === constants.ENTER_BUTTON_EVENT_CODE) {
		const todoText = $(event.target).val();
		$(event.target).val('');
		$('ul').append(getTaskHTMLCode(todoText, false));
		DatabaseProcesses.pushToDate(todoText);
	}
};
const toggleInputHandler = () => {
	$('input.addToDo')
		.fadeToggle(300, function() {
				$(this).toggleClass('.hide');
		});
};

const toggleImportancyHandler = (event) => {
	const importancyStarText = $(event.target).closest('li').text();
	const index = findClickedElementIndex(importancyStarText);

	DatabaseProcesses.editImportance(index);
	$(event.target).closest('span').toggleClass('important');

	event.stopPropagation();
};
const toggleCalendar = () => {
	$('ul').empty();
	$(constants.TODO_CONTAINER).trigger('todoclosed');
};
const setToDoEvents = () => {
	$('ul').on('click', 'li', editToDoHandler);
	$('ul').on('keypress', 'input', endOfEditHandler);
	$('ul').on('click', 'span.trash', deleteToDoTaskHandler);
	$('input.addToDo').keypress(addNewToDoHandler);
	$('#toggle-form').on('click', toggleInputHandler);
	$('ul').on('click', '.svg-inline--fa.fa-star', toggleImportancyHandler);
	$('#back-to-calendar').on('click', toggleCalendar);
};

export {
	todoDataVisualization,
	setToDoEvents,
};
