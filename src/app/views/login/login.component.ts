import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private _authSvc: AuthService) {}

  ngOnInit(): void {
    let isTokenNotExpired = this._authSvc.isLoggedIn();
    console.log('isTokenNotExpired: ', isTokenNotExpired);
  }

  login() {
    // console.log(this.model);
    const payload: LoginUser = {
      email: this.model.Email,
      password: this.model.Password,
      IsKeepLoggedIn: this.model.IsKeepLoggedIn,
    };

    // console.log('payload: ', payload);
    this._authSvc.LoginUser(payload).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
        }
      },
      error: (error: Response) => {
        if (error) {
          if (error.status == 409) alert('Auth failed!');
          else {
            alert('An unexpected error occurred.');
            console.log('Error: ', error);
          }
        }
      },
    });
  }
}
