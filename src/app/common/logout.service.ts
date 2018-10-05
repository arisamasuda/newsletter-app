import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class LogoutService {

  private readonly BASE_URL = 'https://api-fresh-recruiting.goalist.co.jp/users';
  private readonly httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }
    )
  };
  token: string = localStorage.getItem('token');
  userId: string = localStorage.getItem('userId');
  private data = {
    userId: this.userId,
    token: this.token
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // エラーが返ってきたらログイン画面へ
  toLoginPage() {
    this.http.post(this.BASE_URL , JSON.stringify(this.data), this.httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        if (res['status'] === '400') {
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
