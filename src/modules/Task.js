export default class Task {
    constructor(title, description, dueDate, priority, projectId) {
        this.id = crypto.randomUUID()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.projectId = projectId
    }
}