import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AppUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.scss']
})
export class AdminListUsersComponent implements OnInit {

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
    // const data = this.service.getData();
    // this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  ngOnInit() {
    this.userService.getAll().subscribe(list => {
      // console.log(list)
      this.users = list;
      this.source.load(list)
    });
  }

}
