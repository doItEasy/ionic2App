import { OnInit, OnChanges, OnDestroy, ElementRef, TemplateRef } from '@angular/core';
import { Content } from 'ionic-angular';
import { OrderBy } from '../../pipes/order-by';
export declare class AlphaScroll implements OnInit, OnChanges, OnDestroy {
    private elementRef;
    private orderBy;
    private content;
    listData: any;
    key: string;
    itemTemplate: TemplateRef<Object>;
    currentPageClass: any;
    private letterIndicatorEle;
    private indicatorHeight;
    private indicatorWidth;
    private hammer;
    sortedItems: any;
    alphabet: any;
    constructor(elementRef: ElementRef, orderBy: OrderBy, content: Content);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    setAlphaClass(alpha: any): string;
    calculateDimensionsForSidebar(): {
        top: string;
        height: string;
    };
    alphaScrollGoToList(letter: any): void;
    private setupHammerHandlers();
    private unwindGroup(groupItems);
    private iterateAlphabet(alphabet);
}
