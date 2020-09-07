import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { MainModule } from './component/main/main.module';
import { ProductTableComponent } from './component/product-table/product-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'main/products', component: ProductTableComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MainModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
