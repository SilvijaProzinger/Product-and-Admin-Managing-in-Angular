import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Admin } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminsService } from '../admins.service';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
})
export class AdminsComponent {
  private adminsService = inject(AdminsService);
  admins: Admin[] = [];
  isModalOpen = false;
  newAdminForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newAdminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  openNewAdminModal() {
    this.isModalOpen = true;
  }

  closeNewAdminModal() {
    this.isModalOpen = false;
  }

  resetForm(): void {
    this.closeNewAdminModal();
    this.newAdminForm.reset();
  }

  onSubmit() {
    if (this.newAdminForm.valid) {
      this.adminsService.createAdmin(this.newAdminForm.value.email)
      this.resetForm();
    } else {
      console.log('Invalid form')
    }
  }
}
