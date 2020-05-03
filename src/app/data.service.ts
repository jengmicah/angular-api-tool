import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:5000/api/";
  private QUERY = "querymetadata/video";
  private INGEST = "ingestmetadata";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  public sendGetRequest(path: string) {
    return this.httpClient.get<any>(this.REST_API_SERVER + this.QUERY + path, { observe: "response" }).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res);
    }));
  }
  public sendPostRequest(path: string, postData: object) {
    return this.httpClient.post<any>(this.REST_API_SERVER + this.INGEST + path, postData).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res);
    }));
  }
}