import { Component,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../theme/services';

@Component({
  selector: 'home',
  templateUrl: './home.html',
})
export class Home {

  

  constructor(public router: Router,public route: ActivatedRoute) {

  }
  

  ngOnInit() {
        
        this.router.navigate(['/login']);
    }

}
