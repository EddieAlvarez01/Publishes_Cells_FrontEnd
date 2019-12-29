import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { BulkLoadComponent } from './components/bulk-load/bulk-load.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { IndividualViewComponent } from './components/individual-view/individual-view.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'emailConfirmation/:email', component: EmailConfirmationComponent },
	{ path: 'bulkLoad', component: BulkLoadComponent },
	{ path: 'catalogue', component: CatalogueComponent },
	{ path: 'individualView/:id', component: IndividualViewComponent },
	{ path: '**', component: HomeComponent } //404
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);