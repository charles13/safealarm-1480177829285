(function(){

  function Facade(){

    var API_URL = "/api/Items";

    function getAllItems(){
      return $.get(API_URL)
    }

    function getItem(itemId){
      return $.get(API_URL + "/" + itemId);
    }

    function addNewItem(emergency,personalNum,name,contact,contactNum,coordination_long,coordination_lat,location,time){
      var item = {
        "emergency": emergency,
        "isDone": false,
        "personalNum": personalNum,
        "name": name,
        "contact": contact,
        "contactNum":contactNum,
        "coortination_long": coordination_long,
        "coordination_lat": coordination_lat,
        "location":location,
        "time":time,
      }
      return $.ajax( {
        url:API_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(item)
      });
    }

    function updateItem(text,personalNum,name,contact,contactNum,coordination_long,coordination_lat,location,time){
      var item = {
        "text": text,
        "personalNum": personalNum,
        "name": name,
        "contact": contact,
        "contactNum":contactNum,
        "coortination_long": coordination_long,
        "coordination_lat": coordination_lat,
        "location":location,
        "time":time,
      }

      return $.ajax( {
        url:API_URL + "/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(item)
      });
    }
    function markItemDone(id, state){
      var item = {
        "isDone": state
      }

      return $.ajax( {
        url:API_URL + "/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(item)
      });
    } 

    function deleteItem(id){
      return $.ajax( {
        url:API_URL + "/" + id,
        method: "DELETE"
      });
    }

    return {
      getAllItems:getAllItems,
      getItem:getItem,
      addNewItem:addNewItem,
      updateItem:updateItem,
      markItemDone: markItemDone,
      deleteItem:deleteItem
    }

  }

  window.Facade = new Facade();

}());
