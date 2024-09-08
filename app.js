
const titleSetupWithSpans = () => {
  const mainTitleText = "Tasks Organizer";
  const mainTitleTextLength = mainTitleText.length;
  const mainTitleEl = document.querySelector("#main-title h2");
  for (let idx = 0; idx < mainTitleTextLength; idx++) {
      let letterEl = document.createElement("span");
      letterEl.textContent = mainTitleText[idx];
      mainTitleEl.append(letterEl);
  }
};

titleSetupWithSpans();


const uncompletedTaskList = document.querySelector("#uncompleted-tasks ul");
const completedTaskList = document.querySelector("#completed-tasks ul");
const addNewTaskForm = document.getElementById("task-form");
const backdrop = document.getElementById("backdrop");


const renderTodos = function () {
for (let idx = 0; idx < localStorage.length; idx++) {
  const taskItemEl = document.createElement("li");
  taskItemEl.draggable = true;
  taskItemEl.innerHTML = `
      <input type="checkbox" id="mark-task" />
      <p>${JSON.parse(localStorage.getItem(localStorage.key(idx))).task}</p>
          <button>DELETE</button>
      `;
  if (
    JSON.parse(localStorage.getItem(localStorage.key(idx))).isDone === true
  ) {
    completedTaskList.append(taskItemEl);
    taskItemEl.querySelector("p").style.textDecoration = "line-through";
    taskItemEl.querySelector('input[type="checkbox"]').checked = true;
  } else {
    uncompletedTaskList.append(taskItemEl);
    taskItemEl.querySelector("p").style.textDecoration = "none";
    taskItemEl.querySelector('input[type="checkbox"]').checked = false;
  }

  taskItemEl.id=localStorage.key(idx);
}
};

renderTodos();

//using the event delegation technique to apply click events
document.body.addEventListener("click", (event) => {

// return if the target was the parent element body
if (event.target.tagName === "BODY") {
  return;
}

// check if the event.target is button
if (event.target.tagName === "BUTTON") {
  if (event.target.id === "add-task") {
    event.preventDefault();
    const length = localStorage.length;
    backdrop.classList.toggle("visible");
    addNewTaskForm.classList.toggle("visible");

    //adding some validation to check if the value exists
    if (document.querySelector("#task").value) {
      localStorage.setItem(
        `task${length + 1}`,
        JSON.stringify({
          task: document.querySelector("#task").value,
          id: `task${length + 1}`,
          isDone: false,
        })
      );

      //fetching the localStorage and render items on the screen
      const taskElParent = document.querySelector("#uncompleted-tasks ul");
      const taskItemEl = document.createElement("li");
      taskItemEl.innerHTML = `
          <input type=checkbox id="mark-task"/>
          <p>${
            JSON.parse(
              localStorage.getItem(localStorage.key(`task${length + 1}`))
            ).task
          }</p>
          <button>DELETE</button>
          `;
          taskItemEl.id = `task${length + 1}`;
      taskElParent.append(taskItemEl);
    }

  }
  // renderTodos();
}

// check if the event.target is the create-new-button 
if (event.target.tagName === "DIV") {
  if (event.target.id === "create-new-task") {
    backdrop.classList.toggle("visible");
    addNewTaskForm.classList.toggle("visible");
  }
}

// event to delete the item from the local storage as well as from the UI
if (event.target.tagName === "BUTTON") {
  if (event.target.closest("li")) {
    event.target.closest("li").remove();
    localStorage.removeItem(event.target.closest('li').id);
  }
}


if (event.target.tagName === "INPUT") {
  if (event.target.id === "mark-task") {
    if (event.target.checked) {
      event.target.closest("li").querySelector("p")["style"]["text-decoration"] =
        "line-through";
      completedTaskList.append(event.target.closest("li"));
      localStorage.setItem(
        event.target.closest("li").id,
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem(localStorage.key(event.target.id))
          ),
          isDone: true,
        })
      );
      
    } else {
      event.target.closest("li").querySelector("p")["style"]["text-decoration"] =
        "none";
      uncompletedTaskList.append(event.target.closest("li"));
      localStorage.setItem(
        event.target.closest("li").id,
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem(localStorage.key(event.target.id))
          ),
          isDone: false,
        })
      );
     
    }
  }
}
});
