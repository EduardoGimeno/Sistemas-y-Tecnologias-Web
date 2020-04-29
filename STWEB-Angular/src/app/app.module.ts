import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { EntryComponent } from './entry/entry.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { ChatEntryComponent } from './chat-entry/chat-entry.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatsUserComponent } from './stats-user/stats-user.component';
import { StatsAdminComponent } from './stats-admin/stats-admin.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    IndexUserComponent,
    IndexAdminComponent,
    EntryComponent,
    ChatUserComponent,
    ChatEntryComponent,
    ProfileComponent,
    ChangePasswordComponent,
    StatsUserComponent,
    StatsAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
