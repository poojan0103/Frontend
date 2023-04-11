import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeicon: string = 'fa-eye-slash';

  constructor(
    private service: ProjectService,
    private router: Router,
    private toastr: ToastrService,
    private tostar: ToastrService
  ) {}
  hideshow() {
    this.isText = !this.isText;
    this.isText ? (this.eyeicon = 'fa-eye') : (this.eyeicon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  signupUser(data: NgForm) {
    if (data.invalid) {
      this.toastr.error('Pelase fill All Details', undefined, {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
      });

      return;
    }

    this.service.signupUser(data.value).subscribe((res) => {
      console.log(res);

      if (res.user === undefined) {
        this.toastr.error('Pelase Check your information ', undefined, {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
        });
      } else {
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
