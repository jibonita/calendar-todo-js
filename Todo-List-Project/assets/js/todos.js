const toDosDataInfo = [{
	key: 20181010,
	toDo: [{
			value: 'buy tobacco',
			important: false
		},
		{
			value: 'make shisha',
			important: false
		},
		{
			value: 'chill',
			important: false
		},
	]
}]

let keyTofind = 20181010
let ceca = toDosDataInfo.filter((x) => x.key === keyTofind)
console.log(ceca)

// if (toDosDataInfo[0].toDo.length != 0) {
if (ceca[0].toDo.length != 0) {
	for (let i = 0; i < toDosDataInfo[0].toDo.length; i++) {
		$("#toDos").append("<li><span class='trash'><i class='fa fa-trash'></i></span> " + toDosDataInfo[0].toDo[i].value + "<span><i class='fa fa-star'></i></li>")
	}

}

$("ul").on("click", "li", function () {
	//$(this).toggleClass("completed");
	let textToFix = $(this).text()

	$(this).text('')

	//let input = $(`<input type='text' value='${textToFix}'>`)
	let input = $(`<input/>`)

	$(this).append(input)
	input.focus();
	$(this).off('click')
});

$("ul").on("click", "span", function (event) {
	$(this).parent().fadeOut(500, function () {
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
	if (event.which === 13) {

		let todoText = $(this).val();
		$(this).val("");

		$("ul").append("<li><span class='trash'><i class='fa fa-trash'></i></span> " + todoText + "<span><i class='fa fa-star'></i></li>")
	}
});

$("#toggle-form").click(function () {
	$("input[type='text']").fadeToggle();
});
