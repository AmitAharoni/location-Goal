import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public randomCoordinateRequest(position:any, radius:number, unit:string){
    const params = new HttpParams()
    .set('latitude', position.latitude)
    .set('longitude', position.longitude)
    .set('radius', radius)
    .set('unit', unit);
    return this.httpClient.get(`${this.REST_API_SERVER}/randomCoordinate`, { params: params });
  }
  
  public isGoalOccurs(position:any, goalDistance:number, unit:string){
    const params = new HttpParams()
    .set('latitude', position.latitude)
    .set('longitude', position.longitude)
    .set('goalDistance', goalDistance)
    .set('unit', unit);
    return this.httpClient.get(`${this.REST_API_SERVER}/isGoalOccurs`, { params: params });
  }

}

