import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

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
import { UserCrudComponent } from './components/user-crud/user-crud.component';
import { ProductCrudComponent } from './components/product-crud/product-crud.component';
import { CategoryCrudComponent } from './components/category-crud/category-crud.component';
import { ReportProductsCategoryComponent } from './components/report-products-category/report-products-category.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserCrudComponent } from './components/edit-user-crud/edit-user-crud.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ChatUserComponent } from './components/chat-user/chat-user.component';
import { SelectChatComponent } from './components/select-chat/select-chat.component';
import { ReportHelpdeskAverageComponent } from './components/report-helpdesk-average/report-helpdesk-average.component';

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
    EditProfileComponent,
    UserCrudComponent,
    ProductCrudComponent,
    CategoryCrudComponent,
    ReportProductsCategoryComponent,
    CreateUserComponent,
    EditUserCrudComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ChatUserComponent,
    SelectChatComponent,
    ReportHelpdeskAverageComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
