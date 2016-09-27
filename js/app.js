var todoList = new Array();
var statusType;
var count = 0;
$('#todo').keyup(function(key) {
	if(key.keyCode==13 && $('#todo').val()!="") {
		var todo = $('#todo').val();
		count++;
		changeCount();
		todoList.push({
			"name" : todo, "status" : "active"
		})
		$("table").append('<tr><td class="tickColumn"><img id="tick" class="tick" src = "assets/images/green-tick-in-circle-1147519.jpg"></td><td class="todoColumn">' + todo + '</td><td class="crossColumn"><img class="cross" id="cross" src="assets/images/icon-02-512.png"></td></tr>');
		$('#todo').val("");
	}
})
$('table').on('click', 'tr', function(event) {
	if($(event.target).is('#tick')) {
		if(todoList[$(this).index()].status == "active") {
			count--;
			changeCount();
			$(this).addClass('strike');
			if(statusType == "active") {
				$(this).hide();
			}
			complete($(this).index());
		}
		else {
			count++;
			changeCount();
			$(this).removeClass('strike');
			if(statusType == "complete") {
				$(this).hide();
			}
			complete($(this).index());	
		}
	}
	else if($(event.target).is('#cross')) {
		if(todoList[$(this).index()].status == "active") {
			count--;
			changeCount();
		}
		del($(this).index());
		$(this).remove();
	}
});
function changeCount() {
	if(count > 0) {
		$("#numberOfItems").empty().append(count + " items left");
	}
	else if(count == 0) {
		$("#numberOfItems").empty();
	}
}
function del(id) {
	todoList = _.filter(todoList, function(item) {
		return item != todoList[id];
	})
}
function complete(id) {
	todoList[id].status = (todoList[id].status == "active") ? "complete" : "active";
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
		if(todoList[item].status == statusType || statusType == "all") {
			$(this).show();
		}
		else if(todoList[item].status != statusType) {
			$(this).hide();
		}
	})
}
$('table').on('dblclick', 'tr', function(event) {
	id = $(this).index();
	var el = $($(".todoColumn")[id]);
	todo = el.context.innerHTML;
	el.empty();
	el.append('<input type="text" id="edit">');
	$("#edit").val(todo);
	$('#edit').on("keyup focusout",(function(key) {
		console.log(key);
		if((key.keyCode==13 || key.type == "focusout") && $('#edit').val()!="") {
			var todo = $('#edit').val();
			$("#edit").remove();
			el.context.innerHTML = todo;
		}
		else if((key.keyCode==13 || key.type == "focusout") && $("#edit").val()=="") {
			if(todoList[$(this).index()].status == "active") {
				count--;
				changeCount();
			}
			del(id);
			$($("tr")[id]).remove();
		}
	}))
})