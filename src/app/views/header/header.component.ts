import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Member} from '../../common/member';
import {MemberService} from '../../common/member.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  _memberList: Member[];
  loginUser: Member;
  _searchMemberList: Member[];

  @Output() event = new EventEmitter();

  route;
  url;
  urlMember: boolean;
  urlQuestion: boolean;
  userId: string = localStorage.getItem('userId');

  constructor(
    private router: Router,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    // メンバー一覧とアンケート一覧の切り替え
    this.route = this.router;
    this.url = this.route.url;
    if (this.url === '/member-list') {
      this.urlMember = true;
    } else if (this.url === '/question-list') {
      this.urlQuestion = true;
    }
    this.memberService.getLoginMember(this.userId)
      .subscribe(member => this.loginUser = member);
    this.memberService.getMemberList().subscribe(
      (memberList: Member[]) => {
        this._memberList = memberList;
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

  _onSearchMember(text: string) {
    this._searchMemberList = [];
    for (const member of this._memberList) {
      if (text === '') {
        this._searchMemberList = [];
      } else if (member.name.includes(text)) {
        this._searchMemberList.push(member);
      }
    }
  }

  // /member-eachの時にviewを変更するためだけのメソッド
  _changeView() {
    this.event.emit();
  }


}
