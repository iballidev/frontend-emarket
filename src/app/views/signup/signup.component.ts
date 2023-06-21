import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/*
 *@param form
 */
function passwordMatchValidator(form: any) {
  const Password = form.get('Password');
  const ConfirmPassword = form.get('ConfirmPassword');

  if (Password.value != ConfirmPassword.value) {
    ConfirmPassword.setErrors({ passwordsMatch: true });
  } else {
    ConfirmPassword.setErrors(null);
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  SignUpForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  get getEmail() {
    return this.SignUpForm.get('Email');
  }

  get getPassword() {
    return this.SignUpForm.get('Password');
  }

  get getConfirmPassword() {
    return this.SignUpForm.get('ConfirmPassword');
  }

  buildForm() {
    this.SignUpForm = this._fb.group(
      {
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(5)]],
        ConfirmPassword: '',
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  onSubmit() {
    console.log('SignUpForm: ', this.SignUpForm.value);
  }
}
