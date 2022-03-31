import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@app/form/select/select.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@app/form/input/input.component';

@NgModule({
  imports: [CommonModule, TranslateModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [SelectComponent, InputComponent],
  declarations: [SelectComponent, InputComponent],
})
export class InputModule {}
