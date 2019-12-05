import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AppUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.scss']
})
export class AdminListUsersComponent implements OnInit, OnDestroy {

  userSub: Subscription;

  settings = {
    add: {
      addButtonContent: '<i class="fad fa-plus"></i>',
      createButtonContent: '<i class="fad fa-check"></i>',
      cancelButtonContent: '<i class="fad fa-times"></i>',
    },
    edit: {
      editButtonContent: '<i class="fad fa-pen-square"></i>',
      saveButtonContent: '<i class="fad fa-check"></i>',
      cancelButtonContent: '<i class="fad fa-times"></i>',
      inputClass: 'userInp'
    },
    delete: {
      deleteButtonContent: '<i class="fad fa-minus-square"></i>',
      confirmDelete: true,
    },
    columns: {
      uid: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
    },
    defaultStyle: false,
    attr: {
      class: 'table table-bordered table-striped' // this is custom table scss or css class for table
    }
  };

  source: LocalDataSource = new LocalDataSource();

  users: AppUser[];

  constructor(private userService: UserService) {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  ngOnInit() {
    this.userSub = this.userService.getAll().subscribe(list => {
      this.users = list;
      this.source.load(list)
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
