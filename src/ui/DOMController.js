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
            const option = createElement('options', {value: el.id, textContent: el.name})

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

    return {
        initEventListeners,
        renderSelectProjects,
        renderProjects,
    }
}) ()

function createElement(tag, ...args) {
    const element = document.createElement(tag)

    for (const [key, value] of Object.entries(...args)) {
        element[key] = value
    }

    return element
}