import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DbsCard } from '../../types/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public cards$ = new BehaviorSubject<DbsCard[]>([]);

  constructor(private http: HttpClient) {}

  public getDbsCards(): void {
    this.http.get<DbsCard[]>('/assets/data/cards.json').subscribe((result: DbsCard[]) => this.cards$.next(result));
  }
}
