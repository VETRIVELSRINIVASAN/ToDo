let mainTab=[];
function toDo(value) {         //function to get rightpanel of selected button
  let rightPanelTop = document.getElementsByClassName("right-panel-title");
  let panelSubtask = document.getElementsByClassName("panel-subtask");
  let panelTitle = document.getElementById("panel-title");
  panelTitle.innerHTML = value;
  panelSubtask[0].style.display = "block";
  let lineArea = document.getElementsByClassName("line");
  lineArea[0].innerText ="";
  let assignedPanel = document.getElementById("assigned-panel");
  let lineBox = document.getElementsByClassName("lines");
  assignedPanel.style.display = "none";
  lineBox[0].style.display = "flex";
  let title = panelTitle.innerHTML;
  var enterValue= document.getElementById("add");
  enterValue.onclick=function() {                //function to add and store the subtask value
    let subText = document.getElementById("sub-text");
    let lineArea = document.getElementsByClassName("line");
    let emptySpace = document.createElement("br");
    let subTask = subText.value;
    lineArea[0].append(subTask);
    lineArea[0].append(emptySpace);
     subText.value = "";
    var findingIndex=(mainTab.findIndex(c => c.title==value))
    if (findingIndex =-1) {
      var arrayObject = {title:value, sub:[]};
      mainTab.push(arrayObject);
      var findingIndex=(mainTab.findIndex(c => c.title==value))
      mainTab[findingIndex].sub.push(subTask);
    } else {
      mainTab[findingIndex].sub.push(subTask);
    }
    subText.value = "";
  }
  var findingIndex=(mainTab.findIndex(c => c.title==value))
  for(let i = 0; i < mainTab[findingIndex].sub.length; i++) {
    let enteredList = document.createElement("li");
    let innerList = document.createTextNode( mainTab[findingIndex].sub[i]);
    enteredList.style.listStyle= "none";
    enteredList.appendChild(innerList);
    lineArea[0].appendChild(enteredList);
  }
}
function assign() {          // funtion for the rightpanel of assigned button
  let rightPanelTop = document.getElementsByClassName("right-panel-title");
  let panelTitle = document.getElementById("panel-title");
  let panelSubtask = document.getElementsByClassName("panel-subtask");
  let assignedPanel = document.getElementById("assigned-panel");
  let lineBox = document.getElementsByClassName("lines");
  panelTitle.innerHTML = "Assigned to me";
  panelSubtask[0].style.display = "none";
  assignedPanel.style.display = "block";
  lineBox[0].style.display = "none";
}
let array=[];
function showTask() {         //function to add newtask in the leftpanel
  let input = document.getElementById("new-list");
  let addedTask = document.getElementById("added-task");
  var newList = document.createElement("li");
  newList.classList.add("new-list-style");
  newList.innerText = input.value;
  var listId= newList.innerHTML;
  newList.setAttribute("id",listId);
  addedTask.appendChild(newList);
  array.push(newList.innerText);
  console.log(array);
  input.value = "";
  let lineArea = document.getElementsByClassName("line");
  lineArea[0].innerText ="";
  let panelSubtask = document.getElementsByClassName("panel-subtask");
  let panelTitle = document.getElementById("panel-title");
  let body = newList.innerText;
  panelTitle.innerHTML = newList.innerText;
  panelSubtask[0].style.display = "block";
  let assignedPanel = document.getElementById("assigned-panel");
  let lineBox = document.getElementsByClassName("lines");
  assignedPanel.style.display = "none";
  lineBox[0].style.display = "flex";
  let deleteArea= document.getElementById("delete-dot-button");
  deleteArea.innerHTML="";
  let deleteButton=document.createElement("button");
  deleteButton.innerHTML = "..."
  deleteButton.setAttribute('id','deletor');
  deleteArea.appendChild(deleteButton);
  newList.addEventListener('click', function() {      //function to get the rightpanel of created newlist
    let panelTitle = document.getElementById("panel-title");
    panelTitle.innerHTML = newList.innerText;
    panelSubtask[0].style.display = "block";
    lineArea[0].innerText ="";
    let assignedPanel = document.getElementById("assigned-panel");
    let lineBox = document.getElementsByClassName("lines");
    assignedPanel.style.display = "none";
    lineBox[0].style.display = "flex";
    var enterValue= document.getElementById("add");
    enterValue.onclick=function() {                      //function to add and store subtask value of newlist
      let subText = document.getElementById("sub-text");
      let lineArea = document.getElementsByClassName("line");
      let emptySpace = document.createElement("br");
      let subTask = subText.value;
      lineArea[0].append(subTask);
      lineArea[0].append(emptySpace);
      subText.value = "";
      var findingIndex=(mainTab.findIndex(c => c.title==body))
      if (findingIndex =-1) {
        var arrayObject = {title:body, sub:[]};
        mainTab.push(arrayObject);
        var findingIndex=(mainTab.findIndex(c => c.title==body))
        mainTab[findingIndex].sub.push(subTask);
      } else {
        mainTab[findingIndex].sub.push(subTask);
      }
      subText.value = "";
    }
    let newListValue= newList.innerText
    var findingIndex=(mainTab.findIndex(c => c.title==body)) 
    var arrayIndex =(array.findIndex(c => c==newListValue));
    console.log(arrayIndex);
    panelTitle.contentEditable="true";
    panelTitle.addEventListener("keypress",function(event){    //function for editing list
     if(event.key=="Enter") {
        let newText = panelTitle.innerText;
        var newListId=document.getElementById(listId);
        newListId.innerText = newText;
        array[arrayIndex] = newText;
        mainTab[findingIndex].title = newText;
    }
    });
    var findingIndex=(mainTab.findIndex(c => c.title==body))
    for(let i = 0; i < mainTab[findingIndex].sub.length; i++) {
      let enteredList = document.createElement("li");
      let innerList = document.createTextNode( mainTab[findingIndex].sub[i]);
      enteredList.style.listStyle= "none";
      enteredList.appendChild(innerList);
      lineArea[0].appendChild(enteredList);
    }
  });
  newList.addEventListener('dblclick', function(){   //function to delete the created newlist
    addedTask.removeChild(newList);
    panelTitle.innerHTML = "Tasks";
    panelSubtask[0].style.display = "block";
  });
  deleteButton.addEventListener('click', function(){   //function to delete the created newlist
    let deleteContent = document.getElementById("deleting-button");
    deleteContent.style.display = "flex";
    var deleteList = document.getElementById("confirm-delete");
    deleteList.onclick=function() {
      addedTask.removeChild(newList);
      //addedTask.removeChild(addedTask.childNodes[0]);
      panelTitle.innerHTML = "Tasks";
      panelSubtask[0].style.display = "block";
      deleteContent.style.display = "none";
    }
    var cancelor = document.getElementById("cancel");
    cancelor.onclick=function() {
    deleteContent.style.display = "none";
    }
  });
}
function navigate() {       //function to open toggle bar
  var sideBar = document.getElementById("side-tab");
  var closedBar =document.getElementById("navigator");
  if (sideBar.style.display === "none") {
    sideBar.style.display = "flex";
    closedBar.style.display= "none";
  } else {
    sideBar.style.display = "none";
    closedBar.style.display ="flex";
  }
}
function closeNavigate() { //function to close toggle bar
  var sideBar = document.getElementById("side-tab");
  var closedBar =document.getElementById("navigator")
  if (closedBar.style.display === "flex") {
    sideBar.style.display = "flex";
    closedBar.style.display= "none";
  } else {
      sideBar.style.display = "none";
      closedBar.style.display ="flex";
  }
}
  
