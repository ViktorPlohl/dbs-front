import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DbsCard } from '../../../../../types/card.interface';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardGridComponent {
  @Input() cardChunks: DbsCard[][] | null = [];
  @Input() isSmallScreen: boolean | undefined;
  @Input() cardWidth: string | undefined;
  @Input() cardHeight: number | undefined;
  @Input() itemsPerRow: number | undefined;
  @Output() selectCard: EventEmitter<DbsCard> = new EventEmitter<DbsCard>();
}
