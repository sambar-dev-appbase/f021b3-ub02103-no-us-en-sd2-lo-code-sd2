import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { BaMenuService } from '../../services';
import { GlobalState } from '../../../global.state';

import 'style-loader!./baMenu.scss';

@Component({
  selector: 'ba-menu',
  templateUrl: './baMenu.html'
})
export class BaMenu {

  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  protected _menuItemsSub: Subscription;
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;
  public isMenuCollapsed:boolean;
  public checkauthormenu:boolean = false;

  constructor(private _router: Router, private _service: BaMenuService,private _state: GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    //this.userService.isAuthenticated(this);
    this.checkauthormenu = false;
  }
  // isLoggedIn(message: string, isLoggedIn: boolean,group: string,user: string) {
      
  //       if (isLoggedIn){
  //           //this.username = user;
  //           //this.userParams.getParameters(this);

  //           let userGroup = localStorage.getItem("user_group");

  //            if(userGroup == 'author' || userGroup == 'analyst'){

  //              this.checkauthormenu = true;
  //            }else{
  //              this.checkauthormenu = false;
  //            }


  //       }else{

              
  //       }
  //   }

  //   callback() {

  //   }

    // callbackWithParam(result: any) {
      
    //     for (let i = 0; i < result.length; i++) {

    //         if(result[i].getName() == 'custom:user_group'){
    //             //console.log(' I am Author ', result[i].getValue());
    //             //result[i].getValue() == 'Author';
    //             if(result[i].getValue() == 'Author'){
    //                this.checkauthormenu = true;
    //              }else{
    //                this.checkauthormenu = false;
    //              }
    //          }
    //       }
    // }
  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    this.selectMenuAndNotify();
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  public ngOnInit(): void {
    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
    this._menuItemsSub.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 86;
  }

  public toggleSubMenu($event): boolean {
    let submenu = jQuery($event.currentTarget).next();
     if(!$event.item.expanded) {
        for (var key in this.menuItems) {
          this.menuItems[key].expanded = false;
        }
        jQuery("ul.al-sidebar-sublist").slideUp(400, "linear");
      }

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle(400, "linear");
    }

    return false;
  }
}
