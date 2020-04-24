import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // public first: string = "";
  // public prev: string = "";
  // public next: string = "";
  // public last: string = "";
  
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
  
  public sendGetRequest(path: string){
    // return this.httpClient.get<Product[]>(this.REST_API_SERVER, {  params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
    return this.httpClient.get<any>(this.REST_API_SERVER + this.QUERY + path, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res);
      // console.log(res.headers.get('Link'));
      // this.parseLinkHeader(res.headers.get('Link'));
    }));
  }
  public sendPostRequest(path: string, postData: object){
    return this.httpClient.post<any>(this.REST_API_SERVER + this.INGEST + path, postData).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res);
    }));
  }

  // public sendGetRequestToUrl(url: string){
  //   return this.httpClient.get<JobAll[]>(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
  //     // console.log(res.headers.get('Link'));
  //     // this.parseLinkHeader(res.headers.get('Link'));
  //   }));
  // }
}