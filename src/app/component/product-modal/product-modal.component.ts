import { ProductService } from './../../service/product.service';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from '../../model/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @ViewChild('buttonClose', { static: true })
  buttonClose;

  @Input()
  product: Product;
  @Input()
  actionId = 1;

  @Output()
  alert = new EventEmitter<any>();

  showMessage = {
    product: new Product,
    code: 0,
    msg: ''
  }

  categorias = [
    { id: 1, description: "Perecível" },
    { id: 2, description: "Não Perecível" }
  ];

  isNameError = false;
  isCategoryError = false;
  isValueError = false;

  constructor(public service: ProductService) { }

  ngOnInit() {
  }

  save() {
    this.initializeErrors();
    if (this.validateFields()) {
      return;
    }
    if (this.isNull(this.product.id)) {
      this.service.insert(this.product).subscribe(res => {
        console.log(res);
        this.showMessage.product = this.product;
        this.showMessage.code = 1;
        this.showMessage.msg = 'Produto: ' + this.product.name + ' inserido com sucesso.';
        this.alert.emit(this.showMessage);
      }, error => {
        console.log(error);
        this.alert.emit(this.emitErrorMessage(error));
      });
      this.buttonClose.nativeElement.click();
      return;
    }
    this.service.update(this.product).subscribe(res => {
      console.log(res);
      this.showMessage.product = this.product;
      this.showMessage.code = 2;
      this.showMessage.msg = 'Produto: ' + this.product.name + ' editado com sucesso.';
      this.alert.emit(this.showMessage);
    }, error => {
      console.log(error);
      this.alert.emit(this.emitErrorMessage(error));
    });
    this.buttonClose.nativeElement.click();
    return;
  }

  delete() {
    this.service.delete(this.product.id).subscribe(res => {
      console.log(res);
      this.showMessage.product = this.product;
      this.showMessage.code = 3;
      this.showMessage.msg = 'Produto: ' + this.product.name + ' deletado com sucesso.';
      this.alert.emit(this.showMessage);
    }, error => {
      console.log(error);
      this.alert.emit(this.emitErrorMessage(error));
    });
    this.buttonClose.nativeElement.click();
  }

  cancel() {
    this.showMessage.product = this.product;
    this.showMessage.code = 0;
    this.showMessage.msg = '';
    this.alert.emit(this.showMessage);
    this.initializeErrors();
  }

  emitErrorMessage(error) {
    this.showMessage.product = this.product;
    this.showMessage.code = 3;
    this.showMessage.msg = "Error: " + error.message;
  }

  formatValue(price) {
    price = price.replace(/\D/g, '')
    price = price.replace(/(\d{1})(\d{1,2})$/, "$1,$2")
    price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    price = price.replace(/^(\d)/g, "$1")
    this.product.value = price;
  }

  validateFields() {
    if (this.isNull(this.product.name)) {
      this.isNameError = true;
      return true;
    }
    if (this.isNull(this.product.categoryCode)) {
      this.isCategoryError = true;
      return true;
    }
    if (this.isNull(this.product.value)) {
      this.isValueError = true;
      return true;
    }
    return false;
  }

  initializeErrors() {
    this.isNameError = false;
    this.isValueError = false;
    this.isCategoryError = false;
  }

  isNull(value) {
    return value == null || value == "" || value == 'undefined'
  }

  isNumeric(param) {
    return !isNaN(param);
  }

}
