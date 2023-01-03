import { RegisterService } from "./register-update.service";

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

describe("RegisterService", () => {
 	let service: RegisterService = null;
    let mockBackend: MockBackend = null;
    beforeEach(async(() => {
	    TestBed.configureTestingModule({
	    	providers: [RegisterService],
	    	imports: [
	    		HttpModule
	      	]
	    });  
	}));


	const user = {
		"gender": "Male",
		"name": "harinder singh",
		"picture": "",
		"phone_number": "+917889114562",
		"subscription": "silver",
		"qualification": "DEV",
		"user_url": "",
		"locale": "Patiala",
		"UserGroup": "User",
		"username": "harinder40",
		"password": "User@123",
		"code": "9mitw5v7pNQdzFgn",
		"email": "harinder40@yopmail.com"
	};
  	
	// service = getTestBed().get(RegisterService);

	beforeEach(inject([RegisterService], (regService: RegisterService) => {
		service = regService;
	}));

 	it('#RegisterService should exist', () => {
        expect(service).toBeDefined();
    });
   	

    it('#RegisterService should check email', (done) => {
	    service.checkEmail(user.email).subscribe((value: any) => {
	      expect(value.success).toBe(true);
	      done();
	    });
	});

	it('#RegisterService should check username', (done) => {
	    service.checkUserName(user.username).subscribe((value: any) => {
	      expect(value.success).toBe(true);
	      done();
	    });
	});

	it('#RegisterService should check Invitation code', (done) => {        	
	    service.checkInvitationCode(user.code).subscribe((value: any) => {
	      expect(value.success).toBe(true);
	      done();
	    });
	});

	it('#RegisterService should create user on cognito', (done) => {   
	    service.register(user).subscribe((value: any) => {
	      expect(value.success).toBe(true);
	      done();
	    });
	});
			
	

});