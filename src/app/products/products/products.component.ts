import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { Product } from '../../../types/types';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FavoriteIconComponent } from '../../favorite-icon/favorite-icon.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FavoriteIconComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isModalOpen = false;
  productForm: FormGroup;
  favorites: Product[] = [];
  isFavoritesDropdownOpen = false;
  isFilled = false;
  favoriteStarred: number[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.maxLength(160)]],
    });

    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.fetchFavorites();
    this.productService.favoriteStarred$.subscribe((favoriteStarred) => {
      this.favoriteStarred = favoriteStarred;
    });
  }

  fetchFavorites(): void {
    this.productService.getFavoriteProducts().subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  openNewProductModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetForm(): void {
    this.closeModal();
    this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe(() => {
        this.productService.getProducts().subscribe((products) => {
          this.products = products;
        });
      });
      this.resetForm();
    }
  }

  navigateToProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  toggleFavoritesDropdown(): void {
    this.isFavoritesDropdownOpen = !this.isFavoritesDropdownOpen;
  }

  addToFavorites(product: Product, event: Event): void {
    event.stopPropagation();
    this.productService.addToFavorites(product);
    this.fetchFavorites();
  }
}
