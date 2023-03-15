import { type FormEvent } from "react";
import { type NextPage } from "next";
import { useIndexedDB } from "~/hooks";

const IndexDb: NextPage = () => {
	const dbRef = useIndexedDB({ dbName: "MyIndexedDB", version: 1 });
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const db = dbRef.current as IDBDatabase;
		const { objectStoreNames } = db;
		if ([...objectStoreNames].length === 0) {
			// const store = db.transaction('customers', 'versionchange', { durability: 'default' })
			// console.info(store);
			// db.createObjectStore('customers', { autoIncrement: true });
		}
	};

	return (
		<>
			<h1 className="mt-4 text-center text-3xl font-black capitalize italic text-red-300 underline decoration-sky-500 antialiased">
				Indexed DB demo
			</h1>
			<form onSubmit={handleSubmit} className="mx-auto mt-8 w-6/12">
				<div>
					<label
						htmlFor="first_name"
						className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
					>
						First name
					</label>
					<input
						type="text"
						id="first_name"
						className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						placeholder="Mohammed"
						required
					/>
				</div>
				<div className="grid place-items-center">
					<input
						type="submit"
						title="Submit"
						className="mt-5 cursor-pointer border-2 border-green-300 bg-yellow-300  p-3"
					/>
				</div>
			</form>
		</>
	);
};

export default IndexDb;
