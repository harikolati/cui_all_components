import { DoCheck, EventEmitter, IterableDiffer, IterableDiffers, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CuiTreeOptions } from './cui-tree-options';
export declare class CuiTreeComponent implements DoCheck, OnInit, OnChanges {
    private kvDiffers;
    tableExpanded: boolean;
    options: CuiTreeOptions;
    data: any[];
    onToggleExpand: EventEmitter<any>;
    onItemClick: EventEmitter<any>;
    onSelectionChanged: EventEmitter<any>;
    optionsDiffer: KeyValueDiffer<any, any>;
    dataDiffer: IterableDiffer<any>;
    dataElemDiffers: {
        [key: string]: KeyValueDiffer<any, any>;
    };
    rows: any[];
    hasChildren: boolean;
    allSelected: boolean;
    constructor(kvDiffers: KeyValueDiffers, iDiffers: IterableDiffers);
    ngDoCheck(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    initData(): void;
    setDiffers(): void;
    clickTreeNode(id: number): void;
    expandAll(tree: any): void;
    collapseAll(tree: any): void;
    expandAtNode(tree: any, id: string): void;
    collapseAtNode(tree: any, id: string): void;
    toggleItemExpanded(item: any): void;
    toggleExpandAll(): void;
    placeholder(n: number): any[];
    getRootNodes(tree: object[]): object[];
    getTree(data: object[]): object[];
    hasDuplicateIds(tree: object[]): boolean;
    getParentNodes(tree: object[]): object[];
    checkTableExpandStatus(tree: object[], expand: boolean): boolean;
    /**
     * Toggles selection of all items
     */
    toggleAllSelected(): void;
    onItemSelectedChange(): void;
    allSelectedCheck(item: any): any;
    sortTree(groups: any): void;
}
