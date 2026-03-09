import './main.css'
import { ProjectManager } from './modules/ProjectManager.js'
import Project from './modules/Project.js';
import Task from './modules/Task.js';
import { DOMController } from './ui/DOMController.js';

function addSeedData(manager) {
    const project0 = new Project('DNU')
    const tasks0 = [
        new Task("Лаба з C++", "Реалізувати паттерн Singleton", "2026-03-12", "High"),
        new Task("Вивчити Git", "Розібратися з merge conflicts", "2026-03-10", "Medium"),
        new Task("Переглянути лекцію", "Тема: Web Components", "2026-03-09", "Low")
    ];

    const project1 = new Project('The Odin Project');
    const tasks1 = [
        new Task("Todo List Project", "Реалізувати архітектуру з використанням модулів та класів", "2026-03-15", "High"),
        new Task("LocalStorage", "Додати збереження стану додатку", "2026-03-16", "Medium"),
        new Task("Webpacker/Asset Management", "Розібратися, як збирати проєкт через Webpack або Vite", "2026-03-20", "Low")
    ];

    const project2 = new Project('Особисте');
    const tasks2 = [
        new Task("Купити продукти", "Хліб, молоко, кава", "2026-03-09", "Medium"),
        new Task("Тренажерка", "Сьогодні день спини", "2026-03-09", "High"),
        new Task("Прибрати в кімнаті", "Помити підлогу, витерти пил", "2026-03-11", "Low")
    ];

    tasks0.forEach(el => project0.addTask(el))
    tasks1.forEach(el => project1.addTask(el))
    tasks2.forEach(el => project2.addTask(el))

    manager.addProject(project0)
    manager.addProject(project1)
    manager.addProject(project2)
}

addSeedData(ProjectManager)

console.log(ProjectManager.getProjects())

DOMController.init()