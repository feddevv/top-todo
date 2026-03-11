import { LocalStorage } from "./LocalStorage.js"

export class StorageController {
    constructor(method) {
        this.method = method
    }

    save(key, data) {
        this.method.save(key, data)
    }

    get(key) {
        return this.method.get(key)
    }
}

export const storage = new StorageController(new LocalStorage())