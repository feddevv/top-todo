import './main.css'
import { ProjectManager } from './modules/ProjectManager.js'
import Project from './modules/Project.js';
import Task from './modules/Task.js';
import { DOMController } from './ui/DOMController.js';
import { rehydrate } from './utils/rehydration.js';

// const defaultProject = new Project('Default', 'default')
// ProjectManager.addProject(defaultProject)

// function addSeedData(manager) {
//     const project0 = new Project('DNU')
//     const tasks0 = [
//         new Task("Лаба з C++", "Реалізувати паттерн Singleton", "2026-03-12", "High", project0.id),
//         new Task("Вивчити Git", "Розібратися з merge conflicts", "2026-03-10", "Medium", project0.id),
//         new Task("Переглянути лекцію", "Тема: Web Components", "2026-03-09", "Low", project0.id)
//     ];

//     const project1 = new Project('The Odin Project');
//     const tasks1 = [
//         new Task("Todo List Project", "Реалізувати архітектуру з використанням модулів та класів", "2026-03-15", "High", project1.id),
//         new Task("LocalStorage", "Додати збереження стану додатку", "2026-03-16", "Medium", project1.id),
//         new Task("Webpacker/Asset Management", "Розібратися, як збирати проєкт через Webpack або Vite", "2026-03-20", "Low", project1.id)
//     ];

//     const project2 = new Project('Особисте');
//     const tasks2 = [
//         new Task("Купити продукти", "Хліб, молоко, кава", "2026-03-09", "Medium", project2.id),
//         new Task("Тренажерка", "Сьогодні день спини", "2026-03-09", "High", project2.id),
//         new Task("Прибрати в кімнаті", "Помити підлогу, витерти пил", "2026-03-11", "Low", project2.id)
//     ];

//     tasks0.forEach(el => project0.addTask(el))
//     tasks1.forEach(el => project1.addTask(el))
//     tasks2.forEach(el => project2.addTask(el))

//     manager.addProject(project0)
//     manager.addProject(project1)
//     manager.addProject(project2)
// }

// addSeedData(ProjectManager)

console.log(rehydrate())

DOMController.init()