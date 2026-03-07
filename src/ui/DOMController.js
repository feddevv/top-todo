export const DOMController = (function() {
    function initEventListeners() {
        const addTask = document.querySelector('.add-task-btn')

        addTask.addEventListener('click', (e) => {
            const form = document.querySelector('.add-task-form')
            form.classList.toggle('hidden')
        })
    }

    return {
        initEventListeners,
    }
}) ()