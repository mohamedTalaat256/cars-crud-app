import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth, private router: Router) {
    this.user$ = new Observable(observer => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
    });
  }

async login(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(this.auth, email, password);
    this.router.navigate(['/cars']);
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // pass error to component
  }
}

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}