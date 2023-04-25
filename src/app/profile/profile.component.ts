import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userdetails: any;
  ngOnInit(): void {
    this.getprofiile();
  }
  constructor(private router: Router, private service: ProjectService) {}
  getprofiile() {
    this.service.getProfile().subscribe((data) => {
      this.userdetails = data['user'];
    });
  }
  back() {
    this.router.navigate(['/dashboard']);
  }
  onLogout() {
    this.service.deleteToken();

    this.router.navigate(['/login']);
  }

  // redem() {
  //   const points = localStorage.getItem('surveyid');

  //   const id = localStorage.getItem('id');

  //   const data = {
  //     points,
  //     id,
  //   };
  //   const result = confirm('are you sure to redeem points ?');
  //   if (result) {
  //     this.service.redemPoints(data).subscribe((data) => {
  //       alert('Points Will redeem Sucessfully!');
  //     });
  //   }
  // }
}
