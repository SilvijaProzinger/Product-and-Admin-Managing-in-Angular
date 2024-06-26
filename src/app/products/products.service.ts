import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../types/types';
import { Observable, of } from 'rxjs';
import { Products } from '../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private router: Router) {}

  private products = Products;
  private favoriteProducts: Product[] = [];

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
    this.router.navigate(['/products']);
    return of();
  }

  updateProduct(updatedProduct: Product): Observable<void> {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
    this.router.navigate(['/products']);
    return of();
  }

  addToFavorites(product: Product): void {
    if (!this.favoriteProducts.some(p => p.id === product.id)) {
      this.favoriteProducts.push(product);
    }
  }

  getFavoriteProducts(): Observable<Product[]> {
    return of(this.favoriteProducts);
  }
}
