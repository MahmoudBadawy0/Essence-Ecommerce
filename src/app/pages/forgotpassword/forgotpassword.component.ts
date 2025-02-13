import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step: number = 1;
  isLoading: boolean = false;
  msgError: string = '';

  emailValue: string = '';

  // FormGroup
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    ]),
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]),
  });

  // formBuilder
  resetPassword: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ],
    ],

    newPassword: [
      null,
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/),
      ],
    ],
  });

  verifyEmailSubmit() {
    this.emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(this.emailValue);

    if (this.verifyEmail.valid) {
      this.isLoading = true;
      this.authService.setVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            console.log(res);
            this.isLoading = false;
            this.step = 2;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }

    this.msgError = '';
  }

  verifyCodeSubmit() {
    if (this.verifyCode.valid) {
      this.isLoading = true;

      this.authService.setVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.step = 3;
            this.isLoading = false;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
    this.msgError = '';
  }

  resetPasswordSubmit() {
    if (this.resetPassword.valid) {
      this.isLoading = true;
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          setTimeout(() => {
            //save token
            localStorage.setItem('token', res.token);
            //decode it
            this.authService.tokenDecode();
            this.router.navigate(['/home']);
          }, 500);
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
    this.msgError = '';
  }

  goBack() {
    if (this.step == 2 || this.step == 3) {
      this.step=1;
      this.verifyEmail.get('email')?.patchValue(null);
      this.verifyCode.get('resetCode')?.patchValue(null);
    }
  }
}
