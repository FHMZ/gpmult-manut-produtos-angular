import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductTableComponent } from '../product-table/product-table.component';
import { ProductService } from './../../service/product.service';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MainRoutingModule,
    NgxMaskModule.forRoot(maskConfig),
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
