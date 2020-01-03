import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiCallService
} from '../_services/apicall.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedules: any;
  forSearchSchedules: any;
  loading = true;

  constructor(private service: ApiCallService) {}

  ngOnInit() {
    this.getSchedule();
  }
  getSchedule() {
    this.service.getSchedule().subscribe(res => {
      this.schedules = res;
      this.loading=false;
      this.forSearchSchedules = res;

    });
  }
  SearchPlayer(userInput) {
    this.schedules = this.forSearchSchedules.filter(item => ((item.HomeTeamName) || (item.AwayTeamName)).toLowerCase().includes(userInput.toLowerCase()) ||  ((item.AwayTeamName)).toLowerCase().includes(userInput.toLowerCase()));
  }

}
