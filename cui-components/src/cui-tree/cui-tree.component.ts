import {
	Component,
	DoCheck,
	EventEmitter,
	Input,
	IterableDiffer,
	IterableDiffers,
	KeyValueDiffer,
	KeyValueDiffers,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { CuiTreeOptions } from './cui-tree-options';
import { each, forOwn, findIndex, isNil, sortBy } from 'lodash-es';

@Component({
	selector: 'cui-tree',
	templateUrl: './cui-tree.component.html',
	styleUrls: ['./cui-tree.component.scss'],
})
/**
 * Component for a CiscoUI tree
 */
export class CuiTreeComponent implements DoCheck, OnInit, OnChanges {
	public tableExpanded = false;

	@Input() options: CuiTreeOptions;
	@Input() data: any[];

	@Output() onToggleExpand: EventEmitter<any> = new EventEmitter();
	@Output() onItemClick: EventEmitter<any> = new EventEmitter();
	@Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();
	optionsDiffer: KeyValueDiffer<any, any>;
	dataDiffer: IterableDiffer<any>;
	dataElemDiffers: { [key: string]: KeyValueDiffer<any, any> } = {};
	rows: any[];
	hasChildren = false;
	allSelected = false;

	constructor (
		private kvDiffers: KeyValueDiffers,
		iDiffers: IterableDiffers,
	) {
		this.optionsDiffer = kvDiffers.find({}).create();
		this.dataDiffer = iDiffers.find([]).create();
		this.setDiffers();
	}

	ngDoCheck () {
		// check to see if elements have been added or removed on the data array
		const dataChanges = this.dataDiffer.diff(this.data);
		if (!isNil(dataChanges)) {
			// remove all current differs, in case elements were removed
			this.dataElemDiffers = {};
			// re-initialize the deep differs
			this.setDiffers();

			return this.initData();
		}
		// check to see if the options have changed
		const optionsChanges = this.optionsDiffer.diff(this.options);
		if (!isNil(optionsChanges)) { return this.initData(); }
		// check key/value differs for each element in data array
		// last because most expensive change detection
		let dataElemChanges = false;
		each(this.data, d => {
			const differ = this.dataElemDiffers[d[this.options.idKey]];
			const elemChanges = differ ? differ.diff(d) : null;
			if (!isNil(elemChanges)) {
				dataElemChanges = true;
			}
		});
		if (dataElemChanges) { this.initData(); }
	}

	ngOnInit () {
		if (this.options && this.data) {
			this.initData();
		}
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes.data || changes.options) {
			this.initData();
		}
	}

	public initData (): void {
		if (!isNil(this.data) && !this.hasDuplicateIds(this.data)) {
			this.allSelected = this.data.every(this.allSelectedCheck.bind(this));
			this.hasChildren = this.data.some((item: any) => !isNil(item[this.options.parentKey]));
			this.rows = this.getTree(this.data) || [];
			this.rows
				.filter(row => row[this.options.expandedKey])
				.forEach(row => this.expandAtNode(this.rows, row[this.options.idKey]));
			this.tableExpanded = this.checkTableExpandStatus(this.rows, true);
		} else {
			this.rows = [];
			console.error('Tree Data Contains Duplicate IDs. Node IDs must be unique.');
		}
	}

	setDiffers () {
		each(
			this.data,
			d => this.dataElemDiffers[d[this.options.idKey]] = this.kvDiffers.find(d).create(),
		);
	}

	// emit event when node is clicked
	public clickTreeNode (id: number): void {
		this.onItemClick.emit(id);
	}

	// show all elements of the tree
	public expandAll (tree: any): void {
		tree.forEach((node: any) => {
			node.show = true;
			if (node.isParent) {
				node[this.options.expandedKey] = true;
			}
		});
		this.onToggleExpand.emit(true);
	}

	// get root nodes and collapse if node is a parent
	public collapseAll (tree: any): void {
		const roots = this.getRootNodes(tree);

		roots.forEach((root: any) => {
			if (root.isParent) {
				this.collapseAtNode(tree, root[this.options.idKey]);
			}
		});
		this.onToggleExpand.emit(false);
	}

	// find immediate children and show them
	public expandAtNode (tree: any, id: string): void {
		// expand+show top node and show immediate children
		tree.forEach((node: any) => {
			if (node[this.options.idKey] === id) {
				node.show = true;
				node[this.options.expandedKey] = true;
			}
			if (node[this.options.parentKey] === id) {
				node.show = true;
			}
		});
	}

	// collapse recursively down the tree, starting at a particular item id
	public collapseAtNode (tree: any, id: string): void {
		// delete show property from top level and find subparents
		const subParents = tree.filter((node: any) => {
			if (node[this.options.idKey] === id) {
				// delete show property from top level during filter
				delete node[this.options.expandedKey];
			}
			if (node[this.options.parentKey] === id) {
				// found immediate children
				delete node.show;
				if (node.isParent) {
					node[this.options.expandedKey] = false;

					return true;
				}
			}

			return false;
		});

		if (subParents.length) {
			// found parents underneath collapse level, keep collapsing

			subParents.forEach((node: any) => {
				this.collapseAtNode(tree, node[this.options.idKey]);
			});
		}
	}

	public toggleItemExpanded (item: any): void {
		if (!item.isParent) { return; }
		if (!item[this.options.expandedKey]) {
			// expand
			this.expandAtNode(this.rows, item[this.options.idKey]);
			if (this.checkTableExpandStatus(this.rows, true)) {
				// all became expanded- set tableExpanded
				this.tableExpanded = true;
				this.onToggleExpand.emit(true);
			}
		} else {
			// collapse
			this.collapseAtNode(this.rows, item[this.options.idKey]);
			if (this.checkTableExpandStatus(this.rows, false)) {
				// all became collapsed- set tableExpanded
				this.tableExpanded = false;
				this.onToggleExpand.emit(false);
			}
		}
	}

	public toggleExpandAll (): void {
		this.tableExpanded = !this.tableExpanded;

		if (this.tableExpanded) {
			// expand all
			this.expandAll(this.rows);
		} else {
			// collapse all
			this.collapseAll(this.rows);
		}
	}

	// get placeholder elements
	public placeholder (n: number): any[] {
		const array = [];
		for (let i = 0, il = n; i < il; i += 1) {
			array.push(undefined);
		}

		return array;
	}

	// get root nodes
	public getRootNodes (tree: object[]) {
		const rootNodes = tree.filter((item: any) => !item[this.options.parentKey]);

		return this.options.sortByKey ? sortBy(rootNodes, this.options.sortByKey) : rootNodes;
	}

	// for a given set of input data nodes,
	// return a sorted and structured array for rendering a hierarchical view of the data
	// initialized with root nodes visible
	// sibling group order preserved from original data
	public getTree (data: object[]): object[] {
		let depth = 0;
		let sortedTree: object[] = [];
		let totalItems = 0;

		let nodes: any = this.getRootNodes(data);

		// init with root nodes visible
		nodes.forEach((node: any) => {
			totalItems += 1;
			node.show = true;
		});

		// start a sorted tree array with root nodes
		sortedTree = sortedTree.concat(nodes);

		do {
			// store depth on all nodes and get ids for filtering
			const nodeIds: any = [];
			nodes.forEach((node: any) => {
				node.depth = depth;
				nodeIds.push(node[this.options.idKey]);
			});

			// filter input data to get next layer of nodes, by parent id
			nodes = data.filter((item: any) => {
				const parentIndex: number = nodeIds.indexOf(item[this.options.parentKey]);
				// found parent id
				if (parentIndex > -1) {
					nodes[parentIndex].isParent = true;

					return true;
				}

				return false;
			});

			// group siblings by parent id to preserve original order
			const groups: any = {};
			nodes.forEach((node: any) => {
				if (node[this.options.parentKey]) {
					if (!groups[node[this.options.parentKey]]) {
						groups[node[this.options.parentKey]] = [];
					}
					groups[node[this.options.parentKey]].push(node);
				}
			});

			this.sortTree(groups);

			// insert each sibling group under its parent in the sorted tree,
			// preserving sibling order
			for (const key in groups) {
				if (groups.hasOwnProperty(key)) {
					// try to find a parent in sortedTree
					const insertIndex = findIndex(
						sortedTree,
						(item: any) => item[this.options.idKey] === key,
					);

					// see if group has a parent in the tree, if so, splice
					if (insertIndex > -1) {
						// if parent is in tree, splice siblings into tree at parent index + 1
						const spliceArgs = [insertIndex + 1, 0].concat(groups[key]);
						Array.prototype.splice.apply(sortedTree, spliceArgs);
					}
				}
			}

			totalItems += nodes.length;
			depth += 1;

		} while (nodes.length > 0 && totalItems <= data.length);


		each(sortedTree, (node: any) => {
			if (!node.isParent) {
				node.expanded = false;
			}
		});

		return sortedTree;
	}

	// check for duplicate ids in tree items
	public hasDuplicateIds (tree: object[]): boolean {
		const treeArray = tree.map((node: any) => node[this.options.idKey]);

		return treeArray.some((item, index) => treeArray.indexOf(item) !== index);
	}

	// return parent nodes from tree, or false if there are none
	public getParentNodes (tree: object[]): object[] {
		const parentNodes: object[] = tree.filter((node: any) => node.isParent);

		if (!parentNodes.length) {
			// no parent nodes
			return null;
		}

		return parentNodes;
	}

	// check if all elements are expanded or collapsed
	public checkTableExpandStatus (tree: object[], expand: boolean): boolean {
		const parentNodes = this.getParentNodes(tree);

		if (parentNodes) {
			// got parent nodes
			if (expand) {
				// checking after expanding item
				return parentNodes
					.every((node: any) => node[this.options.expandedKey]);
			}
			// checking after collapsing item
			// check if all parentNodes do not have expanded property

			return parentNodes
				.every((node: any) => !node[this.options.expandedKey]);
		}

		return null;
	}

	/**
	 * Toggles selection of all items
	 */
	toggleAllSelected () {
		this.allSelected = !this.allSelected;
		for (const item of this.rows) {
			if (
				// selectableMix restricts some rows from being selectable
				(!this.options.selectableMix || item[this.options.selectableKey]) &&
				// if the checkbox is disabled, don't mess with it
				!item[this.options.checkboxDisabled]
			) {
				item.selected = this.allSelected;
			}
		}
		this.tableExpanded = true;
		this.expandAll(this.rows);

		this.onSelectionChanged.emit(this.rows.filter(row => row.selected));
	}

	onItemSelectedChange () {
		this.onSelectionChanged.emit(this.rows.filter(row => row.selected));
		this.allSelected = this.data.every(this.allSelectedCheck.bind(this));
	}

	allSelectedCheck (item: any) {
		if (
			// if using selectableMix and the item is not selectable
			this.options.selectableMix && !item[this.options.selectableKey] ||
			// or if the checkbox is disabled
			item[this.options.checkboxDisabled]
		) {
			// skip over items that can't be selected
			return true;
		}

		return item.selected;
	}

	sortTree (groups: any) {
		if (this.options.sortByKey) {
			forOwn(groups, (value: any[], key: string) => {
				groups[key] = sortBy(value, this.options.sortByKey);
			});
		}
	}
}
