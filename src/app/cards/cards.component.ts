import { Component, OnDestroy, OnInit } from '@angular/core';

import { CardService } from '@shared/card.service';
import { DbsCard } from '../../types/card.interface';
import { Subject } from 'rxjs';
import { FilterService } from '@shared/filter.service';
import { FilterDialogComponent } from '@app/filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakepointService } from '@shared/breakepoint.service';
import { CardDetailDialogComponent } from '@app/card-detail-dialog/card-detail-dialog.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  cardChunks: DbsCard[][] | undefined;
  isSmallScreen = false;
  isHandSet = false;

  constructor(
    private cardService: CardService,
    public filterService: FilterService,
    private breakpointService: BreakepointService,
    private dialog: MatDialog
  ) {
    breakpointService.breakpoint$.subscribe((breakpoint) => {
      this.isSmallScreen = breakpoint.Small || breakpoint.XSmall;
    });
  }

  ngOnInit() {
    this.cardService.getDbsCards();
    this.cardService.cards$.subscribe(() => this.filterService.filter());
    this.filterService.selectedFilters$.subscribe(() => this.filterService.filter());
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '1200px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openCardDetailDialog(card: DbsCard): void {
    const dialogRef = this.dialog.open(CardDetailDialogComponent, {
      width: '500px',
      hasBackdrop: true,
      panelClass: 'card-detail-dialog',
      data: {
        card,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
