export class LocalStorage {
    save(key, data) {
        console.log(data)
        localStorage.setItem(key, JSON.stringify(data))
    }

    get(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}