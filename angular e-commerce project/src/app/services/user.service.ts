import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invaliduserauth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  usersignup(user: SignUp) {
    //console.warn(user)
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  userlogin(data: login) {
    this.invaliduserauth.emit(false);
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        {observe: 'response'}
      )
      .subscribe((result)=>{
        if (result && result.body?.length) {
          console.warn(result);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invaliduserauth.emit(true);
        }
      });
  }
  userauthreload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
