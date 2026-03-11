export class StorageController {
    constructor(method) {
        this.method = method
    }

    save(key, data) {
        this.method.save(key, data)
    }

    get(key) {
        this.method.get(key)
    }
}