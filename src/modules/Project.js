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

    get tasks() {
        return this.#tasks
    }
}