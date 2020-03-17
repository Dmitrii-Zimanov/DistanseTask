"use strict";

let addInput = document.getElementById("newTodoValue");
let addButton = document.getElementById("button-addon1");
let checkedList = [];

addButton.addEventListener("click", addTodo);

addInput.addEventListener("keypress", function(event) {
   if(event.code === "Enter") {
      addTodo();
   }
});




function addTodo() {
   let toDo = addInput.value;
   if(toDo === "") return;

   let list = document.createElement("li");
   list.className = "list-group-item";

   let form = document.createElement("form");

   let div = document.createElement("div");
   div.className = "input-group-text";

   let input = document.createElement("input");
   input.type = "checkbox";

   let p = document.createElement("p");

   p.className = "todoText";
   p.innerText = toDo;

   p.addEventListener("dblclick", function(event) {

      let inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.style.width = p.clientWidth + "px";
      inputEdit.style.height = p.clientHeight + 2 + "px";
      inputEdit.style.display = "inline-block";
      inputEdit.className = "editArea";

      p.style.display = "none";

      inputEdit.value = p.innerText;

      p.before(inputEdit);
      inputEdit.focus();


      inputEdit.addEventListener("keypress", function (event) {
         let key = event.code;
         if(key === "Enter") {
            inputEdit.removeEventListener("blur", endEdit);
            p.innerText = inputEdit.value;
            endEdit();
         }
      });

      inputEdit.addEventListener("blur", endEdit);

      function endEdit() {
         inputEdit.remove();
         p.style.display = "inline-block";
      }

   });

   input.addEventListener("click", function() {
      if(input.checked) {
         p.setAttribute("isChecked", "true");
         checkedList.push(list);

         if (checkedList.length === 1) {
            addDelButton();
         }

      } else {
         p.removeAttribute("isChecked");
         checkedList.splice(checkedList.indexOf(list), 1);

      }

      checkDelButton();
   });

   let button = document.createElement("button");
   button.type = "button";
   button.className = "close";

   button.addEventListener("click", function() {
      if(checkedList.includes(list)) {
         checkedList.splice(checkedList.indexOf(list), 1);
         checkDelButton();
      }

      list.remove();
   });

   let span = document.createElement("span");
   span.insertAdjacentHTML("afterbegin", "&times;");

   document.getElementById("todoList").append(list);
   list.append(div);
   div.append(input);
   list.append(p);
   list.append(button);

   button.append(span);
   addInput.value = "";
}

function addDelButton() {
   let button = document.createElement("button");
   button.type = "button";
   button.className = "btn btn-outline-dark";
   button.classList.add("clearFix");
   button.id = "delButton";

   button.addEventListener("click", delChecked);

   document.getElementById("todoList").after(button);
}

function removeDelButton() {
   document.getElementById("delButton").remove();
}

function checkDelButton() {
   if(checkedList.length === 0) {
      removeDelButton();
      return;
   }
   document.getElementById("delButton").innerHTML = `Delete ${checkedList.length} completed tasks`;

}

function delChecked(todo) {
   checkedList.forEach(item => item.remove());
   checkedList.length = 0;
   checkDelButton();
}

