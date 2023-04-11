import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeicon: string = 'fa-eye-slash';
  constructor(
    private service: ProjectService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  hideshow() {
    this.isText = !this.isText;
    this.isText ? (this.eyeicon = 'fa-eye') : (this.eyeicon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  loginUser(data: NgForm) {
    if (data.invalid) {
      this.toastr.error('Invalid Credentails', undefined, {
        positionClass: 'toast-top-center',
        timeOut: 2000,
      });

      return;
    }
    this.service.loginUser(data.value).subscribe((res) => {
      this.service.setToken(res.token);

      if (res.user === undefined) {
        this.toastr.error('Invalid Credentails', undefined, {
          positionClass: 'toast-top-center',
        });
      } else {
        this.router.navigate(['/dashboard']);

        this.toastr.success('Login Successfully', undefined, {
          positionClass: 'toast-top-center',
        });
      }
    });
  }
}
