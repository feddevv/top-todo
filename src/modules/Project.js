export default class Project {
    #tasks = []

    constructor(name, id = crypto.randomUUID()) {
        this.id = id
        this.name = name
    }

    addTask(task) {
        this.#tasks.unshift(task)
    }

    deleteTask(taskId) {
        this.#tasks.forEach((el, index) => {
            if (el.id === taskId) {
                this.#tasks.splice(index, 1)
                return true
            }
        })
    }

    editTask(taskId, title, description, dueDate, priority) {
        this.#tasks.forEach(task => {
            if (task.id === taskId) {
                task.title = title
                task.description = description
                task.dueDate = dueDate
                task.priority = priority
            }
        })
    }

    get tasks() {
        return this.#tasks
    }

    getTask(taskId) {
        const task = this.#tasks.find(el => el.id === taskId)
        return task
    }
}