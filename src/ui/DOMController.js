export const DOMController = (function() {
    function initEventListeners() {
        const addTask = document.querySelector('.add-task-btn')

        addTask.addEventListener('click', (e) => {
            const form = document.querySelector('.add-task-form')
            form.classList.toggle('hidden')
        })
    }

    function renderSelectProject(projects) {
        const select = document.getElementById('select-project')
        select.innerHTML = '<option selected value="default">Default</option>'

        projects.forEach(el => {
            const option = document.createElement('option')
            option.value = el.id
            option.textContent = el.name

            select.appendChild(option)
        })
    }

    return {
        initEventListeners,
        renderSelectProject
    }
}) ()