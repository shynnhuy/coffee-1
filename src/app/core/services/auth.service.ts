import { switchMap } from 'rxjs/operators';
import { AppUser } from './../models/user.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  appUser$: Observable<AppUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appUser$ = afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.db.doc<AppUser>(`users/${user.uid}`).valueChanges()
      } else {
        return of(null)
      }
    }))
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const data = await this.afAuth.auth.signInWithPopup(provider);
    this.save(data.user);
    return this.router.navigateByUrl(returnUrl);
  }


  private save(user: firebase.User) {
    return this.db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      roles: {
        member: true
      }
    }, { merge: true })
  }

  logout() {
    this.afAuth.auth.signOut();
    return this.router.navigate(['/'])
  }

}
