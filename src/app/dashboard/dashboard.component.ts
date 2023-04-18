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
    
  //   const completedSurvey = sessionStorage.getItem('completedsurvey');
  // if (completedSurvey !== null) {
  //   this.competedsurvey= JSON.parse(completedSurvey);
  // } else {
  //   this.competedsurvey = [];
  // }
  // console.log(completedSurvey);
  

    this.listSurvey();
  }
  listSurvey() {
    
      const user = localStorage.getItem('id');
      // const surveyUser = {
      //   user: user,
      // }
      // const user = localStorage.getItem('id')
    this.service.listSurvey().subscribe((data) => {
      this.survey = data.result;

      // Filter out completed surveys for the current user
     // this.competedsurvey = [];
      this.service.SurveyUserId(user).subscribe((data) => {
        this.competedsurvey = data;
        console.log(this.competedsurvey,"-------------------------");
        
        this.survey = this.survey.filter((survey: { _id: any; }) => {
          return !this.competedsurvey.some((completedSurvey) => {
            return completedSurvey.survey._id === survey._id;
          });
        });
      });
    });
      
      // this.service.listSurvey().subscribe((data) => {
      //   const allSurveys = data.result;
    
      //   // Filter out completed surveys
      //   this.survey = allSurveys.filter((survey: any) => {
      //     return !this.competedsurvey.includes(survey._id)
      //   });

      //   console.log(this.competedsurvey);
      //   sessionStorage.setItem('completedsurvey', JSON.stringify(this.competedsurvey));
      // });
    
    
    // this.service.listSurvey().subscribe((data) => {
    //   this.survey = data.result;
      
    // });
  }
  navigate(surveyid: any, survey: any) {
   const user = localStorage.getItem('id')

   
    this.service.isSurveyTaken(user,survey).subscribe((isTaken)=>{
      console.log(isTaken.message);
      // debugger
      // if(isTaken.message == 'survey already taken'){
      //   alert('you give this survey')
      //   this.competedsurvey.push(survey);
      //   sessionStorage.setItem('completedsurvey', JSON.stringify(this.competedsurvey));
      //   this.listSurvey()

  
      // }
      // else{
        
        localStorage.setItem('surveyid', surveyid);
       localStorage.setItem('survey', survey);
      //  const surveyUser = {
      //   user: user,
      //   survey:survey 
      //  }
      //  this.service.surveyUser(surveyUser).subscribe((response)=>{
      //   console.log('Survey response added successfully!', response);
      this.router.navigate(['/question']);
      //  })
        // this.router.navigate(['/question']);
      // }
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
