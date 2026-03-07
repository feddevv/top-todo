export default class Project {
    #tasks = []

    constructor(name) {
        this.id = crypto.randomUUID()
        this.name = name
    }

    addTask(task) {
        this.#tasks.push(task)
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