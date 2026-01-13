import { Routes } from '@angular/router';
import { LandingCompComponent } from './dashboard/components/landing-comp/landing-comp.component'
import { ClientFormComponent } from './dashboard/components/client-form/client-form.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'saas-client', component: LandingCompComponent },
            { path: 'new-client', component: ClientFormComponent },
            { path: '', redirectTo: 'saas-client', pathMatch: 'full' }
        ]
    }
];
