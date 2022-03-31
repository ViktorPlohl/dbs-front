import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent<T> {
  @Input() control: FormControl<T[] | null | undefined> = new FormControl<T[] | null | undefined>([]);
  @Input() options: string[] = [];
  @Input() label: string = '';
}
