"use strict";
var _ = require('lodash');
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var order_by_1 = require('../../pipes/order-by');
var AlphaScroll = (function () {
    function AlphaScroll(elementRef, orderBy, content) {
        this.elementRef = elementRef;
        this.orderBy = orderBy;
        this.content = content;
        this.sortedItems = [];
        this.alphabet = [];
        this.letterIndicatorEle = document.createElement('div');
        this.letterIndicatorEle.className = 'ion-alpha-letter-indicator';
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(this.letterIndicatorEle);
    }
    AlphaScroll.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.indicatorWidth = _this.letterIndicatorEle.offsetWidth;
            _this.indicatorHeight = _this.letterIndicatorEle.offsetHeight;
            _this.setupHammerHandlers();
        });
    };
    AlphaScroll.prototype.ngOnChanges = function () {
        var _this = this;
        var sortedListData = this.orderBy.transform(this.listData, [this.key]);
        var groupItems = _.groupBy(sortedListData, function (item) {
            var letter = _.get(item, _this.key);
            return letter.toUpperCase().charAt(0);
        });
        this.sortedItems = this.unwindGroup(groupItems);
        this.alphabet = this.iterateAlphabet(groupItems);
    };
    AlphaScroll.prototype.ngOnDestroy = function () {
        if (this.letterIndicatorEle) {
            this.letterIndicatorEle.remove();
        }
        if (this.hammer) {
            this.hammer.destroy();
        }
    };
    AlphaScroll.prototype.setAlphaClass = function (alpha) {
        return alpha.isActive ? 'ion-alpha-active' : 'ion-alpha-invalid';
    };
    AlphaScroll.prototype.calculateDimensionsForSidebar = function () {
        return {
            top: this.content.contentTop + 'px',
            height: (this.content.getContentDimensions().contentHeight - 28) + 'px'
        };
    };
    AlphaScroll.prototype.alphaScrollGoToList = function (letter) {
        var ele = this.elementRef.nativeElement.querySelector("#scroll-letter-" + letter);
        if (ele) {
            this.content.scrollTo(0, ele.offsetTop);
        }
    };
    AlphaScroll.prototype.setupHammerHandlers = function () {
        var _this = this;
        var sidebarEle = this.elementRef.nativeElement.querySelector('.ion-alpha-sidebar');
        if (!sidebarEle)
            return;
        this.hammer = new Hammer(sidebarEle, {
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
            ]
        });
        this.hammer.on('panstart', function (e) {
            _this.letterIndicatorEle.style.top = ((window.innerHeight - _this.indicatorHeight) / 2) + 'px';
            _this.letterIndicatorEle.style.left = ((window.innerWidth - _this.indicatorWidth) / 2) + 'px';
            _this.letterIndicatorEle.style.visibility = 'visible';
        });
        this.hammer.on('panend pancancel', function (e) {
            _this.letterIndicatorEle.style.visibility = 'hidden';
        });
        this.hammer.on('panup pandown', _.throttle(function (e) {
            var closestEle = document.elementFromPoint(e.center.x, e.center.y);
            if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
                var letter = closestEle.innerText;
                _this.letterIndicatorEle.innerText = letter;
                var letterDivider = _this.elementRef.nativeElement.querySelector("#scroll-letter-" + letter);
                if (letterDivider) {
                    _this.content.scrollTo(0, letterDivider.offsetTop);
                }
            }
        }, 50));
    };
    AlphaScroll.prototype.unwindGroup = function (groupItems) {
        var result = [];
        for (var letter in groupItems) {
            result = result.concat([{ isDivider: true, letter: letter }].concat(groupItems[letter]));
        }
        return result;
    };
    AlphaScroll.prototype.iterateAlphabet = function (alphabet) {
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = [];
        for (var i = 0; i < str.length; i++) {
            var letter = str.charAt(i);
            var isActive = alphabet[letter] ? true : false;
            result.push({ letter: letter, isActive: isActive });
        }
        return result;
    };
    AlphaScroll.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-alpha-scroll',
                    template: "\n    <ion-list class=\"ion-alpha-list\">\n      <div *ngFor=\"let item of sortedItems\">\n        <ion-item-divider id=\"scroll-letter-{{item.letter}}\" *ngIf=\"item.isDivider\">{{item.letter}}</ion-item-divider>\n        <template [ngTemplateOutlet]=\"itemTemplate\" [ngOutletContext]=\"{'item': item, 'currentPageClass': currentPageClass}\" *ngIf=\"!item.isDivider\">\n        </template>\n      </div>\n    </ion-list>\n    <ul class=\"ion-alpha-sidebar\" [ngStyle]=\"calculateDimensionsForSidebar()\">\n      <li *ngFor=\"let alpha of alphabet\" [class]=\"setAlphaClass(alpha)\" tappable (click)=\"alphaScrollGoToList(alpha.letter)\">\n        <a>{{alpha.letter}}</a>\n      </li>\n    </ul>\n  "
                },] },
    ];
    AlphaScroll.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: order_by_1.OrderBy, },
        { type: ionic_angular_1.Content, decorators: [{ type: core_1.Host },] },
    ];
    AlphaScroll.propDecorators = {
        'listData': [{ type: core_1.Input },],
        'key': [{ type: core_1.Input },],
        'itemTemplate': [{ type: core_1.Input },],
        'currentPageClass': [{ type: core_1.Input },],
    };
    return AlphaScroll;
}());
exports.AlphaScroll = AlphaScroll;
//# sourceMappingURL=alpha-scroll.js.map