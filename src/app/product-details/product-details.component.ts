import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products/products.service';
import { Product } from '../../types/types';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  isAdmin = false;
  isEditOn = false;
  productForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
    });

    this.authService.user$.subscribe((user) => {
      this.isAdmin = this.authService.isAdmin(user);
    });

    this.productForm = this.fb.group({
      name: [
        this.product?.name,
        [Validators.required, Validators.maxLength(32)],
      ],
      price: [this.product?.price, [Validators.required, Validators.min(1)]],
      description: [this.product?.description, [Validators.maxLength(160)]],
    });
  }

  deleteProduct(): void {
    if (this.isAdmin && this.product) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        console.log('Product deleted successfully.')
      });
    } else {
      console.log('Error! Only an admin can perform the delete operation.');
    }
  }

  toggleEditMode(): void {
    this.isEditOn = !this.isEditOn;
  }

  saveEdit(): void {
    if (this.productForm.valid && this.product && this.isAdmin) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.productForm.value,
      };
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.product = updatedProduct;
        this.isEditOn = false;
      });
    }
  }
}
