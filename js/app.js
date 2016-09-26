var todoList = new Array();
var statusType;
var count;
$('#todo').keyup(function(key) {
	if(key.keyCode==13 && $('#todo').val()!=="") {
		var todo = $('#todo').val();
		count++;
		todoList.push({
			"name" : todo, "status" : "active"
		})
		// getIndex(todo);
		$("table").append('<tr><td class="tickColumn"><img id="tick" class="tick" src = "assets/images/green-tick-in-circle-1147519.jpg"></td><td class="todoColumn">' + todo + '</td><td class="crossColumn"><img class="cross" id="cross" src="assets/images/icon-02-512.png"></td></tr>');
		$('#todo').val("");
	}
})
$('table').on('click', 'tr', function(event) {
	if($(event.target).is('#tick')) {
		count--;
		$(this).addClass('strike');
		if(statusType == "active") {
			$(this).hide();
		}
		complete($(this).index());
	}
	else if($(event.target).is('#cross')) {
		count--;
		del($(this).index())
		$(this).remove();
	}
});
// $('table').on('dblclick', '.todoColumn', function(event) {
	
// 	console.log("DONE");
// })
function del(id) {
	todoList = _.filter(todoList, function(item) {
		return item != todoList[id];
	})
	console.log(todoList);
}
function complete(id) {
	console.log(todoList,id);
	todoList[id].status = "complete";
}
function active() {
	statusType = "active";
	displayList();
}
function completed() {
	statusType = "complete";
	displayList();
}
function showAll() {
	statusType = "all";
	displayList();
}
function clearCompleted() {
	id = ($($("tr")).length)-1;
	for(x=id; x>=0; x--) {
		if(todoList[x].status == "complete"){
			$($("tr")[x]).remove();
		}
	}
	todoList = _.filter(todoList, function(item) {
		return item.status != "complete";
	})
}
function displayList() {
	$("tr").each(function(item) {
		console.log(todoList);
		console.log($("tr"));
		if(todoList[item].status == statusType || statusType == "all") {
			$(this).show();
		}
		else if(todoList[item].status != statusType) {
			$(this).hide();
		}
	})
}