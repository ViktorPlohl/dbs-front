import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbsCard } from '../../../../types/card.interface';
import { FilterService } from '@shared/filter.service';
import { ElementDimension } from '../../../../types/element-dimension.enum';
import { ElementDimensions } from '../../../../types/element-dimension.type';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-card-grid-container',
  templateUrl: './card-grid-container.component.html',
  styleUrls: ['./card-grid-container.component.scss'],
})
export class CardGridContainerComponent {
  @Input() cardChunks: DbsCard[][] | null = [];
  @Input() isSmallScreen: boolean | undefined;

  @Output() selectCard: EventEmitter<DbsCard> = new EventEmitter<DbsCard>();

  itemsPerRow: number | undefined;

  ElementDimension = ElementDimension;

  cardWidth: string | undefined;
  cardHeight: number | undefined;

  constructor(public filterService: FilterService, public platform: Platform) {
    filterService.rowSize$.subscribe((itemsPerRow) => {
      if (itemsPerRow) {
        this.itemsPerRow = itemsPerRow;
        this.cardWidth = this.getCardWidth();
      }
    });
  }

  onDimensionChange(event: ElementDimensions) {
    this.cardHeight = this.getCardHeight(event.offsetWidth);
  }

  private getCardWidth(): string {
    return 100 / (this.itemsPerRow || 1) + '%';
  }

  private getCardHeight(offsetWidth: number): number {
    const scrollBarWidth = this.platform.ANDROID || this.platform.IOS ? 0 : 17;
    const B_div_A = 431.02 / 272.16;
    const C = (offsetWidth - scrollBarWidth) / (this.itemsPerRow || 1);
    return C * B_div_A;
  }
}
