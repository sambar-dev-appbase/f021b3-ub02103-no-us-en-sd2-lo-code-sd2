import { LoginService } from "./login.service";

import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';

import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

describe("LoginService", () => {
	
 	let service: LoginService = null;
    let mockBackend: MockBackend = null;
    beforeEach(async(() => {
	    TestBed.configureTestingModule({
	    	providers: [LoginService],
	    	imports: [
	    		HttpModule
	      	]
	    });  
	}));


	const user = {
		"UserGroup": "User",
		"username": "harinder40",
		"password": "User@123",
		"email": "harinder40@yopmail.com"
	};

	beforeEach(inject([LoginService], (regService: LoginService) => {
		service = regService;
	}));

 	it('#LoginService should exist', () => {
        expect(service).toBeDefined();
    });
   	

 
	

});