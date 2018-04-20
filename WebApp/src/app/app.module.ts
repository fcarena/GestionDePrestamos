import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgIf } from '@angular/common';
//Routes
import { AppRoutingModule } from './app.routes'

//Components
import { AppComponent } from './app.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { WorkDataComponent } from './components/work-data/work-data.component';
import { SuccessCreditComponent } from './components/success-credit/success-credit.component';

//Services
import { ClientService } from './services/client.service'
import { ClientCompanyService } from './services/client-company.service'


@NgModule({
  declarations: [
    AppComponent,
    ClientRegisterComponent,
    WorkDataComponent,
    SuccessCreditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgDatepickerModule
  ],
  providers: [ClientCompanyService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
