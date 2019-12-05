import { CartComponent } from 'src/app/pages/cart/cart.component';
import { Component, OnInit } from '@angular/core';
import { NbIconLibraries, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  constructor(
    private iconLibraries: NbIconLibraries,
  ) {
    this.iconLibraries.setDefaultPack('duotone');
  }

  ngOnInit() {
    
  }

}
