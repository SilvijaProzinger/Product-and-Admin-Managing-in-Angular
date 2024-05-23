import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../products/products.service';
import { Product } from '../../types/types';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
    });

    this.authService.user$.subscribe((user) => {
      this.isAdmin = this.authService.isAdmin(user);
    });
  }

  deleteProduct(): void {
    if (this.isAdmin && this.product) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      console.log('Error! Only an admin can perform the delete operation.');
    }
  }
}
