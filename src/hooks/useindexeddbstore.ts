import { useEffect, useRef } from "react";

const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
] as const;

export default function useIndexedDBStore({
  dbName: name,
  dbVersion: version = 1,
  storeName,
  storeParams = undefined,
  transactionMode = 'readwrite',
}: {
  dbName: string;
  dbVersion?: number;
  storeName: string;
  storeParams?: IDBObjectStoreParameters|undefined;
  transactionMode: IDBTransactionMode;
}) {
  const indexedDB = useRef<IDBObjectStore>();
  useEffect(() => {
    const request = window.indexedDB.open(name, version);
    let db: IDBDatabase;
    request.onsuccess = (e) => {
      db = (e.target as IDBRequest)?.result as IDBDatabase;
      db.onerror = (e) =>
        console.error(
          `Database error: ${
            (e.target as unknown as Record<string, string>).errorCode as string
          }`
        );
      indexedDB.current = db.transaction('customers', 'readwrite').objectStore('customers');
    };

    request.onupgradeneeded = (e) => {
      db = (e.target as IDBRequest)?.result as IDBDatabase;
      db.onerror = (e) =>
        console.error(
          `Database Error: ${
            (e.target as unknown as Record<string, string>).errorCode as string
          }`
        );
      const customerObjectStore = db.createObjectStore(storeName, storeParams);
      customerObjectStore.transaction.oncomplete = () => {
        const actualObjectStore = db.transaction(storeName, transactionMode).objectStore(storeName);
        customerData.forEach(customer => {
          actualObjectStore.add(customer.name);
        });
      indexedDB.current = actualObjectStore;
      }
    };

    request.onerror = (e) => {
      alert(
        "An error occurred while connecting to indexedDB! Check console for error object"
      );
      console.dir(e);
    };

    return () => db?.close?.();
  }, [name, storeName, storeParams, transactionMode, version]);
  return indexedDB;
}