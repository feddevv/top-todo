import { storage } from "../data/StorageController.js"
import { rehydrate } from "../utils/rehydration.js"

export const ProjectManager = (function() {
    const projects = rehydrate() || []

    function addProject(project) {
        projects.push(project)
    }

    function deleteProject(projectId) {
        projects.forEach((el, index) => {
            if (el.id === projectId) {
                projects.splice(index, 1)
                return true
            }
        })
    }

    function getProjects() {
        return projects
    }

    function getProject(projectId) {
        return projects.find(el => el.id === projectId)
    }

    function delegateTask(taskId, from, to) {
        const fromProject = getProject(from)
        const toProject = getProject(to)
        const task = fromProject.getTask(taskId)
        fromProject.deleteTask(taskId)
        toProject.addTask(task)
    }

    return {
        addProject,
        deleteProject,
        getProjects,
        getProject,
        delegateTask
    }
})()