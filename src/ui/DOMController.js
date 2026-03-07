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
            const option = document.createElement('option')
            option.value = el.id
            option.textContent = el.name

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
            const li = document.createElement('li')
            li.className = 'sidebar-item'
            li.tabIndex = 0

            const icon = document.createElement('span')
            icon.className = 'sidebar-icon'

            const name = document.createElement('span')
            name.className = 'sidebar-name'
            name.textContent = el.name

            const quantity = document.createElement('span')
            quantity.className = 'sidebar-quantity'
            quantity.textContent = el.tasks.length

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