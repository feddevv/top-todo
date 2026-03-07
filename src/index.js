import './main.css'
import { ProjectManager } from './modules/ProjectManager.js'
import Project from './modules/Project.js';
import Task from './modules/Task.js';

function addSeedData(manager) {
    const project = new Project('DNU')
    const tasks = [
        new Task("Лаба з C++", "Реалізувати паттерн Singleton", "2026-03-12", "High"),
        new Task("Вивчити Git", "Розібратися з merge conflicts", "2026-03-10", "Medium"),
        new Task("Переглянути лекцію", "Тема: Web Components", "2026-03-09", "Low")
    ];

    tasks.forEach(el => project.addTask(el))

    manager.addProject(project)
}

addSeedData(ProjectManager)

console.log(ProjectManager.getProjects())