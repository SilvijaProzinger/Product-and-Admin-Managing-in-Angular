import { Injectable } from '@angular/core';
import { Product } from '../../types/types';
import { Observable, of } from 'rxjs';
import { Products } from '../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  private products = Products;

  getProducts(): Observable<Product[]> {
    return of(Products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = Products.find((product) => product.id === id);
    return of(product);
  }

  addProduct(newProduct: Product): Observable<void> {
    this.products.push({ ...newProduct, id: this.products.length + 1 });
    return of();
  }

  deleteProduct(id: number): Observable<void> {
    const index = Products.findIndex((product) => product.id === id);
    if (index !== -1) {
      Products.splice(index, 1);
    }
    return of();
  }
}
