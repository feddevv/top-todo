export default class Task {
    isDone = false
    constructor(title, description, dueDate, priority, projectId) {
        this.id = crypto.randomUUID()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.projectId = projectId
    }

    get isDone() {
        return this.isDone
    }

    toggleIsDone() {
        this.isDone = !this.isDone
    }
}