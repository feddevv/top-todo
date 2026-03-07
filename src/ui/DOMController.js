export const DOMController = (function() {
    function initEventListeners() {
        const addTask = document.querySelector('.add-task-btn')

        addTask.addEventListener('click', (e) => {
            const form = document.querySelector('.add-task-form')
            form.classList.toggle('hidden')
        })
    }

    function renderSelectProjects(projects) {
        const select = document.getElementById('select-project')
        select.innerHTML = '<option selected value="default">Default</option>'

        projects.forEach(el => {
            const option = createElement('option', {value: el.id, textContent: el.name})

            select.appendChild(option)
        })
    }

    function renderProjects(projects) {
        const ul = document.querySelector('.sidebar nav ul')
        ul.innerHTML = `<li class="sidebar-item" tabindex="0">
						<span class="sidebar-icon"></span>
						<span class="sidebar-name">Default</span>
						<span class="sidebar-quantity">3</span>
					</li>`

        projects.forEach(el => {
            const li = createElement('li', {className: 'sidebar-item', tabIndex: 0})

            const icon = createElement('span', {className: 'sidebar-icon'})

            const name = createElement('span', {className: 'sidebar-name', textContent: el.name})

            const quantity = createElement('span', {className: 'sidebar-quantity', textContent: el.tasks.length})

            li.append(icon, name, quantity)
            ul.appendChild(li)
        })
    }

    function renderTasks(tasks) {
        const tasksContainer = document.querySelector('.tasks-container')

        tasks.forEach(el => {
            const task = createElement('div', {className: `task ${el.priority.toLowerCase()}`})

            const taskLeft = createElement('div', {className: 'task-left'})
            const checkBoxLeft = createElement('input', {type: 'checkbox'})
            const taskInfoLeft = createElement('div', {className: 'task-info'})
            const title = createElement('p', {className: 'task-info-title', textContent: el.title})
            const description = createElement('p', {className: 'task-info-description', textContent: el.description})
            taskInfoLeft.append(title, description)
            taskLeft.append(checkBoxLeft, taskInfoLeft)

            const taskRight = createElement('div', {className: 'task-right'})
            const date = createElement('p', {className: 'task-date', textContent: el.dueDate})
            const priority = createElement('p', {className: `task-priority ${el.priority.toLowerCase()}`, textContent: el.priority})
            const editBtn = createElement('button', {className: 'task-edit', textContent: String.fromCharCode(9998)})
            const deleteBtn = createElement('button', {className: 'task-delete', textContent: String.fromCharCode(215)})

            taskRight.append(date, priority, editBtn, deleteBtn)

            task.append(taskLeft, taskRight)
            tasksContainer.appendChild(task)
        })
    }

    return {
        initEventListeners,
        renderSelectProjects,
        renderProjects,
        renderTasks
    }
}) ()

function createElement(tag, ...args) {
    const element = document.createElement(tag)

    for (const [key, value] of Object.entries(...args)) {
        element[key] = value
    }

    return element
}