import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../types/types';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  private afAuth = inject(AngularFireAuth);
  private router = inject(Router);
  private authService = inject(AuthService);
  admins: Admin[] = [];
  randomPassword = '';

  constructor() {}

  generateRandomPassword(): string {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialChars = '-_@$!%*?&';

    const getRandomChar = (chars: string) =>
      chars[Math.floor(Math.random() * chars.length)];

    let password = '';

    password += getRandomChar(lowerCase);
    password += getRandomChar(upperCase);
    password += getRandomChar(digits);
    password += getRandomChar(digits);
    password += getRandomChar(digits);
    password += getRandomChar(specialChars);
    password += getRandomChar(specialChars);

    const allChars = lowerCase + upperCase + digits + specialChars;
    while (password.length < 8) {
      password += getRandomChar(allChars);
    }

    password = password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
    return password;
  }

  async createAdmin(email: string): Promise<void> {
    const password = this.generateRandomPassword();
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      if (res) {
        this.authService.addToAdminList(email);
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Admin creation error: ', error);
      throw error;
    }
  }
}
