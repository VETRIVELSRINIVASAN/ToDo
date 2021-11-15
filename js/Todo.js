let toDoArray=[];    //array to store left panel title,subtask and steps.
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
  let openCreatedPanel = document.getElementById("third-panel");
  openCreatedPanel.style.display= "none";
  var enterValue= document.getElementById("add");
  let addedStepArea = document.getElementById("added-step-area");
  addedStepArea.innerText="";

  enterValue.onclick=function() {                //function to add and store the subtask value
    let subText = document.getElementById("sub-text");
    let lineArea = document.getElementsByClassName("line");
    var subTextList = document.createElement("button");
    subTextList.classList.add("subtask-button");
    subTextList.innerText= subText.value;
    var subTaskId= subTextList.innerText;
    var checkBoxId = subTextList.innerText;
    subTextList.setAttribute("id",subTaskId)
    let checkBox =document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", checkBoxId);
    let borderLine = document.createElement("div");
    borderLine.classList.add("border-line");
    let emptySpace = document.createElement("br");
    let subTask = subTextList.innerText;
    lineArea[0].appendChild(checkBox);
    lineArea[0].appendChild(subTextList);
    lineArea[0].appendChild(borderLine);
    lineArea[0].appendChild(emptySpace);
    subText.value = "";
    var createdPanelHead = document.getElementById("header");
    var thirdpanelCheckBox = document.getElementById("right-navigate-check");

    checkBox.onclick =function check() {   // function to strike out completed task
      if(checkBox.checked) {
        subTextList.style.textDecoration= "line-through";
        toDoArray[findingIndex].sub[subTaskIndex].strike="true";
        thirdpanelCheckBox.checked = true;
        createdPanelHead.style.textDecoration= "line-through";
        }
      else {
        subTextList.style.textDecoration= "none";
        toDoArray[findingIndex].sub[subTaskIndex].strike="false";
        thirdpanelCheckBox.checked = false;
          createdPanelHead.style.textDecoration= "none";
      }
    }
    thirdpanelCheckBox.onclick =function () {   // function to strike out completed task on third panel
      if(thirdpanelCheckBox.checked) {
        checkBox.checked = true;
        subTextList.style.textDecoration= "line-through";
        toDoArray[findingIndex].sub[subTaskIndex].strike="true";
        createdPanelHead.style.textDecoration= "line-through";
      }
      else {
        checkBox.checked = false;
        subTextList.style.textDecoration= "none";
        toDoArray[findingIndex].sub[subTaskIndex].strike="false";
        createdPanelHead.style.textDecoration= "none";
      }
    }
    let storeStrike= "false";

    subTextList.onclick= function () {    //function to show third panel
      var createdPanelHead = document.getElementById("header");
      openCreatedPanel.style.display= "flex";
      createdPanelHead.innerHTML = subTextList.innerText;
      let addedStepArea = document.getElementById("added-step-area");
      addedStepArea.innerText="";
      if(checkBox.checked == true) {
        createdPanelHead.style.textDecoration= "line-through";
        thirdpanelCheckBox.checked= true;
      } else {
        createdPanelHead.style.textDecoration= "none";
        thirdpanelCheckBox.checked= false;
      }

      createdPanelHead.contentEditable="true";
      createdPanelHead.onkeypress= function(e){    //function for editing subtask
        if(e.key=="Enter") {
          let newText = createdPanelHead.innerText;
          subTextList.innerText= newText;
          toDoArray[findingIndex].sub[subTaskIndex].head = newText;
        }
      }
      for (let j=0; j< toDoArray[findingIndex].sub[subTaskIndex].step.length; j++){
        let addedStepArea = document.getElementById("added-step-area");
        var newStep = document.createElement("button");
        newStep.classList.add("subtask-button");
        let checkBox =document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        newStep.innerText= (toDoArray[findingIndex].sub[subTaskIndex].step[j].stepHead);
        let stepDelete = document.createElement("button");
        stepDelete.innerText = "x";
        stepDelete.classList.add("subtask-button");
        let stepArea = document.createElement("div");
        stepArea.appendChild(checkBox);
        stepArea.appendChild(newStep);
        stepArea.appendChild(stepDelete);
        addedStepArea.appendChild(stepArea);
        if( toDoArray[findingIndex].sub[subTaskIndex].step[j].strike == "true") {
          checkBox.checked= true;
          newStep.style.textDecoration = "line-through";
        } else{
          checkBox.checked= false;
          newStep.style.textDecoration = "none";
        }
        
        stepDelete.onclick = function () {   //function to delete the step
          var newStepValue = newStep.innerText;
          var stepIndex =(toDoArray[findingIndex].sub[subTaskIndex].step.findIndex(b => b.stepHead==newStepValue))
          let deleteContent = document.getElementById("deleting-button");
          deleteContent.style.display = "flex";
          let upperDeleteText = document.getElementById("delete-text");
          let lowerDeleteText = document.getElementById("second-delete-text")
          upperDeleteText.innerText = newStep.innerText +" "+ "will be permanently deleted";
          lowerDeleteText.innerText = "You won't be able to undo this action"
          var deleteList = document.getElementById("confirm-delete");
          var cancelor = document.getElementById("cancel");
      
          deleteList.onclick = function() {
          addedStepArea.removeChild(stepArea);
          toDoArray[findingIndex].sub[subTaskIndex].step.splice(stepIndex,1);
          deleteContent.style.display = "none";
          }
       
          cancelor.onclick = function() {
            deleteContent.style.display = "none";
          }
        }
      }
    }
    var findingIndex=(toDoArray.findIndex(c => c.title==value))
    if (findingIndex ==-1) {           // steps to push the title and subtask in todo array
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
      checkList.checked= true;
      enteredList.style.textDecoration = "line-through";
    } else{
      checkList.checked= false;
      enteredList.style.textDecoration = "none";
    }
    var createdPanelHead = document.getElementById("header");
    var thirdpanelCheckBox = document.getElementById("right-navigate-check");
    let subTaskHeader = document.getElementById("header");
    let subTask = subTaskHeader.innerText;

    checkList.onclick= function() { // function to strike out completed task
      if(checkList.checked) {
        enteredList.style.textDecoration = "line-through";
        thirdpanelCheckBox.checked = true;
        var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
        toDoArray[findingIndex].sub[subTaskIndex].strike="true";
        createdPanelHead.style.textDecoration= "line-through";
      }
      else {
        enteredList.style.textDecoration = "none";
        thirdpanelCheckBox.checked = false;
        var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
        toDoArray[findingIndex].sub[subTaskIndex].strike="false";
        createdPanelHead.style.textDecoration= "none";
      }
    }
    enteredList.onclick= function() {  //function to show third panel
      var createdPanelHead = document.getElementById("header");
      openCreatedPanel.style.display= "flex";
      createdPanelHead.innerHTML = enteredList.innerText;
      let addedStepArea = document.getElementById("added-step-area");
      addedStepArea.innerText="";
      if(checkList.checked == true) {
        createdPanelHead.style.textDecoration= "line-through";
        thirdpanelCheckBox.checked= true;
      } else {
        createdPanelHead.style.textDecoration= "none";
        thirdpanelCheckBox.checked= false;
      }

      createdPanelHead.contentEditable="true";
      createdPanelHead.onkeypress= function(e){    //function for editing subtask
        if(e.key=="Enter") {
          let newText = createdPanelHead.innerText;
          enteredList.innerText= newText;
          toDoArray[findingIndex].sub[subTaskIndex].head = newText;
        }
      }
      let subTaskHeader = document.getElementById("header");
      let subTask = subTaskHeader.innerText;
      var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
      for (let j=0; j< toDoArray[findingIndex].sub[subTaskIndex].step.length; j++){
        let addedStepArea = document.getElementById("added-step-area");
        var newStep = document.createElement("button");
        newStep.classList.add("subtask-button");
        let checkBox =document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        let stepDelete = document.createElement("button");
        stepDelete.innerText = "x";
        stepDelete.classList.add("subtask-button");
        let stepArea = document.createElement("div");
        newStep.innerText= (toDoArray[findingIndex].sub[subTaskIndex].step[j].stepHead);
        stepArea.appendChild(checkBox);
        stepArea.appendChild(newStep);
        stepArea.appendChild(stepDelete);
        addedStepArea.appendChild(stepArea);
        if( toDoArray[findingIndex].sub[subTaskIndex].step[j].strike == "true") {
          checkBox.checked= true;
          newStep.style.textDecoration = "line-through";
        } else{
          checkBox.checked= false;
          newStep.style.textDecoration = "none";
        }

        stepDelete.onclick = function () {  //function to delete step
          var newStepValue = newStep.innerText;
          var stepIndex =(toDoArray[findingIndex].sub[subTaskIndex].step.findIndex(b => b.stepHead==newStepValue))
          let deleteContent = document.getElementById("deleting-button");
          deleteContent.style.display = "flex";
          let upperDeleteText = document.getElementById("delete-text");
          let lowerDeleteText = document.getElementById("second-delete-text")
          upperDeleteText.innerText = newStep.innerText +" "+ "will be permanently deleted";
          lowerDeleteText.innerText = "You won't be able to undo this action"
          var deleteList = document.getElementById("confirm-delete");
          var cancelor = document.getElementById("cancel");
      
          deleteList.onclick = function() {
          addedStepArea.removeChild(stepArea);
          toDoArray[findingIndex].sub[subTaskIndex].step.splice(stepIndex,1);
          deleteContent.style.display = "none";
          }
       
          cancelor.onclick = function() {
            deleteContent.style.display = "none";
          }
        }
      }
    }

  }
}
let specialCharacter = /!|@|#|$|%|\^|&|\*|\(|{|}|\)|\?|\>|\</g
function addStep() {     //function to add new step for subtask
  let panelTitle = document.getElementById("panel-title");
  let value = panelTitle.innerText;
  let subTaskHeader = document.getElementById("header");
  let subTask = subTaskHeader.innerText;
  let newStepBox = document.getElementById("new-step");
  let inputText = newStepBox.value;
  try{
    if(inputText.match(specialCharacter).length>1) {
      throw "if entered";
    }
    else {
      let addedStepArea = document.getElementById("added-step-area");
      var newStep = document.createElement("button");
      newStep.classList.add("subtask-button");
      newStep.innerText= newStepBox.value;
      let checkBox =document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      let stepDelete = document.createElement("button");
      stepDelete.innerText = "x";
      stepDelete.classList.add("subtask-button");
      let stepArea = document.createElement("div");
      let stepId = newStep.innerText;
      stepArea.setAttribute("id",stepId);
      stepArea.appendChild(checkBox);
      stepArea.appendChild(newStep);
      stepArea.appendChild(stepDelete);
      addedStepArea.appendChild(stepArea);
      var newStepValue = newStep.innerText;
      newStepBox.value = ""; 
      var findingIndex=(toDoArray.findIndex(c => c.title==value))
      var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
      toDoArray[findingIndex].sub[subTaskIndex].step.push({stepHead:newStep.innerText,strike:""});
      var stepIndex =(toDoArray[findingIndex].sub[subTaskIndex].step.findIndex(b => b.stepHead==newStepValue))

      newStep.contentEditable="true";
      newStep.onkeypress= function(e){    //function for editing subtask
        if(e.key=="Enter") {
          let newText = newStep.innerText;
          toDoArray[findingIndex].sub[subTaskIndex].step[stepIndex].stepHead = newText;
        }
      }

      stepDelete.onclick = function () {  //function to delete step
        let deleteContent = document.getElementById("deleting-button");
        deleteContent.style.display = "flex";
        let upperDeleteText = document.getElementById("delete-text");
        let lowerDeleteText = document.getElementById("second-delete-text")
        upperDeleteText.innerText = newStep.innerText +" "+ "will be permanently deleted";
        lowerDeleteText.innerText = "You won't be able to undo this action"
        var deleteList = document.getElementById("confirm-delete");
        var cancelor = document.getElementById("cancel");

        deleteList.onclick = function() {
          addedStepArea.removeChild(stepArea);
          toDoArray[findingIndex].sub[subTaskIndex].step.splice(stepIndex,1);
          deleteContent.style.display = "none";
        }
 
        cancelor.onclick = function() {
          deleteContent.style.display = "none";
        }
      }

      checkBox.onclick =function () {   // function to strike out completed step
        if(checkBox.checked) {
          newStep.style.textDecoration= "line-through";
          toDoArray[findingIndex].sub[subTaskIndex].step[stepIndex].strike="true";
        }
       else {
        newStep.style.textDecoration= "none";
        toDoArray[findingIndex].sub[subTaskIndex].step[stepIndex].strike="true";
       }
     }
}
}
  catch(error) {
    let deleteContent = document.getElementById("deleting-button");
    deleteContent.style.display = "flex";
    document.getElementById("delete-text").innerHTML = "";
    let deleteText = document.getElementById("second-delete-text");
    deleteText.innerHTML = "You can't add special characters"
    var deleteList = document.getElementById("confirm-delete");
    document.getElementById("cancel").innerHTML= " ";
    deleteList.innerHTML="OK";
    deleteList.onclick = function () {
      deleteContent.style.display = "none";
    }
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
let newListArray = [];
function showTask() {         //function to add newtask in the leftpanel
  let input = document.getElementById("new-list");
  let addedTask = document.getElementById("added-task");
  var newList = document.createElement("li");
  newList.classList.add("new-list-style");
  newList.innerText = input.value;
  newListArray.push(newList.innerText);
  var listId= newList.innerText;
  newList.setAttribute("id",listId)
  addedTask.append(newList);
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
  let openCreatedPanel = document.getElementById("third-panel");
  openCreatedPanel.style.display= "none";
  var toggleUpperImages = document.getElementById("toggle-upper-images");
  var img = document.createElement("img");
  img.src = "Assets/lists.png";
  img.classList.add("navigation-top-image");
  toggleUpperImages.appendChild(img);

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

    let deleteArea= document.getElementById("delete-dot-button");
    deleteArea.innerHTML="";
    let deleteButton=document.createElement("button");
    deleteButton.innerHTML = "..."
    deleteButton.setAttribute('id','deletor');
    deleteArea.appendChild(deleteButton);
    var newListIndex = newListArray.findIndex(c=> c===value);

    deleteButton.onclick= function() {   //function to delete the created newlist
      let value = panelTitle.innerText;
      var findingIndex=(toDoArray.findIndex(c => c.title==value))
      let deleteContent = document.getElementById("deleting-button");
      deleteContent.style.display = "flex";
      let upperDeleteText = document.getElementById("delete-text");
      let lowerDeleteText = document.getElementById("second-delete-text")
      upperDeleteText.innerText = newList.innerText +" "+ "will be permanently deleted";
      lowerDeleteText.innerText = "You won't be able to undo this action";
      var deleteList = document.getElementById("confirm-delete");

      deleteList.onclick=function() {
        toggleUpperImages.removeChild(img);
        let addedTask = document.getElementById("added-task");
        addedTask.removeChild(addedTask.childNodes[newListIndex]);
        newListArray.splice(newListIndex,1);
        toDoArray.splice(findingIndex,1);
        panelTitle.innerHTML = "Tasks";
        panelSubtask[0].style.display = "block";
        deleteContent.style.display = "none";
        lineArea[0].innerHTML="";
      }
      var cancelor = document.getElementById("cancel");
      cancelor.onclick=function() {
      deleteContent.style.display = "none";
      }
    }

    enterValue.onclick=function() {    //function to add and store subtask value of newlist
      let subText = document.getElementById("sub-text");
      let lineArea = document.getElementsByClassName("line");
      var subTextList = document.createElement("button");
      subTextList.classList.add("subtask-button");
      subTextList.innerText= subText.value;
      var subTaskId= subTextList.innerText;
      var checkBoxId = subTextList.innerText;
      subTextList.setAttribute("id",subTaskId)
      let checkBox =document.createElement("input");
      checkBox.setAttribute("type", "checkBox");
      checkBox.setAttribute("id", checkBoxId);
      let borderLine = document.createElement("div");
      let emptySpace = document.createElement("br");
      let subTask = subTextList.innerText;
      lineArea[0].appendChild(checkBox);
      lineArea[0].appendChild(subTextList);
      lineArea[0].appendChild(borderLine);
      lineArea[0].appendChild(emptySpace);
      subText.value = "";
      var createdPanelHead = document.getElementById("header");
      var thirdpanelCheckBox = document.getElementById("right-navigate-check");

      checkBox.onclick = function() {    // function to strike out completed task
        if(checkBox.checked){
        subTextList.style.textDecoration= "line-through";
        var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
        toDoArray[findingIndex].sub[subTaskIndex].strike="true";
        thirdpanelCheckBox.checked = true;
        createdPanelHead.style.textDecoration= "line-through";
        }
        else{
          subTextList.style.textDecoration= "none";
          var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
          toDoArray[findingIndex].sub[subTaskIndex].strike="false";
          thirdpanelCheckBox.checked = false;
          createdPanelHead.style.textDecoration= "none";
          
        }
      }
      subTextList.onclick = function() {  //function to show third panel
        var createdPanelHead = document.getElementById("header");
        var openCreatedPanel = document.getElementById("third-panel");
        openCreatedPanel.style.display= "flex";
        createdPanelHead.innerHTML = subTextList.innerText;
        let addedStepArea = document.getElementById("added-step-area");
        addedStepArea.innerText="";
        var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
        if(checkBox.checked == true) {
          createdPanelHead.style.textDecoration= "line-through";
          thirdpanelCheckBox.checked= true;
        } else {
          createdPanelHead.style.textDecoration= "none";
          thirdpanelCheckBox.checked= false;
        }
       
        createdPanelHead.contentEditable="true";
        createdPanelHead.onkeypress= function(e){    //function for editing subtask
         if(e.key=="Enter") {
           let newText = createdPanelHead.innerText;
           subTextList.innerText= newText;
           toDoArray[findingIndex].sub[subTaskIndex].head = newText;
         }
        }
        for (let j=0; j< toDoArray[findingIndex].sub[subTaskIndex].step.length; j++){
          let addedStepArea = document.getElementById("added-step-area");
          var newStep = document.createElement("button");
          newStep.classList.add("subtask-button");
          let checkBox =document.createElement("input");
          checkBox.setAttribute("type", "checkbox");
          newStep.innerText= (toDoArray[findingIndex].sub[subTaskIndex].step[j].stepHead);
          let stepDelete = document.createElement("button");
          stepDelete.innerText = "x";
          stepDelete.classList.add("subtask-button");
          let stepArea = document.createElement("div");
          stepArea.appendChild(checkBox);
          stepArea.appendChild(newStep);
          stepArea.appendChild(stepDelete);
          addedStepArea.appendChild(stepArea);
          if( toDoArray[findingIndex].sub[subTaskIndex].step[j].strike == "true") {
            checkBox.checked= true;
            newStep.style.textDecoration = "line-through";
          } else{
            checkBox.checked= false;
            newStep.style.textDecoration = "none";
          }  
        
          stepDelete.onclick = function () {  //function for editing steps
            var newStepValue = newStep.innerText;
            var stepIndex =(toDoArray[findingIndex].sub[subTaskIndex].step.findIndex(b => b.stepHead==newStepValue))
            let deleteContent = document.getElementById("deleting-button");
            deleteContent.style.display = "flex";
            let upperDeleteText = document.getElementById("delete-text");
            let lowerDeleteText = document.getElementById("second-delete-text")
            upperDeleteText.innerText = newStep.innerText +" "+ "will be permanently deleted";
            lowerDeleteText.innerText = "You won't be able to undo this action"
            var deleteList = document.getElementById("confirm-delete");
            var cancelor = document.getElementById("cancel");
      
            deleteList.onclick = function() {
              addedStepArea.removeChild(stepArea);
              toDoArray[findingIndex].sub[subTaskIndex].step.splice(stepIndex,1);
              deleteContent.style.display = "none";
            }
       
            cancelor.onclick = function() {
              deleteContent.style.display = "none";
            }
         }
       } 
      }
      let storeStrike = "false";
      var findingIndex=(toDoArray.findIndex(c => c.title==value))
      if (findingIndex ==-1) {          // storing newlist value ,subtask and their steps
        var arrayObject = {title:body, sub:[]};
        toDoArray.push(arrayObject);
        var findingIndex=(toDoArray.findIndex(c => c.title==value))
        toDoArray[findingIndex].sub.push({head:subTask, strike:storeStrike,step:[]});
      } else {
        toDoArray[findingIndex].sub.push({head:subTask, strike:storeStrike,step:[]});
      }
      subText.value = "";
    }
    panelTitle.contentEditable="true";
    panelTitle.onkeypress= function(event){    //function for editing list title
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
      var createdPanelHead = document.getElementById("header");
      var thirdpanelCheckBox = document.getElementById("right-navigate-check");
      let subTaskHeader = document.getElementById("header");
      let subTask = subTaskHeader.innerText;

      checkList.onclick= function() { // function to strike out completed task
        if(checkList.checked) {
          enteredList.style.textDecoration = "line-through";
          thirdpanelCheckBox.checked = true;
          var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
          toDoArray[findingIndex].sub[subTaskIndex].strike="true";
          createdPanelHead.style.textDecoration= "line-through";
        }
        else {
          enteredList.style.textDecoration = "none";
          thirdpanelCheckBox.checked = false;
          var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
          toDoArray[findingIndex].sub[subTaskIndex].strike="false";
          createdPanelHead.style.textDecoration= "none";
        }
      }
      enteredList.onclick = function() {  //function to show third panel
        var createdPanelHead = document.getElementById("header");
          openCreatedPanel.style.display= "flex";
          createdPanelHead.innerHTML = enteredList.innerText;
          let addedStepArea = document.getElementById("added-step-area");
          addedStepArea.innerText="";
          if(checkList.checked == true) {
            createdPanelHead.style.textDecoration= "line-through";
            thirdpanelCheckBox.checked= true;
          } else {
            createdPanelHead.style.textDecoration= "none";
            thirdpanelCheckBox.checked= false;
          }
        
          createdPanelHead.contentEditable="true";
          createdPanelHead.onkeypress= function(e){    //function for editing subtask
            if(e.key=="Enter") {
              let newText = createdPanelHead.innerText;
              enteredList.innerText= newText;
              toDoArray[findingIndex].sub[subTaskIndex].head = newText;
            }
          }
          let subTaskHeader = document.getElementById("header");
          let subTask = subTaskHeader.innerText;
          var subTaskIndex =(toDoArray[findingIndex].sub.findIndex(a => a.head==subTask))
          for (let j=0; j< toDoArray[findingIndex].sub[subTaskIndex].step.length; j++){
            let addedStepArea = document.getElementById("added-step-area");
            var newStep = document.createElement("button");
            newStep.classList.add("subtask-button");
            let checkBox =document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            let stepDelete = document.createElement("button");
            stepDelete.innerText = "x";
            stepDelete.classList.add("subtask-button");
            let stepArea = document.createElement("div");
            newStep.innerText= (toDoArray[findingIndex].sub[subTaskIndex].step[j].stepHead);
            stepArea.appendChild(checkBox);
            stepArea.appendChild(newStep);
            stepArea.appendChild(stepDelete);
            addedStepArea.appendChild(stepArea);
            if( toDoArray[findingIndex].sub[subTaskIndex].step[j].strike == "true") {
              checkBox.checked= true;
              newStep.style.textDecoration = "line-through";
            } else{
              checkBox.checked= false;
              newStep.style.textDecoration = "none";
            }
  
            stepDelete.onclick = function () { // function to delete step
              var newStepValue = newStep.innerText;
              var stepIndex =(toDoArray[findingIndex].sub[subTaskIndex].step.findIndex(b => b.stepHead==newStepValue))
              let deleteContent = document.getElementById("deleting-button");
              deleteContent.style.display = "flex";
              let upperDeleteText = document.getElementById("delete-text");
              let lowerDeleteText = document.getElementById("second-delete-text")
              upperDeleteText.innerText = newStep.innerText +" "+ "will be permanently deleted";
              lowerDeleteText.innerText = "You won't be able to undo this action"
              var deleteList = document.getElementById("confirm-delete");
              var cancelor = document.getElementById("cancel");
        
              deleteList.onclick = function() {
                addedStepArea.removeChild(stepArea);
                toDoArray[findingIndex].sub[subTaskIndex].step.splice(stepIndex,1);
                deleteContent.style.display = "none";
              }
         
              cancelor.onclick = function() {
                deleteContent.style.display = "none";
              }
            }
          }
      }
    }
  }
  newList.addEventListener('dblclick', function(){   //function to delete the created newlist
    addedTask.removeChild(newList);
    panelTitle.innerHTML = "Tasks";
    panelSubtask[0].style.display = "block";
    toggleUpperImages.removeChild(img);
  });
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