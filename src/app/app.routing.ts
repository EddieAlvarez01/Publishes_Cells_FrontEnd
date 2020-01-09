import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { BulkLoadComponent } from './components/bulk-load/bulk-load.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
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

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'emailConfirmation/:email', component: EmailConfirmationComponent },
	{ path: 'bulkLoad', component: BulkLoadComponent },
	{ path: 'catalogue', component: CatalogueComponent },
	{ path: 'individualView/:id', component: IndividualViewComponent },
	{ path: 'shoppingCart', component: ShoppingcartComponent },
	{ path: 'productReviews/:id', component: ProductreviewsComponent },
	{ path: 'chatView/:id', component: ChatComponent },
	{ path: 'configHome', component: PageSetupHomeComponent },
	{ path: 'reportHelpDeskAboveYear', component: ReportHelpdeskAboveDateComponent },
	{ path: 'reportAdminYear', component: ReportAdminYearComponent },
	{ path: 'reportCustomerMoreProfit', component: CustomersMoreProfitsComponent },
	{ path: 'reportTop3Products', component: ReportTop3productsComponent },
	{ path: 'reportTop3Customers', component: ReportTop3CustomersComponent },
	{ path: 'reportCommentsAssigned', component: ReportCommentsAssignedComponent },
	{ path: 'reportProductStock', component: ReportProductStockComponent },
	{ path: 'reportTop3WorstScore', component: ReportTop3WorstScoreComponent },
	{ path: 'reportAverageProduct', component: ReportAverageScoreProductComponent },
	{ path: 'editProdile', component: EditProfileComponent },
	{ path: 'userCrud', component: UserCrudComponent },
	{ path: 'productCrud', component: ProductCrudComponent },
	{ path: 'categoryCrud', component: CategoryCrudComponent },
	{ path: 'reportProductsCategory', component: ReportProductsCategoryComponent },
	{ path: 'createUser', component: CreateUserComponent },
	{ path: 'updateUserCrud/:id', component: EditUserCrudComponent },
	{ path: 'createCategory', component: CreateCategoryComponent },
	{ path: 'editCategory/:id', component: EditCategoryComponent },
	{ path: 'chatUser', component: ChatUserComponent },
	{ path: 'selectChat', component: SelectChatComponent },
	{ path: 'reportHelpDeskAverage', component: ReportHelpdeskAverageComponent },
	{ path: '**', component: HomeComponent } //404
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);