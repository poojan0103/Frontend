import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public survey: any;
  public userdetails: any;
  constructor(private router: Router, private service: ProjectService) {}
  ngOnInit(): void {
    this.getprofiile();

    this.listSurvey();
  }
  listSurvey() {
    this.service.listSurvey().subscribe((data) => {
      this.survey = data.result;
    });
  }
  navigate(surveyid: any, survey: any) {
   const user = localStorage.getItem('id')
    this.service.isSurveyTaken(user,survey).subscribe((isTaken)=>{
      console.log(isTaken.message);
      // debugger
      if(isTaken.message == 'survey already taken'){
        alert('you give this survey')
      }
      else{
        
        localStorage.setItem('surveyid', surveyid);
        localStorage.setItem('survey', survey);
        this.router.navigate(['/question']);
      }
    })
  
    
  
  }
  getprofiile() {
    this.service.getProfile().subscribe((data) => {
      this.userdetails = data['user'];

      localStorage.setItem('id', this.userdetails._id);
    });
  }
  detail() {
    this.router.navigateByUrl('/profile');
  }

}
