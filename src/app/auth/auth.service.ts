import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afAuth = inject(AngularFireAuth);
  user$: Observable<firebase.User | null>;

  constructor() {
    this.user$ = this.afAuth.authState;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error: ', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  async getToken(): Promise<string | undefined | null> {
    try {
      return await firstValueFrom(this.afAuth.idToken);
    } catch (error) {
      console.error('Error getting token: ', error);
      return null;
    }
  }
}
