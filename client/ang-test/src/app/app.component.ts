import { Component, OnInit} from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'goal Location App';
  ballPosition:any = { };
  goalPosition:any = { };
  raduis = 1;
  raduisUnit = "kilometers";
  goalDistance = 10
  goalDistanceUnit = "meters";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getLocation();
    this.watchLocation();
  }
  
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  watchLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.updatePosition.bind(this), this.handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  handleError(error:any): void {
    let errorStr;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorStr = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorStr = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorStr = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        errorStr = 'An unknown error occurred.';
        break;
      default:
        errorStr = 'An unknown error occurred.';
    }
    console.error('Error occurred: ' + errorStr);
  }

  showPosition(position:any): void {
    this.ballPosition = { latitude:position.coords.latitude, longitude:position.coords.longitude};

    this.randomCoordinateRequest();
  }

  
  randomCoordinateRequest() : void {
    this.dataService.randomCoordinateRequest(this.ballPosition, this.raduis, this.raduisUnit)
    .subscribe((data: any)=>{
      console.log("GOAL pos: ", data);
      this.goalPosition = data.pos;
    })  
  }

  updatePosition(position:any): void {
    this.ballPosition = { latitude:position.coords.latitude, longitude:position.coords.longitude};
    console.log("BALL pos: ", this.ballPosition);

    this.dataService.isGoalOccurs(this.ballPosition, this.goalDistance, this.goalDistanceUnit)
    .subscribe((data: any)=>{
      if(data.resBool){
        if(confirm("GOAL!")){
          this.randomCoordinateRequest();          
        }
      }
    })
  }

}