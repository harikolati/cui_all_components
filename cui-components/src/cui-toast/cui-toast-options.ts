import { Guid } from '@cisco-ngx/cui-utils';

export class CuiToastOptions {
	/**
	 * Guid of the toast item
	 */
	public guid: Guid = Guid.generate();

	/**
	 * Toast padding (regular, compressed, loose)
	 */
	public padding = 'regular';
	/**
	 * Toast severity (info, success, warning, danger)
	 */
	public severity = 'info';
	/**
	 * The title to display in the toast
	 */
	public title: string;
	/**
	 * The message to display under the title
	 */
	public message: string;
	/**
	 * Whether the toast is showing in the bottom right corner
	 */
	public popped = true;

	/**
	 * Pops the toast with severity, title and message
	 * @param severity The severity of the toast
	 * @param title    The title to display
	 * @param message  The message to display
	 * @param padding  The padding of the toast
	 */
	constructor(severity: string, title: string, message: string, padding: string) {
		this.title = title || this.title;
		this.message = message || this.message;
		this.severity = severity || this.severity;
		this.padding = padding || this.padding;
		this.popped = true;
	}

	/**
	 * Updates the toast with severity, title and message
	 * @param severity The severity of the toast
	 * @param title    The title to display
	 * @param message  The message to display
	 */
	public update (severity: string, title: string, message: string) {
		this.title = title || this.title;
		this.message = message || this.message;
		this.severity = severity || this.severity;
	}

	/**
	 * Hides the toast
	 */
	public hide () {
		this.popped = false;
	}
}
