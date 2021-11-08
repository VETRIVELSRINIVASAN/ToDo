let toDoArray=[];
function toDo(value) {         //function to get rightpanel of selected button
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
  let openCreatedPanel = document.getElementById("third-panel");
  openCreatedPanel.style.display= "none";
  var enterValue= document.getElementById("add");

  enterValue.onclick=function() {                //function to add and store the subtask value
    let subText = document.getElementById("sub-text");
    let lineArea = document.getElementsByClassName("line");
    var subTextList = document.createElement("button");
    subTextList.classList.add("subtask-button");
    subTextList.innerText= subText.value;
    let checkBox =document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    let emptySpace = document.createElement("br");
    let subTask = subTextList.innerText;
    lineArea[0].appendChild(checkBox);
    lineArea[0].appendChild(subTextList);
    lineArea[0].appendChild(emptySpace);
    subText.value = "";

    checkBox.onclick =function check() {   // function to strike out completed task
      if(checkBox.checked) {
        subTextList.style.textDecoration= "line-through";
        toDoArray[findingIndex].sub[subTaskIndex].strike="true";
        console.log(toDoArray);
      }
      else {
        subTextList.style.textDecoration= "none";
        toDoArray[findingIndex].sub[subTaskIndex].strike="false";
        console.log(toDoArray);
      }
    }
    let storeStrike= "false";

    subTextList.onclick= function () {  //function to show third panel
      var createdPanelHead = document.getElementById("header");
      openCreatedPanel.style.display= "flex";
      createdPanelHead.innerHTML = subTextList.innerText;
      let addedStepArea = document.getElementById("added-step-area");
      addedStepArea.innerText="";
      var addStep= document.getElementById("add-step");

      createdPanelHead.contentEditable="true";
      createdPanelHead.onkeypress= function(e){    //function for editing subtask
       if(e.key=="Enter") {
          let newText = createdPanelHead.innerText;
          subTextList.innerText= newText;
          toDoArray[findingIndex].sub[subTaskIndex].head = newText;
          console.log(toDoArray);
      }
      }

      addStep.onclick = function() {  //function to add new step for subtask
      let newStepBox = document.getElementById("new-step");
      let addedStepArea = document.getElementById("added-step-area");
      var newStep = document.createElement("button");
      newStep.classList.add("subtask-button");
      newStep.innerText= newStepBox.value;
      let checkBox =document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      let emptySpace = document.createElement("br");
      addedStepArea.appendChild(checkBox);
      addedStepArea.appendChild(newStep);
      addedStepArea.appendChild(emptySpace);
      newStepBox.value = ""; 
      toDoArray[findingIndex].sub[subTaskIndex].step.push({stepHead:newStep.innerText,strike:""});
      }
      for (let j=0; j< toDoArray[findingIndex].sub[subTaskIndex].step.length; j++){
        let addedStepArea = document.getElementById("added-step-area");
        var newStep = document.createElement("button");
        newStep.classList.add("subtask-button");
        let checkBox =document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        let emptySpace = document.createElement("br");
        newStep.innerText= (toDoArray[findingIndex].sub[subTaskIndex].step[j].stepHead);
        addedStepArea.appendChild(checkBox);
        addedStepArea.appendChild(newStep);
        addedStepArea.appendChild(emptySpace);
      }
    }
    var findingIndex=(toDoArray.findIndex(c => c.title==value))
    if (findingIndex ==-1) {
      var arrayObject = {title:value, sub:[]};
      toDoArray.push(arrayObject);
      var findingIndex=(toDoArray.findIndex(c => c.title==value))
      toDoArray[findingIndex].sub.push({head:subTask, strike:storeStrike,step:[]});
      var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
    } else {
      toDoArray[findingIndex].sub.push({head:subTask, strike:storeStrike,step:[]});
      var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
    }
    subText.value = "";
  }
  var findingIndex=(toDoArray.findIndex(c => c.title==value))
  for(let i = 0; i < toDoArray[findingIndex].sub.length; i++) {
    let enteredList = document.createElement("button");
    enteredList.classList.add("subtask-button");
    let checkList = document.createElement("input");
    checkList.setAttribute("type","checkbox");
    let emptySpace = document.createElement("br");
    enteredList.innerText =  (toDoArray[findingIndex].sub[i].head);
    lineArea[0].appendChild(checkList);
    lineArea[0].appendChild(enteredList);
    lineArea[0].appendChild(emptySpace);
    if( toDoArray[findingIndex].sub[i].strike == "true") {
      console.log( toDoArray[findingIndex].sub[i].strike);
      checkList.checked= true;
      enteredList.style.textDecoration = "line-through";
    } else{
      checkList.checked= false;
      enteredList.style.textDecoration = "none";
    }
    checkList.onclick= function() { // function to strike out completed task
      if(checkList.checked) {
        enteredList.style.textDecoration = "line-through";
        var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
        toDoArray[findingIndex].sub[subTaskIndex].strike="true";
      }
      else {
        enteredList.style.textDecoration = "none";
        var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
        toDoArray[findingIndex].sub[subTaskIndex].strike="false";
      }
    }
    enteredList.addEventListener('click', function() {  //function to show third panel
      var createdPanelHead = document.getElementById("header");
       openCreatedPanel.style.display= "flex";
       createdPanelHead.innerHTML = enteredList.innerText;
    });

  }
}
function assign() {          // funtion for the rightpanel of assigned button
  let panelTitle = document.getElementById("panel-title");
  let panelSubtask = document.getElementsByClassName("panel-subtask");
  let assignedPanel = document.getElementById("assigned-panel");
  let lineBox = document.getElementsByClassName("lines");
  panelTitle.innerHTML = "Assigned to me";
  panelSubtask[0].style.display = "none";
  assignedPanel.style.display = "block";
  lineBox[0].style.display = "none";
}
function showTask() {         //function to add newtask in the leftpanel
  let input = document.getElementById("new-list");
  let addedTask = document.getElementById("added-task");
  var newList = document.createElement("li");
  newList.classList.add("new-list-style");
  newList.innerText = input.value;
  var listId= newList.innerText;
  newList.setAttribute("id",listId)
  addedTask.appendChild(newList);
  input.value = "";
  let lineArea = document.getElementsByClassName("line");
  lineArea[0].innerText ="";
  let panelSubtask = document.getElementsByClassName("panel-subtask");
  let panelTitle = document.getElementById("panel-title");
  let value = newList.innerText;
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
  let openCreatedPanel = document.getElementById("third-panel");
  openCreatedPanel.style.display= "none";

  newList.onclick= function() {      //function to get the rightpanel of created newlist
    let panelTitle = document.getElementById("panel-title");
    panelTitle.innerHTML = newList.innerText;
    panelSubtask[0].style.display = "block";
    lineArea[0].innerText ="";
    let assignedPanel = document.getElementById("assigned-panel");
    let lineBox = document.getElementsByClassName("lines");
    assignedPanel.style.display = "none";
    lineBox[0].style.display = "flex";
    openCreatedPanel.style.display= "none";
    var enterValue= document.getElementById("add");
    let body = panelTitle.innerText;

    enterValue.onclick=function() {    //function to add and store subtask value of newlist
      let subText = document.getElementById("sub-text");
      let lineArea = document.getElementsByClassName("line");
      var subTextList = document.createElement("button");
      subTextList.classList.add("subtask-button");
      subTextList.innerText= subText.value;
      let checkBox =document.createElement("input");
      checkBox.setAttribute("type", "checkBox");
      let emptySpace = document.createElement("br");
      let subTask = subTextList.innerText;
      lineArea[0].appendChild(checkBox);
      lineArea[0].appendChild(subTextList);
      lineArea[0].appendChild(emptySpace);
      subText.value = "";

      checkBox.onclick = function() {    // function to strike out completed task
        if(checkBox.checked){
        subTextList.style.textDecoration= "line-through";
        var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
        toDoArray[findingIndex].sub[subTaskIndex].strike="true";
        }
        else{
          subTextList.style.textDecoration= "none";
          var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
          toDoArray[findingIndex].sub[subTaskIndex].strike="false";
        }
      }
      subTextList.addEventListener('click', function() {  //function to show third panel
        var createdPanelHead = document.getElementById("header");
        var openCreatedPanel = document.getElementById("third-panel");
        openCreatedPanel.style.display= "flex";
        createdPanelHead.innerHTML = subTextList.innerText;
      });
      let storeStrike = "false";
      var findingIndex=(toDoArray.findIndex(c => c.title==value))
      if (findingIndex ==-1) {
        var arrayObject = {title:body, sub:[]};
        toDoArray.push(arrayObject);
        var findingIndex=(toDoArray.findIndex(c => c.title==value))
        toDoArray[findingIndex].sub.push({head:subTask, strike:storeStrike});
      } else {
        toDoArray[findingIndex].sub.push({head:subTask, strike:storeStrike});
      }
      subText.value = "";
    }
    panelTitle.contentEditable="true";
    panelTitle.onkeypress= function(event){    //function for editing list
     if(event.key=="Enter") {
        let newText = panelTitle.innerText;
        var newListId=document.getElementById(listId);
        newListId.innerText= newText;
        toDoArray[findingIndex].title = newText;
    }
    }
    var findingIndex=(toDoArray.findIndex(c => c.title==body))
    for(let i = 0; i < toDoArray[findingIndex].sub.length; i++) {
      let enteredList = document.createElement("button");
      enteredList.classList.add("subtask-button");
      let checkList = document.createElement("input");
      checkList.setAttribute("type","checkbox");
      let emptySpace = document.createElement("br");
      enteredList.innerText =  (toDoArray[findingIndex].sub[i].head);
      lineArea[0].appendChild(checkList);
      lineArea[0].appendChild(enteredList);
      lineArea[0].appendChild(emptySpace);
      if( toDoArray[findingIndex].sub[i].strike == "true") {
        checkList.checked= true;
        enteredList.style.textDecoration = "line-through";
      } else{
        checkList.checked= false;
        enteredList.style.textDecoration = "none";
      }
      checkList.onclick= function() { // function to strike out completed task
        if(checkList.checked) {
          enteredList.style.textDecoration = "line-through";
          var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
          toDoArray[findingIndex].sub[subTaskIndex].strike="true";
        }
        else {
          enteredList.style.textDecoration = "none";
          var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
          toDoArray[findingIndex].sub[subTaskIndex].strike="false";
        }
      }
      enteredList.addEventListener('click', function() {  //function to show third panel
        var createdPanelHead = document.getElementById("header");
         openCreatedPanel.style.display= "flex";
         createdPanelHead.innerHTML = enteredList.innerText;
      });
    }
  }
  newList.addEventListener('dblclick', function(){   //function to delete the created newlist
    addedTask.removeChild(newList);
    panelTitle.innerHTML = "Tasks";
    panelSubtask[0].style.display = "block";
  });
  deleteButton.onclick= function() {   //function to delete the created newlist
    let deleteContent = document.getElementById("deleting-button");
    deleteContent.style.display = "flex";
    var deleteList = document.getElementById("confirm-delete");
    deleteList.onclick=function() {
      //var newListId=document.getElementById(listId);
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
  }
}
function hideRightPanel() {  //function to hide third panel
  var openCreatedPanel = document.getElementById("third-panel");
  openCreatedPanel.style.display= "none";
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