import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{
  type: string = 'password';
  isText: boolean = false;
  eyeicon: string = 'fa-eye-slash';

  constructor(
    private service: ProjectService,
    private router: Router,
    private toastr: ToastrService,
    private tostar: ToastrService
  ) {}
  ngOnInit(): void {
    if(this.service.isLoggedIn()){
      this.router.navigateByUrl('/dashboard')
    }
  }
  hideshow() {
    this.isText = !this.isText;
    this.isText ? (this.eyeicon = 'fa-eye') : (this.eyeicon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  
  signupUser(data: NgForm) {
    if (data.invalid) {
      this.toastr.error('Please fill All Details', undefined, {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
      });

      return;
    }

    this.service.signupUser(data.value).subscribe((res) => {
      console.log(res);
        
      if (res.user === undefined) {
        this.toastr.error('Please Check your information ', undefined, {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
        });
      } else {
        this.router.navigateByUrl('/login')
        this.toastr.success(
          'verifction mail sent to the register email ',
          undefined,
          {
            timeOut: 2000,
            closeButton: true,
            progressBar: true,
          }
        );

        data.resetForm();
      }
    });
  }
}
