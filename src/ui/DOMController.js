import { ProjectManager } from "../modules/ProjectManager.js"
import Task from "../modules/Task.js"
import Project from "../modules/Project.js"

export const DOMController = (function() {
    function initEventListeners() {
        const addTask = document.querySelector('.add-task-btn')
        const sidebarUl = document.querySelector('.sidebar nav ul')
        const submitTaskForm = document.querySelector('.add-task-form')
        const addProjectBtn = document.querySelector('.add-project-btn')
        const newProjectDialog = document.querySelector('.new-project-dialog')
        const dialogCancelBtn = document.querySelector('.dialog-cancel-btn')
        const newProjectForm = document.querySelector('.new-project-form')

        addTask.addEventListener('click', (e) => {
            const form = document.querySelector('.add-task-form')
            form.classList.toggle('hidden')
            renderSelectProjects(ProjectManager.getProjects())
        })

        sidebarUl.addEventListener('click', (e) => {
            const li = e.target.closest('.sidebar-item')
            if (!li) return

            const projectId = li.dataset.projectId
            submitTaskForm.dataset.projectId = projectId
            if (projectId === 'default') {
                const projects = ProjectManager.getProjects()
                let tasks = projects.flatMap(el => el.tasks)

                renderTasks(tasks)
                return
            }

            const project = ProjectManager.getProject(projectId)
            renderTasks(project.tasks)
        })

        addProjectBtn.addEventListener('click', () => {
            newProjectDialog.showModal()
        })

        dialogCancelBtn.addEventListener('click', () => {
            newProjectDialog.close()
        })

        newProjectForm.addEventListener('submit', (e) => {
            const name = newProjectForm.querySelector('#project-name').value.trim()
            if (!name) return

            const project = new Project(name)
            ProjectManager.addProject(project)
            renderProjects(ProjectManager.getProjects())
            newProjectForm.reset()
        })

        submitTaskForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const data = Object.fromEntries(new FormData(e.target))
            const project = ProjectManager.getProject(data.project)
            project.addTask(new Task(data['task-title'], data['task-description'], data['due-date'], data.priority))
            
            const currentProjectId = e.target.dataset.projectId
            // If this is the default project, render everything
            if (currentProjectId === 'default') {
                renderAllTasks(ProjectManager.getProjects())
            }
            else {
                const currentProject = ProjectManager.getProject(currentProjectId)
                renderTasks(currentProject.tasks)
            }

            renderProjects(ProjectManager.getProjects())
        })
    }

    function renderSelectProjects(projects) {
        const select = document.getElementById('select-project')

        projects.forEach(el => {
            const option = createElement('option', {value: el.id, textContent: el.name})

            select.appendChild(option)
        })
    }

    function renderProjects(projects) {
        const ul = document.querySelector('.sidebar nav ul')
        ul.innerHTML = ''
        let wholeQuantity = 0
        projects.forEach(el => {
            wholeQuantity += el.tasks.length
        })

        projects.forEach(el => {
            const li = createElement('li', {className: 'sidebar-item', tabIndex: 0, 'data-project-id': el.id})

            const icon = createElement('span', {className: 'sidebar-icon'})

            const name = createElement('span', {className: 'sidebar-name', textContent: el.name})

            let quantity;
            if (el.id === 'default') {
                quantity = createElement('span', {className: 'sidebar-quantity', textContent: wholeQuantity})
            }
            else quantity = createElement('span', {className: 'sidebar-quantity', textContent: el.tasks.length})

            li.append(icon, name, quantity)
            ul.appendChild(li)
        })
    }

    function renderAllTasks(projects) {
        const tasks = projects.flatMap(el => el.tasks)
        renderTasks(tasks)
    }

    function renderTasks(tasks) {
        const tasksContainer = document.querySelector('.tasks-container')
        tasksContainer.innerHTML = ''

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

    function init() {
        initEventListeners()
        renderProjects(ProjectManager.getProjects())
        
        const defaultProject = document.querySelector('.sidebar ul li[data-project-id="default"]')
        defaultProject.click()
    }

    return {
        init,
    }
}) ()

function createElement(tag, props = {}) {
    const element = document.createElement(tag)

    for (const [key, value] of Object.entries(props)) {
        if (key.startsWith('data-')) {
            element.setAttribute(key, value)
        }
        else {
            element[key] = value
        }
    }

    return element
}