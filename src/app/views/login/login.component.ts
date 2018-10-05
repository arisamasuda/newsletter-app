import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly BASE_URL = 'https://api-fresh-recruiting.goalist.co.jp/login';
  _resultObj: Object = null;

  private readonly httpOptions = { 
    headers: new HttpHeaders({ 
        'Content-Type':  'application/json', 
      }
    )
   };
  public userInfo: string[];
  _errorMessage: string;


  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit() {
  }

  _onClickLogin(userId: string, password: string) {

    const data = {
      userId: userId,
      password: password
    };

    this.http.post(this.BASE_URL , JSON.stringify(data), this.httpOptions).subscribe(
      (res) => {
        console.log(res);
        const status: string = res['status'];
        const token: string = res['token'];
        this.userInfo = [userId, token];
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        if (status === '200') {
          this.router.navigate(['/member-list']);
        }
        if (status === '500') {
          this._errorMessage = res['errorMessage'];
        }
      },
      (err) => {

      }
    );


  }


}

class LoginResponse {
  status;
  errorMessage;
  userId;
  token;

}

