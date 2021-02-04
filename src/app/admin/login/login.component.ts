
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
            // this.pathObj    =   new Path();
        }

    ngOnInit() {
    }

    login() {
        this.loading = true;
        this.spinnerService = new Ng4LoadingSpinnerService();
        this.spinnerService.show();

        setTimeout(() => {
            this.tokenData.token     =   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            this.tokenData.userId    =   2;
            this.tokenData.userData  =   {
                email: "das.abhishek77@gmail.com",
                id: 2
            };
            localStorage.setItem('loginToken', JSON.stringify(this.tokenData));
            this.router.navigateByUrl('admin/dashboard');
                        this.spinnerService.hide();
        }, 5000)


    //     this._authServ.login(this.model.username, this.model.password)
    //         .subscribe(
    //         data => {
    //                 console.log('#### login response...');
    //                 console.log(data);
    //                 const response = data;
    //         if (response !== undefined && response.status) {
    //                     this.loading = false;
    //                     this.router.navigated = false;
    //                     // Check secure login token :: JWT
    //                     if (response.loginToken !== undefined && response.loginToken !== null) {
    //                         // this.tokenService.addToken(data.loginToken);
    //                         this.tokenData.token     =   response.loginToken;
    //                         this.tokenData.userId    =   response.user_id;
    //                         this.tokenData.userData  =   data;
    //                         // this.pathObj.adminLoginStatus   =   true;
    //                         localStorage.setItem('loginToken', JSON.stringify(this.tokenData));
    //                     }
    //                     // alert('from login: '+this.pathObj.adminLoginStatus);
    //                     this.router.navigateByUrl('admin/dashboard');
    //                     this.spinnerService.hide();
    //   }
    //   if (!data.status) {
    //       this.spinnerService.hide();
    //       this.flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 700 });
    //       this.loading = false;
    //   }
    //   });
    }
}
