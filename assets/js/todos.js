/* global $ */
import { DatabaseProcesses } from './dbProcesses.js';
const ceca = DatabaseProcesses.currentToDo;

const todoDataVisualization = (todoObj) => {
  if (todoObj[0].toDo.length !== 0) {
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

todoDataVisualization(DatabaseProcesses.currentToDo);

// ////////////////////////////// li to input
const curWords = [];

$('ul').on('click', 'li', function() {
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
    if (element.value === textToFind) {
      tova = i;
    }
  });
  return tova;
};

$('ul').on('keypress', 'input', function(event) {
  if (event.which === 13) {
    const todoText = $(this).val();

    ceca.toDo[simpleFunctionToFindIndex(curWords[0])].value = todoText;
    curWords.pop();
    $(this).val('');

    $(this).replaceWith(
      '<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
        todoText +
        '<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>'
    );
  }
});
// ///////////////////////////////////////////

// ////////////////////////////////////////////// triene
$('ul').on('click', 'span.trash', function(event) {
  const index = simpleFunctionToFindIndex(
    $(this)
      .parent()
      .text()
  );
  ceca[0].toDo.splice(index, 1);

  $(this)
    .parent()
    .fadeOut(500, function() {
      $(this).remove();
    });
  event.stopPropagation();
  console.log(ceca[0].toDo.length);
});

console.log(ceca[0].toDo.length);
// /////////////////////////////////////////////////

// //////////////////////////////////////////// addToDo
$('input[type=\'text\']').keypress(function(event) {
  if (event.which === 13) {
    const todoText = $(this).val();
    $(this).val('');
    $('ul').append(
      '<li><span class=\'trash\'><i class=\'fa fa-trash\'></i></span>' +
        todoText +
        '<span class=\'star\'><i class=\'fa fa-star\'></i></span></li>'
    );
    ceca[0].toDo.push({
      value: todoText,
      important: false,
    });
  }

  // pushtodate(text)
});
// ///////////////////////////

// //////////////////////////// + toggle input
$('#toggle-form').click(function() {
  $('input[type=\'text\']').fadeToggle();
});
// ///////////////////////////////////

// ///////////////////////////////// star importnt toggle
$('ul').on('click', 'span.star', function(event) {
  const index = simpleFunctionToFindIndex(
    $(this)
      .parent()
      .text()
  );
  console.log(index);
  ceca[0].toDo[index].important = !ceca[0].toDo[index].important;
  $(this).toggleClass('important');

  event.stopPropagation();
});

$('#back-to-calendar').click(function() {
  $('#container').trigger('todoclosed');
});
