import { AngularFireAuth } from '@angular/fire/auth';
import { AppUser } from 'src/app/core/models/user.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  getAll(): Observable<AppUser[]> {
    return this.db.collection<AppUser>('users').valueChanges();
  }

  getUser(): firebase.User {
    const user = this.auth.auth.currentUser;
    if (user)
      return user;
    return null;
  }
}
