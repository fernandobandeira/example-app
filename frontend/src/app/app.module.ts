import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersService } from './users.service';
import { UserSelectComponent } from './user-select/user-select.component';
import { CoffeesComponent } from './coffees/coffees.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'coffees', component: CoffeesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserSelectComponent,
    CoffeesComponent,
    ProfileComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
