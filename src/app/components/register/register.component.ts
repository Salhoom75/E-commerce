import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading: boolean = false;
  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService
  ) {}
  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Z][A-Za-z0-9]{7,15}'),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Z][A-Za-z0-9]{7,15}'),
    ]),
    phone: new FormControl(null, [Validators.pattern('01[0125][0-9]{8}')]),
  });

  sendData(data: FormGroup) {
    this.isLoading = true;

    console.log(data);
    this._AuthService.onRegister(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;

        this.toastr.error('There is something went wrong', 'Failed');
      },
      complete: () => {
        this.isLoading = false;

        this.toastr.success('You’ve registered successfully', 'Success');
      },
    });
  }
}
