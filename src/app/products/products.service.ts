import { Injectable } from '@angular/core';
import { Product } from '../../types/types';
import { Observable, of } from 'rxjs';
import { Products } from '../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(Products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = Products.find((product) => product.id === id);
    return of(product);
  }
}
