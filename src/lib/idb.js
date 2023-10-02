const dbName = "files";
export function connectIDB(dbName) {
    return new Promise((resolve, reject) => {
        let db;
        const request = indexedDB.open(dbName);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains("files")) {
                const objectStore = db.createObjectStore("files", { keyPath: "name" });
                objectStore.createIndex("name", "name", { unique: true });
                objectStore.createIndex("value", "name");
            }
        };

        request.onerror = (event) => {
            console.error("Error opening IndexedDB:", event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };
    });
}

export function getListNames(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["files"], "readonly");
        const objectStore = transaction.objectStore("name");
        const request = objectStore.getAllKeys();
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            console.error("Error getting list of names:", event.target.error);
            reject(event.target.error);
        };
    });
}

export function getValue(db, name) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["files"], "readonly");
        const objectStore = transaction.objectStore("files");
        const request = objectStore.get(name);
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            console.error("Error getting value:", event.target.error);
            reject(event.target.error);
        };
    });
}

export function addValue(db, name, value) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["files"], "readwrite");
        const objectStore = transaction.objectStore("files");
        const request = objectStore.add({ name, value });
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            console.error("Error adding value:", event.target.error);
            reject(event.target.error);
        };
    });
}

export function updateValue(db, name, value) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["files"], "readwrite");
        const objectStore = transaction.objectStore("files");
        const request = objectStore.put({ name, value });
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            console.error("Error updating value:", event.target.error);
            reject(event.target.error);
        };
    });
}

export function deleteValue(db, name) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["files"], "readwrite");
        const objectStore = transaction.objectStore("files");
        const request = objectStore.delete(name);
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            console.error("Error deleting value:", event.target.error);
            reject(event.target.error);
        };
    });
}