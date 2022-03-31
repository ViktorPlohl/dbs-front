import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardGridContainerComponent } from '@app/cards/views/grid/card-grid-container.component';
import { FilterDialogComponent } from '@app/filter-dialog/filter-dialog.component';
import { FilterComponent } from '@app/cards/filter/filter.component';
import { CardDetailDialogComponent } from '@app/card-detail-dialog/card-detail-dialog.component';
import { CardGridComponent } from '@app/cards/views/grid/card-grid/card-grid.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    CardsRoutingModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CardsComponent,
    FilterDialogComponent,
    CardGridContainerComponent,
    CardGridComponent,
    FilterComponent,
    CardDetailDialogComponent,
  ],
})
export class CardsModule {}
