import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Member } from '../../common/member';
import { MemberService } from '../../common/member.service';
import {LogoutService} from '../../common/logout.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  _memberList: Member[] = []; // メンバー一覧を格納する
  _jobList: string[] = ['代表取締役', 'エンジニア', 'セールス', 'デザイナー', 'プロジェクトマネージャー', 'バックオフィス']; // 職種リスト
  _joinYearList: string[] = []; // 入社年リスト
  _birthYearList: string[] = []; // 生まれ年リスト

  constructor(
    private http: HttpClient,
    private router: Router,
    private memberService: MemberService,
    private logoutService: LogoutService
  ) {}

  ngOnInit() {
    this.logoutService.toLoginPage();
    this.memberService.getMemberList().subscribe(
        (memberList: Member[]) => {
          this._memberList = memberList;
          this._jobList = this.memberService._jobList;
          this._birthYearList = this.memberService._birthYearList;
          this._joinYearList = this.memberService._joinYearList;
        },
        (err) => {
          console.log(err);
        }
    );
  }


   // フィルター条件により表示内容を変更する
  _onClickFilter(filter: string): void {
    const _listJob = document.getElementById('member-list-job');
    const _listJoin = document.getElementById('member-list-joinYear');
    const _listBirth = document.getElementById('member-list-birthYear');
    if (filter === 'job') {
      _listJob.style.display = 'block';
      _listJoin.style.display = 'none';
      _listBirth.style.display = 'none';
    } else if (filter === 'joinYear') {
      _listJoin.style.display = 'block';
      _listJob.style.display = 'none';
      _listBirth.style.display = 'none';
    } else if (filter === 'birthYear') {
      _listJoin.style.display = 'none';
      _listJob.style.display = 'none';
      _listBirth.style.display = 'block';
    }
  }

}
