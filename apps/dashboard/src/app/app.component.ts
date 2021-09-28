import { Component, OnInit } from '@angular/core';
import { UserService } from '@ng-mfe/shared/data-access-user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ng-mfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = this.userService.isUserLoggedIn$;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn$.pipe(
      distinctUntilChanged()
    ).subscribe(async (loggedIn) => {
      if (!loggedIn) {
        this.router.navigateByUrl('login');
      } else {
        this.router.navigateByUrl('');
      }
    });
  }

}
