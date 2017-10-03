import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { UsersService } from './users.service';
import { UserSelectComponent } from './user-select/user-select.component';

const appRoutes: Routes = [
  { path: 'profile', component: AppComponent },
  { path: 'coffees', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserSelectComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
  ],
  providers: [
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
