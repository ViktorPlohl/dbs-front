import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DisplayEnum } from '../../types/display.enum';
import { Breakpoint } from '../../classes/breakpoint.class';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BreakepointService implements OnDestroy {
  public breakpoint$ = new BehaviorSubject<Breakpoint>(new Breakpoint());

  queryMap = new Map([
    [Breakpoints.XSmall, DisplayEnum.XSMALL],
    [Breakpoints.Small, DisplayEnum.SMALL],
    [Breakpoints.Medium, DisplayEnum.MEDIUM],
    [Breakpoints.Large, DisplayEnum.LARGE],
    [Breakpoints.XLarge, DisplayEnum.XLARGE],
    [Breakpoints.Handset, DisplayEnum.HANDSET],
    [Breakpoints.Tablet, DisplayEnum.TABLET],
    [Breakpoints.Web, DisplayEnum.WEB],
    [Breakpoints.HandsetPortrait, DisplayEnum.HANDSET_PORTRAIT],
    [Breakpoints.TabletPortrait, DisplayEnum.TABLET_PORTRAIT],
    [Breakpoints.WebPortrait, DisplayEnum.WEB_PORTRAIT],
    [Breakpoints.HandsetLandscape, DisplayEnum.HANDSET_LANDSCAPE],
    [Breakpoints.TabletLandscape, DisplayEnum.TABLET_LANDSCAPE],
    [Breakpoints.WebLandscape, DisplayEnum.WEB_LANDSCAPE],
  ]);

  destroyed = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web,
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.WebPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.WebLandscape,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => this.handleBreakpointChange(result));
  }

  handleBreakpointChange(breakpointState: BreakpointState) {
    const breakpoint: Breakpoint = new Breakpoint();
    _.reduce(
      breakpointState.breakpoints,
      (result, value, key) => {
        const queryName = this.queryMap.get(key);
        breakpoint.XSmall = (queryName === DisplayEnum.XSMALL && value) || breakpoint.XSmall;
        breakpoint.Small = (queryName === DisplayEnum.SMALL && value) || breakpoint.Small;
        breakpoint.Medium = (queryName === DisplayEnum.MEDIUM && value) || breakpoint.Medium;
        breakpoint.Large = (queryName === DisplayEnum.LARGE && value) || breakpoint.Large;
        breakpoint.XLarge = (queryName === DisplayEnum.XLARGE && value) || breakpoint.XLarge;
        breakpoint.Handset = (queryName === DisplayEnum.HANDSET && value) || breakpoint.Handset;
        breakpoint.Tablet = (queryName === DisplayEnum.TABLET && value) || breakpoint.Tablet;
        breakpoint.Web = (queryName === DisplayEnum.WEB && value) || breakpoint.Web;
        breakpoint.HandsetPortrait =
          (queryName === DisplayEnum.HANDSET_PORTRAIT && value) || breakpoint.HandsetPortrait;
        breakpoint.TabletPortrait = (queryName === DisplayEnum.TABLET_PORTRAIT && value) || breakpoint.TabletPortrait;
        breakpoint.WebPortrait = (queryName === DisplayEnum.WEB_PORTRAIT && value) || breakpoint.WebPortrait;
        breakpoint.HandsetLandscape =
          (queryName === DisplayEnum.HANDSET_LANDSCAPE && value) || breakpoint.HandsetLandscape;
        breakpoint.TabletLandscape =
          (queryName === DisplayEnum.TABLET_LANDSCAPE && value) || breakpoint.TabletLandscape;
        breakpoint.WebLandscape = (queryName === DisplayEnum.WEB_LANDSCAPE && value) || breakpoint.WebLandscape;
        return breakpoint;
      },
      new Breakpoint()
    );

    this.breakpoint$.next(breakpoint);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
