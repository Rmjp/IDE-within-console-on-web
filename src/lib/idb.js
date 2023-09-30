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