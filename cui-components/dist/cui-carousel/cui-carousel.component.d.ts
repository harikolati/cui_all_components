import { TemplateRef } from '@angular/core';
export declare class CuiCarouselComponent {
    items: TemplateRef<any>[];
    data: any;
    indigo: boolean;
    itemIndex: number;
    gotoIndex(_index: number): void;
}
