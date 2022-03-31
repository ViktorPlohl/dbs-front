import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ResizeDetectorDirective } from '@shared/directive/resize-detector.directive';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, TranslateModule, CommonModule, FormsModule],
  declarations: [LoaderComponent, ResizeDetectorDirective],
  exports: [LoaderComponent, ResizeDetectorDirective],
})
export class SharedModule {}
