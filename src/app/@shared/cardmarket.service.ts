import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardmarketService {
  API_KEY = '';

  constructor(private http: HttpClient) {}
}
