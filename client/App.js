/*eslint-env browser */
(function () {

	function App() {

		var $infoBox = $("#InfoBox");
   		var $editItemInterface = $("#EditItemInterface");
		var $saveNewItemButton = $("#SaveNewItemButton");
   		var $saveExistingItemButton = $("#SaveExistingItemButton");
		var $itemsList = $("#ItemsList");
		var $itemText = $("#ItemText");
		var $idBeingEdited = "";
		var $editBtn = "";
		var $refreshBtn = $("#refresh");

		$refreshBtn.click(onRefreshClick);
  		$saveNewItemButton.click(onSaveNewItemButtonClicked);
    	$saveExistingItemButton.click(onSaveExistingItemButtonClicked);
    	window.setInterval(function(){  		
    		onRefreshClick()
    		}, 1000);

		function init() {
			$infoBox.children("#init").show();
			refreshItemsList();
			$("#new-todo").submit(function (e) {
				return false;
			});
		}
		function onRefreshClick(){
			//$itemsList.css("opacity", "0");
			refreshItemsList();
			setTimeout(function(){
				//$itemsList.css("opacity", "1");
			}, 250);
		}
		function refreshItemsList() {
			Facade.getAllItems().then(populateItemsList);
		}
		function populateItemsList(items) {
			$itemsList.empty();
			var todos = [];

			$.each(items, function (idx, item) {
				if (item.isDone == false) {
					var $tr = $("<tr/>").attr("itemId", item.id);
					var $doneBox = $("<td>").append($("<input>").attr("type", "checkbox")).click(onDoneButtonClicked);
				} else {
					var $tr = $("<tr/>").attr({"itemId": item.id, "class": "done"});
					var $doneBox = $("<td>").append($("<input>").attr({
						"type": "checkbox",
						"checked": "checked"
					})).click(onDoneButtonClicked);
				}

				var $text = $("<td>").text(item.text);
				var $number = $("<td>").text("Personal Number"); 
				var $name = $("<td>").text("Patient Name");
				var $contactname = $("<td>").text("Contact Name");
				var $contactnumber =$("<td>").text("Contact Number");
				var $coord_long = $("<td>").text("Coord Long");
				var $coord_lat = $("<td>").text("Coord Lat");

				//// TO FIX
				//var $number = $("<td>").text(item.personalNum); 
				//var $name = $("<td>").text(item.name);
				//var $contactname = $("<td>").text(item.contact);
				//var $contactnumber =$("<td>").text(item.contactNum);
				//var $coord_long = $("<td>").text(item.coordination_long);
				//var $coord_lat = $("<td>").text(item.coordination_lat);
				
				var x3 = new Date();
				var res = String(x3);
				var nueva = res.substring(0,25);
				var timestamp = $("<td>").text(nueva);
					
				var $deleteButton = $("<td>").text("delete").attr("class", "link delete tc").click(onDeleteButtonClicked);

				$tr.append(nueva).append($text).append($number).append($name).append($contactname).append($contactnumber).append($coord_long).append($coord_lat).append($deleteButton);
				//$tr.append($doneBox).append($text).append($contactname).append($deleteButton);
				todos.push($tr);
			});

			if (todos.length > 0) {
				$('#refresh').show();
			}

			$.each(todos, function (idx, $tr) {
				$itemsList.append($tr);
			});
		}

		function onEditButtonClicked() {
			$infoBox.children().removeClass('active');
			$infoBox.children("#editButtonClicked").addClass('active');

			$editBtn = $(this);
			var itemId = $editBtn.parent().attr("itemId");

			$editBtn.next().show();
			$editBtn.hide();

			var todo = $editBtn.prev();
			todo.empty();

			Facade.getItem(itemId).then(function (item) {
				var editField = $("<input>").attr({"type": "text", "value": item.text, "class": "edit-field"});
				todo.append(editField);
				editField.focus();

				$idBeingEdited = item.id;
			});

			$(".edit").unbind("click").addClass("disabled");
			$(".delete").unbind("click").addClass("disabled");
		}

		function onDoneButtonClicked() {
			$infoBox.children().removeClass('active');
			$infoBox.children("#doneButtonClicked").addClass('active');
			var itemId = $(this).parent().attr("itemId");
			Facade.getItem(itemId).then(setToggle);
		}

		function setToggle(item) {
			Facade.markItemDone(item.id, !item.isDone).then(refreshItemsList);
		}

		function onDeleteButtonClicked() {
			var itemId = $(this).parent().attr("itemId");

			$infoBox.children().removeClass('active');
			$infoBox.children("#deleteButtonClicked").addClass('active');
			Facade.deleteItem(itemId).then(refreshItemsList).fail(function (err) {
				alert("DELETE FAILED");
			});
			//}
		}

		function onSaveNewItemButtonClicked() {
      var itemText = $itemText.val();

			$infoBox.children().removeClass('active');
			$infoBox.children("#saveNewItemClicked").addClass('active');
			Facade.addNewItem(itemText).then(refreshItemsList);
      $itemText.val("");
			$itemText.focus();
		}

		function onSaveExistingItemButtonClicked() {
      var itemText = $(".edit-field").val();

			$infoBox.children().removeClass('active');
			$infoBox.children("#saveExistingItemClicked").addClass('active');
			Facade.updateItem($idBeingEdited, itemText).then(refreshItemsList);
			$idBeingEdited = "";
		}

		return {
			init: init
		};
	}


	window.App = new App();

}());


