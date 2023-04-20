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
  public competedsurvey:any[] = []
  constructor(private router: Router, private service: ProjectService) {}
  ngOnInit(): void {
    this.getprofiile();
    

  

    this.listSurvey();
  }
  listSurvey() {
    
     
      const _id = localStorage.getItem('id')
     
    this.service.listSurvey().subscribe((data) => {
      this.survey = data.result;

    
      this.service.find(_id).subscribe((data) => {
        
         const completedSurveys = data[0].survey;
        console.log(completedSurveys,"-------------------------");
        
        this.survey = this.survey.filter((survey: { _id: any; }) => {
           return !completedSurveys.some((completedSurvey: { _id: any; }) => {
          return completedSurvey._id === survey._id;
          });
        });
      });
    });
      
     
  }
  navigate(surveyid: any, survey: any) {
   const user = localStorage.getItem('id')

   
    this.service.isSurveyTaken(user,survey).subscribe((isTaken)=>{
      console.log(isTaken.message);
    
        
        localStorage.setItem('surveyid', surveyid);
       localStorage.setItem('survey', survey);
    
      this.router.navigate(['/question']);
    
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
