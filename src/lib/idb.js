const dbName = "files";
export function connectIDB(){
    let db;
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("files", { keyPath: "name" });
        // objectStore.createIndex("name", "name", { unique: false });
    };
    request.onerror = (event) => {
        console.error(event.targte);
    };
    request.onsuccess = (event) => {
        db = event.target.result;
    };
    return db;
}
