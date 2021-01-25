import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { UserPage } from 'src/app/model/userPage';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  searchValue = '';
  users: User[] = [];
  pageUser: UserPage;
  selectedPage = 0;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getPageUser(0);
  }

  viewDetails(item) {
    this.router.navigate(['/edit-user/' + item.id]);
  }

  add() {
    this.router.navigate(['/add-user']);
  }

  searchByName() {
    // let value = this.searchValue.toLowerCase();
    if (this.searchValue == null) {
      this.ngOnInit();
      return;
    }

    this.userService.findByName(this.searchValue)
      .subscribe(result => {
        this.users = result;
      });
  }

  getPageUser(page: number): void {
    this.userService.findAll(page)
      .subscribe(response => {
        this.pageUser = response;
        this.users = response.content;
      });
  }

  onSelect(page: number): void {
    this.selectedPage = page;
    this.getPageUser(page);
  }

}
