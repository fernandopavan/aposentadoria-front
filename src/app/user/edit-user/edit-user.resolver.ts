import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../../service/user.service';

@Injectable()
export class EditUserResolver implements Resolve<any> {

  constructor(public userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      const id = route.paramMap.get('id');
      this.userService.getById(id)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    });
  }
}
