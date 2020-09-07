import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  page: number = 1;
  actionId = 1;
  products = [];
  product: Product;
  inputSearch = '';

  messageCode = 0;
  message = '';

  constructor(public service: ProductService) { }

  ngOnInit() {
    this.product = new Product();
    console.log('#### Starting Products');
    this.loadGrid();
  }

  showModal(product, actionId) {
    console.log('#### Open Modal');
    console.log(product);
    this.messageCode = 0;
    this.actionId = actionId;
    if (product == null) {
      this.product = new Product();
    } else {
      this.product = product;
    }
  }

  showAlertMessage(event) {
    console.log('#### Show Message Alert');
    console.log(event);
    this.messageCode = event.code;
    this.message = event.msg;
    this.actionId = event.code;
    if (event.code == 3) {
      //code igual a 3 remove o item da grid 
      document.getElementById('prod-' + event.product.id).remove();
    }
    this.loadGrid();
  }

  findAllByCategoryOrName(event) {
    console.log('#### Filter Products');
    console.log(event.target.value);
    if (event.target.value != '') {
      this.loadGridByCategoryOrName(event.target.value);
    } else {
      this.loadGrid();
    }
  }

  closeMessage() {
    this.messageCode = 0;
    this.message = '';
  }

  isNumeric(param) {
    return !isNaN(param);
  }

  loadGrid() {
    this.service.findAll().subscribe((res: any) => {
      console.log(res);
      this.products = res;
    }, error => {
      console.log(error);
      this.actionId = 3;
      this.messageCode = 3;
      this.message = "Error: " + error.message;
    });
  }

  loadGridByCategoryOrName(param) {
    this.service.findAllByCategoryOrName(param).subscribe((res: any) => {
      this.products = [];
      if (res != null) {
        console.log(res);
        this.products = res;
      }
    }, error => {
      console.log(error);
      this.actionId = 3;
      this.messageCode = 3;
      this.message = "Error: " + error.message;
    });
  }

}
