/* global $ */
import {
	toDoElement,
	DatabaseProcesses,
} from './dbProcesses.js';
import {
	constants,
} from './constants.js';

const getTaskHTMLCode = (text, importancyFlag) => {
	const important = !importancyFlag? 'important' : '';
	return '<li><fake /><span class="trashcontainer">'
		+ '<ion-icon name="trash" role="img" class="trash"></ion-icon></span>'
		+ text
		+ '<span class="starcontainer">'
		+ `<ion-icon name="star" role="img" class="${important}star" ></ion-icon>`
		+ '</span></li>';
};

const findClickedElementIndex = (textToFind) => {
	let ClickedElementIndex = 0;
	// console.log(toDoElement.toDo, textToFind);
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

			$('#toDos').append(getTaskHTMLCode(todoObj.toDo[i].value, isImportant));
			// if (isImportant) {
			// 	$('#toDos').append(
			// 		'<li><span><ion-icon name="trash" role="img" class="trash"></ion-icon></span>' +
			// 		todoObj.toDo[i].value +
			// 		'<span><ion-icon name="star" role="img" class="star"></ion-icon></span></li>'
			// 	);
			// } else {
			// 	$('#toDos').append(
			// 		'<li><fake /><span class="trashcontainer"><ion-icon name="trash" role="img" class="trash"></ion-icon></span>' +
			// 		todoObj.toDo[i].value +
			// 		'<span class="starcontainer"><ion-icon name="star" role="img" class="star" ></ion-icon></span></li>'
			// 	);
			// }
		}
	}
};
let newToDoTaskText;

const editToDoHandler = (event) => {
	newToDoTaskText = $(event.target).text();
	const input = `<input class='addToDo' id='editInput'
	type='text' value='${newToDoTaskText}'>`;
	$(event.target).replaceWith(input);
	$('#editInput').focus();
};

const endOfEditHandler = (event) => {
	if (event.which === constants.ENTER_BUTTON_EVENT_CODE) {
		const toDoNewText = $(this).val();
		DatabaseProcesses
			.editToDo(findClickedElementIndex(newToDoTaskText), toDoNewText);
		$(this).val('');

		// TODO: refactor with function getTaskHTMLCode(text, importancyFlag)
		$(this).replaceWith(
			`<li><span></span><span class="trashcontainer">
			<ion-icon name="trash" class="trash"></ion-icon></span>` +
			toDoNewText +
			`<span class="starcontainer">
			<ion-icon name="star" role="img" class="star" ></ion-icon></span></li>`
		);
	}
};

const addNewToDoHandler = (event) => {
	if (event.which === constants.ENTER_BUTTON_EVENT_CODE) {
		const todoText = $(event.target).val();
		$(event.target).val('');

		// TODO: refactor using function getTaskHTMLCode(text, importancyFlag)
		$('ul').append(
			'<li><span></span><span class="trashcontainer"><ion-icon name="trash" class="trash"></ion-icon></span>' +
			todoText +
			'<span class="starcontainer"><ion-icon name="star" role="img" class="star" ></ion-icon></span></li>'
		);
		DatabaseProcesses.pushToDate(todoText);
	}
};

const toggleInputHandler = () => {
	$('input.addToDo').fadeToggle(300, () => $(this).toggleClass('.hide'));
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

const toggleImportancyHandler = (event) => {
	// const importancyStarText = $(event.target).parent().parent().parent().text();
	const importancyStarText = $(event.target).closest('li').text();
	const index = findClickedElementIndex(importancyStarText);
	DatabaseProcesses.editImportance(index);
	// $(event.target).toggleClass('important');
	$(event.target).toggleClass('star importantstar');
	event.stopPropagation();
};

const toggleCalendar = () => {
	$('ul').empty();
	$(constants.TODO_CONTAINER).trigger('todoclosed');
};

const setToDoEvents = () => {
	$('ul').on('click', 'li', editToDoHandler);
	$('ul').on('keypress', 'input', endOfEditHandler);
	$('input.addToDo').keypress(addNewToDoHandler);
	$('#toggle-form').on('click', toggleInputHandler);
	$('ul').on('click', '.trashcontainer', deleteToDoTaskHandler);
	$('ul').on('click', '.starcontainer', toggleImportancyHandler);
	$('#back-to-calendar').on('click', toggleCalendar);
};

export {
	todoDataVisualization,
};
export {
	setToDoEvents,
};
