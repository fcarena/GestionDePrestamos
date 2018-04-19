import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

//Routes
import { AppRoutingModule } from './app.routes'

//Components
import { AppComponent } from './app.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { WorkDataComponent } from './components/work-data/work-data.component';
import { SuccessCreditComponent } from './components/success-credit/success-credit.component';


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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
