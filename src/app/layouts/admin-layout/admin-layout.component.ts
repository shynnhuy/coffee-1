import { AppUser } from './../../core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  currentAdmin: AppUser;

  items = [];

  loading = true;


  constructor(
    private authService: AuthService,
    private iconLibraries: NbIconLibraries
  ) {
    this.iconLibraries.setDefaultPack('duotone');
  }

  ngOnInit() {
    this.authService.appUser$.subscribe(user => {
      this.currentAdmin = user;
      this.items = [
        // {
        //   title: `${user.name} Profile`,
        //   icon: { icon: 'person-outline', pack: 'eva' },
        //   link: [],
        // },
        {
          title: `Dashboard`,
          icon: { icon: 'cube-outline', pack: 'eva' },
          link: '/acp/dashboard',
          pathMatch: 'prefix',
        },
        {
          title: `List Users`,
          icon: { icon: 'people-outline', pack: 'eva' },
          link: '/acp/users',
          pathMatch: 'prefix',
        },
        {
          title: `List Products`,
          icon: { icon: 'smartphone-outline', pack: 'eva' },
          link: '/acp/products',
          pathMatch: 'prefix',
        },
      ]
    });
  }


}
