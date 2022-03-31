import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '@shared/filter.service';
import { debounceTime } from 'rxjs';
import { SelectedFilterForm } from '../../types/selected-filter.type';
import { BreakepointService } from '@shared/breakepoint.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent {
  specialTraitList: string[];
  colorList: string[];
  powerList: string[];
  characterList: string[];
  seriesList: string[];
  skillList: string[];
  cardTypeList: string[];
  form: FormGroup<SelectedFilterForm>;

  isSmallScreen = false;

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    private filterService: FilterService,
    private breakpointService: BreakepointService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.specialTraitList = this.filterService.filterOptions$.value.specialTraits;
    this.colorList = this.filterService.filterOptions$.value.colors;
    this.powerList = this.filterService.filterOptions$.value.powerList;
    this.characterList = this.filterService.filterOptions$.value.characterList;
    this.seriesList = this.filterService.filterOptions$.value.seriesList;
    this.skillList = this.filterService.filterOptions$.value.skillList;
    this.cardTypeList = this.filterService.filterOptions$.value.cardTypeList;

    this.form = new FormGroup<SelectedFilterForm>({
      searchText: new FormControl(this.filterService.selectedFilters$.value.searchText),
      specialTraits: new FormControl(this.filterService.selectedFilters$.value.specialTraits),
      colors: new FormControl(this.filterService.selectedFilters$.value.colors),
      powerList: new FormControl(this.filterService.selectedFilters$.value.powerList),
      characters: new FormControl(this.filterService.selectedFilters$.value.characters),
      series: new FormControl(this.filterService.selectedFilters$.value.series),
      skills: new FormControl(this.filterService.selectedFilters$.value.skills),
      cardTypes: new FormControl(this.filterService.selectedFilters$.value.cardTypes),
    });

    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.filterService.selectedFilters$.next(value));

    breakpointService.breakpoint$.subscribe((breakpoint) => {
      this.isSmallScreen = breakpoint.Small || breakpoint.XSmall;
    });
  }

  onResetClick(): void {
    this.form.reset();
    //this.dialogRef.close();
  }

  clearSearchText() {
    this.form.controls.searchText.setValue('');
  }
}
