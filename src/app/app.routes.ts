import {Routes} from '@angular/router';
import {MemberListComponent} from './views/member-list/member-list.component';
import {MemberEachComponent} from './views/member-each/member-each.component';
import {QuestionListComponent} from './views/question-list/question-list.component';
import {LoginComponent} from './views/login/login.component';
import {EditProfileComponent} from './views/edit-profile/edit-profile.component';

export const ROUTER_CONFIG: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
        // canActivate: [AuthGuard]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
        path: 'member-list',
        component: MemberListComponent
    },
    {
        path: 'member-each',
        component: MemberEachComponent
    },
    {
      path: 'question-list',
      component: QuestionListComponent
    },
    {
      path: 'member-each/:id',
      component: MemberEachComponent
    },
    {
      path: 'edit-profile',
      component: EditProfileComponent
    },
    {
        path: '**',
        redirectTo: '/login',
    }
];
