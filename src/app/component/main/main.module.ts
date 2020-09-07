import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductTableComponent } from '../product-table/product-table.component';
import { ProductService } from './../../service/product.service';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MainRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    MainComponent,
    ProductTableComponent,
    ProductModalComponent
  ],
  exports: [
    MainComponent,
    ProductTableComponent,
    ProductModalComponent
  ],
  providers: [
    ProductService
  ],
})

export class MainModule {
}
