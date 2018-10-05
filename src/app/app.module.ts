import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ROUTER_CONFIG } from './app.routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MemberListComponent } from './views/member-list/member-list.component';
import { MemberEachComponent } from './views/member-each/member-each.component';
import { HeaderComponent } from './views/header/header.component';
import { QuestionListComponent } from './views/question-list/question-list.component';
import { LoginComponent } from './views/login/login.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        MemberListComponent,
        MemberEachComponent,
        HeaderComponent,
        QuestionListComponent,
        LoginComponent,
        EditProfileComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTER_CONFIG),
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
