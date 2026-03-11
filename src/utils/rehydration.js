import { storage } from "../data/StorageController.js";
import Project from "../modules/Project.js";
import Task from "../modules/Task.js";

export function rehydrate() {
    const rawData = storage.get('projects')

    if (!rawData || rawData.length === 0) return

    return rawData.map(project => {
        const newProject = new Project(project.name, project.id)

        project.tasks.forEach(task => {
            const newTask = new Task(task.title, task.description, task.dueDate, task.priority, task.projectId)
            newTask.isDone = task.isDone
            newProject.addTask(newTask)
        })

        return newProject
    })
}