/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface Window {
	[key: string]: any;
	new (): Window; // tslint:disable-line
	prototype: Window;
}
