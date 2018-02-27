/**
 * Utility for generating globally unique IDs.
 */
export class Guid {
	/**
	 * Generates a globally unique ID.
	 * @return The generated Guid.
	 */
	static generate(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			const r = Math.floor(Math.random() * 16);
			let v = r;
			if (c === 'y') {
				v = r ? 3 : 8;
			}

			return v.toString(16);
		});
	}
}
