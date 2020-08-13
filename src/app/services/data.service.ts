import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class DataService implements OnDestroy {
  // properties
  private _API = environment.api_url;
  private _TOTALL_NOT_AN_API_KEY = environment.totally_not_an_API_key;

  constructor(private http: HttpClient) {}

  getData(page: string = "1"): Observable<any> {
    return this.http
      .get(
        this._API.concat(`?page=${page}&per_page=5`),
        this.getHeaderOptions()
      )
      .pipe(
        untilDestroyed(this),
        map((data: any) => {
          return data
            .map((r) => {
              return {
                id: r.id,
                alt_description: r.alt_description,
                created_at: r.created_at.substring(0, 4),
              };
            })
            .filter((r) => r.alt_description);
        }),
        catchError(async (error: any) => {
          console.log('error', error);
        })
      );
  }

  getHeaderOptions(
    bIncludeAuthToken: boolean = true,
    bSkipContentType: boolean = false
  ): any {
    const headerJson = {};
    headerJson['Authorization'] = `Client-ID ${this._TOTALL_NOT_AN_API_KEY}`;
    headerJson['content-type'] = 'application/json;charset=utf-8';
    const opts = { headers: headerJson };
    return opts;
  }

  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}
