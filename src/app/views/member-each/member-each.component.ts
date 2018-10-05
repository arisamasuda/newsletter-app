import { Component, OnInit } from '@angular/core';
import { Member } from '../../common/member';
import {ActivatedRoute, Router} from '@angular/router';
import { MemberService } from '../../common/member.service';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {LogoutService} from '../../common/logout.service';


@Component({
  selector: 'app-member-each',
  templateUrl: './member-each.component.html',
  styleUrls: ['./member-each.component.scss']
})

export class MemberEachComponent implements OnInit {
  member: Member;
  _qtUnitList; // アンケートと回答一覧のリスト
  _imgPath = '/assets/img/nice-off.png';

  token: string = localStorage.getItem('token');
  userId: string = localStorage.getItem('userId');

  private readonly BASE_URL = 'https://api-fresh-recruiting.goalist.co.jp';
  private readonly httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }
    )
  };
  data = {
    userId: this.userId,
    token: this.token,
  };

  constructor(
    private http: HttpClient,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router,
    private logoutService: LogoutService
  ) {}

  ngOnInit() {
    this.logoutService.toLoginPage();
    this._getMember().subscribe(
        (member: Member) => {
          this.member = member;
          this._getMemberAnswers(this.member.userId);
        },
        (err) => {
          console.log(err);
        }
    );
  }


  // 表示するメンバーの情報を取得する
  _getMember(): Observable<Member> {
    let id = '';
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap);
     id =  paramMap.get('id');
    });
    return this.memberService.getMember(parseFloat(id));
  }


  // 個人のアンケート回答一覧を取得する
  _getMemberAnswers(targetUserId: string) {
    this.data['targetUserId'] = targetUserId;
    const url = this.BASE_URL + '/user-detail';
    this.http.post(url, JSON.stringify(this.data), this.httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        this._qtUnitList = this._changeGoodImg(res['qtUnitList']);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  // プロフィール変更画面へ
  _onEditProfile() {
    this.router.navigate(['/edit-profile']);
  }


  // いいねボタンの動作
  _onNiceCount(answer: object) {
    const answerId = answer['answerId'];
    const url = this.BASE_URL + '/qt-good/add';
    delete this.data['targetUserId'];
    this.data['answerId'] = answerId;
    this.data['goodUserId'] = this.userId;
    this.http.post(url, JSON.stringify(this.data), this.httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        this._getMemberAnswers(this.member.userId);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  // 自分がいいねしていたら、画像を変更
  _changeGoodImg(questionList: string[]): string[]{
    let _goodUserList;
    for (const question of questionList) {
      question['imgPath'] = this._imgPath;
      _goodUserList = question['goodUsers'];
      for (const goodUser of _goodUserList) {
        if (goodUser['userId'] === this.userId) {
          question['imgPath'] = '/assets/img/nice-on.png';
        }
      }
    }
    return questionList;
  }

  // メンバー検索による表示メンバーの変更
  _changeView() {
    this._getMember().subscribe(
      (member: Member) => {
        this.member = member;
        this._getMemberAnswers(this.member.userId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
