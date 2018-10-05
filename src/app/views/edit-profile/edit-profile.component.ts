import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Member} from '../../common/member';
import {MemberService} from '../../common/member.service';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {LogoutService} from '../../common/logout.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  loginUser: Member;
  model: any;

  private readonly BASE_URL = 'https://api-fresh-recruiting.goalist.co.jp';
  private readonly httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }
    )
  };
  token: string = localStorage.getItem('token');
  userId: string = localStorage.getItem('userId');

  data = {
    userId: this.userId,
    token: this.token,
    targetUserId: this.userId,
  };

  constructor(
    private location: Location,
    private http: HttpClient,
    private memberService: MemberService,
    private logoutService: LogoutService
  ) { }

  ngOnInit() {
    this.logoutService.toLoginPage();
    this.memberService.getLoginMember(this.userId)
      .subscribe(member => this.loginUser = member);
  }

  _goBack() {
      this.location.back();
  }

  // コメントの編集
  _editComment(comment: string) {
    this.data['comment'] = comment;
    const url = this.BASE_URL + '/user-detail/change-comment';
    this.http.post(url, JSON.stringify(this.data), this.httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        const status: string = res['status'];
        if (status === '200') {
          alert('保存されました');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  _changePassword(password: string) {
    delete this.data['comment'];
    this.data['password'] = password;
    const url = this.BASE_URL + '/user-detail/change-password';
    this.http.post(url, JSON.stringify(this.data), this.httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        const status: string = res['status'];
        if (status === '200') {
          alert('変更されました');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
