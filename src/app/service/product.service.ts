import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUri = environment.baseUri;

    constructor(public http: HttpClient) { }

    insert(product: Product): Observable<any> {
        return this.http.post(`${this.baseUri}`, product);
    }

    update(product: Product): Observable<any> {
        return this.http.put(`${this.baseUri}`, product);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUri}/${id}`, { responseType: 'text' });
    }

    findAll(): Observable<any> {
        return this.http.get(`${this.baseUri}`);
    }

}