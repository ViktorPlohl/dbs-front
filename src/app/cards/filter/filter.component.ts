import { Component } from '@angular/core';
import { FilterService } from '@shared/filter.service';
import { FilterDialogComponent } from '@app/filter-dialog/filter-dialog.component';
import { CardService } from '@shared/card.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { BreakepointService } from '@shared/breakepoint.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  form: FormGroup<{ searchText: FormControl<string | null | undefined> }>;

  isSmallScreen: boolean = false;

  constructor(
    private cardService: CardService,
    public filterService: FilterService,
    private breakpointService: BreakepointService,
    private dialog: MatDialog
  ) {
    this.form = new FormGroup<{ searchText: FormControl<string | null | undefined> }>({
      searchText: new FormControl(this.filterService.selectedFilters$.value.searchText),
    });

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((form) =>
      this.filterService.selectedFilters$.next({
        ...this.filterService.selectedFilters$.value,
        searchText: form.searchText,
      })
    );

    breakpointService.breakpoint$.subscribe((breakpoint) => {
      this.isSmallScreen = breakpoint.Small || breakpoint.XSmall;
    });
  }

  clearSearchText() {
    this.form.controls.searchText.setValue('');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '1200px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
