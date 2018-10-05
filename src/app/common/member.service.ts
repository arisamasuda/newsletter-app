import {Injectable} from '@angular/core';
import {Member} from './member';
import {HttpClient, HttpHeaders} from '../../../node_modules/@angular/common/http';
import {Observable, of, Subscribable, Subscriber, Subscription} from 'rxjs';
import {map, filter, reduce, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class MemberService {
  _member: Member;
  _memberList: Member[] = []; // メンバーリスト
  _jobList: string[] = ['代表取締役', 'エンジニア', 'セールス', 'デザイナー', 'プロジェクトマネージャー', 'バックオフィス']; // 職種リスト
  _joinYearList: string[] = []; // 入社年リスト
  _birthYearList: string[] = []; // 生まれ年リスト
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
    private http: HttpClient
  ) {}

  // メンバー一覧を取得して、メンバーリスト、職種リスト、入社年リスト、生まれ年リストにいれる
  getMemberList(): Observable<Member[]> {
    this._memberList = [];
    return this.http.post(this.BASE_URL , JSON.stringify(this.data), this.httpOptions).pipe(
        map(
            (res: any) => {
                console.log(res);
                const userList = res['userList'];
                this._memberList = [];
                for (let i = 2; i < Object.keys(userList).length; i ++) {
                    this._member = new Member();
                    this._member.id = userList[i]['id'];
                    this._member.name = userList[i]['name'];
                    this._member.birthday = userList[i]['birthday'];
                    this._member.birthYear = parseFloat(userList[i]['birthday'].substr(0, 4));
                    this._member.job = userList[i]['job'];
                    this._member.joinYear = parseFloat(userList[i]['joinDate'].substr(0, 4));
                    this._member.imageUrl = userList[i]['imgUrl'];
                    this._member.userId = userList[i]['userId'];
                    this._member.comment = userList[i]['comment'];
                    // メンバーリストを作る
                    this._memberList.push(this._member);
                    // 職種リスト、入社年リスト、生まれ年リストを作る
                    this._makeList(this._member);
                }
                return this._memberList;
            }
        ),
        catchError((err) => {
          throw err;
        })
    );
  }


  // URLのidからメンバーを検索
  getMember(id: number): Observable<Member> {
    if (this._memberList.length === 0) {
        return this.getMemberList().pipe(
            map(
                (memberList: Member[]) => {
                  return memberList.find(member => member.id === String(id));
                }
            ),
            catchError((err) => {
                throw err;
            })
        );
    }
    return of(this._memberList.find(member => member.id === String(id)));
  }

  // ログインメンバーの検索
  getLoginMember(userId: string): Observable<Member> {
    if (this._memberList.length === 0) {
      return this.getMemberList().pipe(
        map(
          (memberList: Member[]) => {
            return memberList.find(member => member.userId === userId);
          }
        ),
        catchError((err) => {
          throw err;
        })
      );
    }
    return of(this._memberList.find(member => member.userId === userId));
  }

  // 職種リスト、入社年リスト、生まれ年リストを作る
  _makeList(member: Member) {
    if (!this._jobList.includes(member.job)) {
      this._jobList.push(member.job);
    }
    if (!this._joinYearList.includes(member.joinYear)) {
      this._joinYearList.push(member.joinYear);
      this._joinYearList.sort(function(a: any, b: any) {
        return b - a;
      });
    }
    if (!this._birthYearList.includes(member.birthYear)) {
      this._birthYearList.push(member.birthYear);
      this._birthYearList.sort(function(a: any, b: any) {
        return b - a;
      });
    }
  }
}
