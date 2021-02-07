
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginToken } from '../services/auth/logintoken/logintoken';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import { Path } from '../services/config/path';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    providers: [ LoginToken, FlashMessagesService ]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    bodyClass = '';
    // private pathObj: Path;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private flashMessage: FlashMessagesService,
        private tokenData: LoginToken,
        private spinnerService: Ng4LoadingSpinnerService,
        private _authServ: AuthService) {
        }

    ngOnInit() {
    }
    login() {
        this.loading = true;
        this.spinnerService = new Ng4LoadingSpinnerService();
        this._authServ.login(this.model.email, this.model.password)
            .subscribe(
            data => {
                    console.log('#### login response...');
                    console.log(data);
                    const response = data;
            if (response !== undefined && response.status) {
                        this.loading = false;
                        this.router.navigated = false;
                        // Check secure login token :: JWT
                        if (response.authToken !== undefined && response.authToken !== null) {
                            this.tokenData.token     =   response.authToken;
                            localStorage.setItem('loginToken', response.authToken);
                        }
                        this.spinnerService.show();
                        setTimeout(()=>{
                            this.router.navigateByUrl('admin/dashboard');
                            this.spinnerService.hide();
                        },500)
                        
      }
      if (!data.status) {
          this.spinnerService.hide();
          this.flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
          this.loading = false;
      }
      });
    }
}
