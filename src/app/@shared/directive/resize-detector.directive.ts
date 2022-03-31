import { Directive, ElementRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter } from 'rxjs/operators';
import { ElementDimension } from '../../../types/element-dimension.enum';
import { ElementDimensions } from '../../../types/element-dimension.type';

@Directive({
  selector: '[appResizeDetectorDirective]',
})
export class ResizeDetectorDirective implements OnInit, OnDestroy {
  @Input() set debounce(value: number) {
    this._debounce = value;
    this._syncElementDimensions();
  }

  @Input() set delay(value: number) {
    this._delay = value;
    this._syncElementDimensions();
  }

  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this._syncElementDimensions();
  }

  @Input() set distinctUntilChanged(value: ElementDimension | ElementDimension[]) {
    this._distinctUntilChanged = value;
  }

  @Output() dimensionsChange: Subject<ElementDimensions> = new Subject<ElementDimensions>();

  private _debounce: number = 0;
  private _delay: number = 0;
  private _disabled: boolean = false;
  private _distinctUntilChanged: ElementDimension | ElementDimension[] = [];
  private _resizeObserver!: ResizeObserver | MutationObserver;
  private _oldDimensionsString: string = '';
  private _elementDimensions$ = new Subject<ElementDimensions>();
  private _elementDimensionsSubscription!: Subscription;

  constructor(private _host: ElementRef<HTMLElement>) {
    this._distinctionComparator = this._distinctionComparator.bind(this);
  }

  ngOnInit() {
    this._syncElementDimensions();
    this._attachObserverToElement();
  }

  ngOnDestroy() {
    this._disconnectAttachedObserver();
  }

  private _syncElementDimensions() {
    this._elementDimensionsSubscription?.unsubscribe();
    this._elementDimensionsSubscription = this._elementDimensions$
      .pipe(
        debounceTime(this._debounce),
        delay(this._delay),
        filter((_) => !this._disabled),

        distinctUntilChanged(this._distinctionComparator)
      )
      .subscribe((dimensions: ElementDimensions) => this.dimensionsChange.next(dimensions));
  }

  private _attachObserverToElement() {
    const isResizeObserverSupported = window.hasOwnProperty('ResizeObserver');
    if (isResizeObserverSupported) {
      this._resizeObserver = new ResizeObserver(this._validateElementChanges.bind(this));
      this._resizeObserver.observe(this._host.nativeElement);
    } else {
      this._resizeObserver = new MutationObserver((mutations) =>
        mutations.forEach((_) => this._validateElementChanges())
      );
      this._resizeObserver.observe(this._host.nativeElement, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  }

  private _validateElementChanges() {
    const element: HTMLElement = this._host.nativeElement;
    const newDimensionsString =
      element.offsetWidth.toString() +
      element.clientWidth.toString() +
      element.offsetHeight.toString() +
      element.clientHeight.toString();

    // Check if dimensions are changed as compared to previous one.
    if (this._oldDimensionsString !== newDimensionsString) {
      this._elementDimensions$.next({
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
      });
    }

    // Update old dimensions string.
    this._oldDimensionsString = newDimensionsString;
  }

  private _disconnectAttachedObserver() {
    this._resizeObserver?.disconnect();
  }

  private _distinctionComparator(oldDimensions: ElementDimensions, newDimensions: ElementDimensions) {
    const isArray = (item: any) => typeof item === 'object' && item.hasOwnProperty('length');

    const testKeys: ElementDimension[] = isArray(this._distinctUntilChanged)
      ? (this._distinctUntilChanged as ElementDimension[])
      : [this._distinctUntilChanged as ElementDimension];
    let mappedOldDimensions: Partial<ElementDimensions> = {};
    let mappedNewDimensions: Partial<ElementDimensions> = {};
    if (testKeys.length) {
      testKeys.forEach((testKey) => {
        mappedOldDimensions[testKey] = oldDimensions[testKey];
        mappedNewDimensions[testKey] = newDimensions[testKey];
      });
    } else {
      mappedOldDimensions = { ...oldDimensions };
      mappedNewDimensions = { ...newDimensions };
    }
    return JSON.stringify(mappedOldDimensions) === JSON.stringify(mappedNewDimensions);
  }
}
