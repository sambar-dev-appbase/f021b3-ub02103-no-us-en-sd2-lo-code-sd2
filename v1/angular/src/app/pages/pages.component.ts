import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { PAGES_MENU_AUTHOR } from './pages.menu.author';
// import {CognitoCallback, UserLoginService,UserParametersService, LoggedInCallback} from "./cognito-service/cognito.service";

@Component({
  selector: 'pages',
  template: `
    <!--<ba-sidebar></ba-sidebar>-->
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <div class="top-space-padding"></div>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <!--<div class="al-footer-right">All rights reserved</div>-->
      <div class="al-footer-main clearfix">
      <!-- h4 class="trademark_text">TRADEDOG is a trademark of SAMURAI Technology Corporation, a Delaware Company.</h4 -->
        <div class="al-copy">Copyright &copy; 2022<a href="/" target="_blank"> SAMBAR</a> is a trademark of SAMURAI Technology Corporation, a Delaware Company.</div>
        <!--<ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>-->
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService) {

        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

  }


  ngOnInit() {
    //this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
