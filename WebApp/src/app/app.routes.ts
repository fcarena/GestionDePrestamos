import { RouterModule, Routes } from '@angular/router';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { WorkDataComponent } from './components/work-data/work-data.component'
import { SuccessCreditComponent } from './components/success-credit/success-credit.component'


const AppRouteModule: Routes = [
    { path: 'register', component: ClientRegisterComponent },
    { path: 'company-data/:id', component: WorkDataComponent },
    { path: 'success/:credit', component: SuccessCreditComponent },
    { path: '**', pathMatch: 'full', redirectTo:'register' }
];

export const AppRoutingModule = RouterModule.forRoot(AppRouteModule, { useHash: true });