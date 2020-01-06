import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { BulkLoadComponent } from './components/bulk-load/bulk-load.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { IndividualViewComponent } from './components/individual-view/individual-view.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ProductreviewsComponent } from './components/productreviews/productreviews.component';
import { ChatComponent } from './components/chat/chat.component';
import { PageSetupHomeComponent } from './components/page-setup-home/page-setup-home.component';
import { ReportHelpdeskAboveDateComponent } from './components/report-helpdesk-above-date/report-helpdesk-above-date.component';
import { ReportAdminYearComponent } from './components/report-admin-year/report-admin-year.component';
import { CustomersMoreProfitsComponent } from './components/customers-more-profits/customers-more-profits.component';
import { ReportTop3productsComponent } from './components/report-top3products/report-top3products.component';
import { ReportTop3CustomersComponent } from './components/report-top3-customers/report-top3-customers.component';
import { ReportCommentsAssignedComponent } from './components/report-comments-assigned/report-comments-assigned.component';
import { ReportProductStockComponent } from './components/report-product-stock/report-product-stock.component';
import { ReportTop3WorstScoreComponent } from './components/report-top3-worst-score/report-top3-worst-score.component';
import { ReportAverageScoreProductComponent } from './components/report-average-score-product/report-average-score-product.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EmailConfirmationComponent,
    BulkLoadComponent,
    CatalogueComponent,
    TreeViewComponent,
    IndividualViewComponent,
    ShoppingcartComponent,
    ProductreviewsComponent,
    ChatComponent,
    PageSetupHomeComponent,
    ReportHelpdeskAboveDateComponent,
    ReportAdminYearComponent,
    CustomersMoreProfitsComponent,
    ReportTop3productsComponent,
    ReportTop3CustomersComponent,
    ReportCommentsAssignedComponent,
    ReportProductStockComponent,
    ReportTop3WorstScoreComponent,
    ReportAverageScoreProductComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
