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

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isModalOpen = false;
  productForm: FormGroup;

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

  openNewProductModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetForm(): void {
    this.closeModal()
    this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe(() => {
        this.productService.getProducts().subscribe((products) => {
          this.products = products;
          this.resetForm();
        });
      });
    }
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  navigateToProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
