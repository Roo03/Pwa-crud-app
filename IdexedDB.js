import { openDB } from "idb";

const dbPromise = openDB("employeeDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("employees")) {
      db.createObjectStore("employees", { keyPath: "id" });
    }
  },
});

export async function saveEmployeeOffline(employee) {
  const db = await dbPromise;
  await db.put("employees", employee);
}

export async function getOfflineEmployees() {
  const db = await dbPromise;
  return await db.getAll("employees");
}

export async function deleteEmployeeOffline(id) {
  const db = await dbPromise;
  await db.delete("employees", id);
}
