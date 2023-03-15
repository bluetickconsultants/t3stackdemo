import { useEffect, useRef } from "react";

export default function useIndexedDB({
  dbName,
  version,
}: {
  dbName: string;
  version: number;
}) {
  const indexedDBRef = useRef<IDBDatabase>();

  useEffect(() => {
    const request = window.indexedDB.open(dbName, version);
    request.onsuccess = (e) => {
      const db = (e.target as IDBRequest)?.result as IDBDatabase;
      indexedDBRef.current = db;
    }
		request.onerror = (e) => {
			alert(e);
		}
    return () => indexedDBRef.current?.close();
  }, [dbName, version]);

  return indexedDBRef;
}
