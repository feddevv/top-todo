import { ProjectManager } from "../modules/ProjectManager.js"
import Task from "../modules/Task.js"
import Project from "../modules/Project.js"

let currentProjectId = 'default'

export const DOMController = (function() {
    function initEventListeners() {
        const addTask = document.querySelector('.add-task-btn')
        const sidebarUl = document.querySelector('.sidebar nav ul')
        const submitTaskForm = document.querySelector('.add-task-form')
        const cancelTaskBtn = document.querySelector('.add-task-form .cancel-btn')
        const addProjectBtn = document.querySelector('.add-project-btn')
        const newProjectDialog = document.querySelector('.new-project-dialog')
        const dialogCancelBtn = document.querySelector('.dialog-cancel-btn')
        const newProjectForm = document.querySelector('.new-project-form')
        const tasksContainer = document.querySelector('.tasks-container')
        const dialogEdit = document.getElementById('dialog-task-edit')
        const formEdit = document.querySelector('#dialog-task-edit form')
        const dialogDetail = document.getElementById('dialog-task-detail')

        tasksContainer.addEventListener('click', (e) => {
            const targetTask = e.target.closest('.task')
            if (e.target.matches('.task-edit') && targetTask) {
                const project = ProjectManager.getProject(targetTask.dataset.projectId)
                const task = project.getTask(targetTask.dataset.taskId)
                dialogEdit.dataset.taskId = targetTask.dataset.taskId
                dialogEdit.dataset.projectId = targetTask.dataset.projectId

                document.getElementById('task-edit-title').value = task.title
                document.getElementById('task-edit-description').value = task.description
                document.getElementById('task-edit-due-date').value = task.dueDate
                document.getElementById('task-edit-priority').value = task.priority.toLowerCase()
                dialogEdit.showModal()
            }
            else if (e.target.matches('.task-delete') && targetTask) {
                const taskId = targetTask.dataset.taskId
                const projectId = targetTask.dataset.projectId

                const project = ProjectManager.getProject(projectId)
                project.deleteTask(taskId)
                if (currentProjectId === 'default') {
                    renderAllTasks(ProjectManager.getProjects())
                    renderProjects(ProjectManager.getProjects())
                    return
                }
                const currentProject = ProjectManager.getProject(currentProjectId)
                renderTasks(currentProject.tasks)
                renderProjects(ProjectManager.getProjects())
            }
        })

        tasksContainer.addEventListener('click', (e) => {
            const taskEl = e.target.closest('.task')
            if (!taskEl || e.target.closest('.task-edit') || e.target.closest('.task-delete') || e.target.closest('input[type="checkbox"]')) return

            const project = ProjectManager.getProject(taskEl.dataset.projectId)
            const task = project.getTask(taskEl.dataset.taskId)

            dialogDetail.querySelector('.task-dialog-title').textContent = task.title
            const priorityEl = dialogDetail.querySelector('.task-priority')
            priorityEl.textContent = task.priority
            priorityEl.className = `task-priority ${task.priority.toLowerCase()}`
            dialogDetail.querySelector('.task-dialog-description').textContent = task.description || 'No description'
            dialogDetail.querySelector('#detail-due-date').textContent = task.dueDate || 'Not set'
            dialogDetail.querySelector('#detail-project').textContent = project.name

            dialogDetail.showModal()
        })

        formEdit.addEventListener('submit', (e) => {
            const data = Object.fromEntries(new FormData(e.target))
            const taskId = dialogEdit.dataset.taskId
            const projectId = dialogEdit.dataset.projectId
            const project = ProjectManager.getProject(projectId)

            project.editTask(taskId, data['task-edit-title'], data['task-edit-description'], data['task-edit-due-date'], data['task-edit-priority'])
            
            dialogEdit.removeAttribute('data-task-id')
            dialogEdit.removeAttribute('data-project-id')
            if (currentProjectId === 'default') {
                return renderAllTasks(ProjectManager.getProjects())
            }

            renderTasks(project.tasks)
        })


        addTask.addEventListener('click', (e) => {
            const form = document.querySelector('.add-task-form')
            form.classList.toggle('hidden')
            renderSelectProjects(ProjectManager.getProjects())
        })

        sidebarUl.addEventListener('click', (e) => {
            const li = e.target.closest('.sidebar-item')
            if (!li) return

            const projectId = li.dataset.projectId
            currentProjectId = projectId
            if (projectId === 'default') {
                const projects = ProjectManager.getProjects()
                renderHeadline('Default')

                let tasks = projects.flatMap(el => el.tasks)

                renderTasks(tasks)
                return
            }

            const project = ProjectManager.getProject(projectId)
            renderHeadline(project.name)

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
            project.addTask(new Task(data['task-title'], data['task-description'], data['due-date'], data.priority, project.id))
            // If this is the default project, render everything
            if (currentProjectId === 'default') {
                console.log(currentProjectId)
                renderAllTasks(ProjectManager.getProjects())
            }
            else {
                const currentProject = ProjectManager.getProject(currentProjectId)
                renderTasks(currentProject.tasks)
            }

            renderProjects(ProjectManager.getProjects())
        })

        cancelTaskBtn.addEventListener('click', (e) => {
            submitTaskForm.reset()
            submitTaskForm.classList.add('hidden')
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

            let icon
            if (el.id !== 'default') {
                icon = createElement('span', {className: 'sidebar-icon', textContent: '\u2715'})
                icon.addEventListener('click', (e) => {
                    e.stopPropagation()
                    
                    ProjectManager.deleteProject(el.id)
                    if (el.id === currentProjectId || currentProjectId === 'default') {
                        currentProjectId = 'default'
                        renderAllTasks(ProjectManager.getProjects())
                        renderHeadline('Default')
                    }
                    renderProjects(ProjectManager.getProjects())
                })
            }

            const name = createElement('span', {className: 'sidebar-name', textContent: el.name})

            const quantity = el.id === 'default' 
                ? createElement('span', {className: 'sidebar-quantity', textContent: wholeQuantity})
                : createElement('span', {className: 'sidebar-quantity', textContent: el.tasks.length})

            const append = [quantity, name]
            if (icon) append.push(icon)
            li.append(...append)
            ul.appendChild(li)
        })
    }

    function renderHeadline(name) {
        document.querySelector('.main-headline h2').textContent = name
    }

    function renderAllTasks(projects) {
        const tasks = projects.flatMap(el => el.tasks)
        renderTasks(tasks)
    }

    function renderTasks(tasks) {
        const tasksContainer = document.querySelector('.tasks-container')
        tasksContainer.innerHTML = ''

        tasks.forEach(el => {
            const task = createElement('div', {className: `task ${el.priority.toLowerCase()}`, 'data-task-id': el.id, 'data-project-id': el.projectId})

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