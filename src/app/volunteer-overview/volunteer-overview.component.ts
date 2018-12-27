import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';
import { ActivatedRoute } from '@angular/router';
import { Volunteer } from '../volunteer/volunteer.model';

@Component({
  selector: 'app-volunteer-overview',
  templateUrl: './volunteer-overview.component.html',
  styleUrls: ['./volunteer-overview.component.css']
})
export class VolunteerOverviewComponent implements OnInit {

  volunteer = new Volunteer();
  
  constructor(private route: ActivatedRoute, private volunteerService: VolunteerService) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.volunteerService.get(params["id"]).subscribe(data => {
        this.volunteer.firstName = data.firstName;
        this.volunteer.lastName = data.lastName;
        this.volunteer.email = data.email;
        this.volunteer.citizenship = data.citizenship;
        this.volunteer.sex = data.sex;
        this.volunteer.outsideVolunteer = data.outsideVolunteer;
        this.volunteer.potentialVolunteer = data.potentialVolunteer;
        this.volunteer.oib = data.oib;
        this.volunteer.username = data.username;
        this.volunteer.birthday = data.birthday;
      })
    })

  }

}
