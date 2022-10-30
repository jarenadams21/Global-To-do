import {v4 as uuidV4} from "uuid"

type Task = {

  id: string,
  user: string,
  title: string,
  completed: boolean,
  createdAt: Date
}
const list = document.querySelector('#list') as HTMLUListElement | null
const form = document.querySelector('#new-task-form') as HTMLFormElement | null
const input = document.querySelector('#new-task-title') as HTMLInputElement | null

const username = document.querySelector('#current-user') as HTMLInputElement || null
var userNameDisplay = document.getElementById("users-list")
var recentAction = document.getElementById("recent-action")

const tasks: Task[] = []
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {

  userNameDisplay.textContent = username.value
  tasks.filter( x => x.user == username.value) // TODO
  
})

form?.addEventListener("submit", e => {

  e.preventDefault()

  if (input?.value == "" || input?.value == null) return // ensures our input exists.

  var user: string
  if (username?.value == "" || username?.value == null) {
    user = "Guest"
  }

  else {

    user = username.value
  }

  const newTask: Task = {

    id: uuidV4(),
    user: user,
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  recentAction.textContent = username.value + " added: " + input.value
  console.log(newTask)

  // Add new task to list of tasks
  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task): void {

  const item: HTMLLIElement = document.createElement("li");
  const label: HTMLLabelElement = document.createElement("label")
  const checkbox: HTMLInputElement = document.createElement("input")
  checkbox.checked = task.completed
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    // Save to local storage
     saveTasks()
  })
  checkbox.type = "checkbox"
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)

}

function saveTasks() {

  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {

  const taskJSON = localStorage.getItem("TASKS")

  if(taskJSON == null) return []

  return JSON.parse(taskJSON)
}
