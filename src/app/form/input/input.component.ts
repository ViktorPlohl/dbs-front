import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() control: FormControl<string | null | undefined> = new FormControl<string | null | undefined>(null);
  @Input() label: string = '';
  @Output() clear: EventEmitter<void> = new EventEmitter();
}
