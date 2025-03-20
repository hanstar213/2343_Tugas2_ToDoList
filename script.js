document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    document.getElementById("addButton").addEventListener("click", addTask);
});

function addTask() {
    let input = document.getElementById("todoInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    let taskList = document.getElementById("todoList");

    let li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <span class="edit" onclick="editTask(this)">✏️</span>
            <span class="delete" onclick="deleteTask(this)">❌</span>
        </div>
    `;

    taskList.appendChild(li);
    input.value = "";

    saveTasks();
}

function deleteTask(element) {
    element.parentElement.parentElement.remove();
    saveTasks();
}

function editTask(element) {
    let newText = prompt("Edit tugas:", element.parentElement.parentElement.firstChild.textContent);
    if (newText !== null && newText.trim() !== "") {
        element.parentElement.parentElement.firstChild.textContent = newText;
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#todoList li span:first-child").forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("todoList");

    tasks.forEach(taskText => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <span class="edit" onclick="editTask(this)">✏️</span>
                <span class="delete" onclick="deleteTask(this)">❌</span>
            </div>
        `;
        taskList.appendChild(li);
    });
}
