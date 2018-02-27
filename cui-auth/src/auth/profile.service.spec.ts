/* tslint:disable */
import {
	TestBed,
	inject
} from '@angular/core/testing';
import {
	Response,
	ResponseOptions
} from '@angular/http';
import {
	HttpClientModule
} from '@angular/common/http';

import {
	ProfileService
} from './profile.service';

let cisco = {
	bearerToken: 'test',
	params: {
		test: 'test'
	},
	user: {
		roles: {
			test: 'test'
		}
	},
	account: {
		test: 'test',
		autoCreated: false
	}
}

let cpr = {
	pf_auth_user_level: '2',
	pf_auth_casemanagement: '2',
	pf_auth_firstname: 'blake',
	pf_auth_lastname: 'callens'
}

describe('ProfileService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [ProfileService]
		});
	});
	it('should ...', inject([ProfileService], (service: ProfileService) => {
		expect(service).toBeTruthy();
	}));
	it('should set and get the cisco object', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.cisco).toEqual(cisco);
	}));
	it('should retrieve the profile', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getProfile()).toEqual(cisco.user);
	}));
	it('should retrieve the bearer token', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getBearerToken()).toEqual('test');
	}));
	it('should retrieve params', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getParams().test).toEqual('test');
	}));
	it('should retrieve a single profile role', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getProfileRole('test')).toEqual('test');
	}));
	it('should retrieve default profile level', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getProfileLevel()).toEqual(0);
	}));
	it('should retrieve default profile case flag', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getProfileCaseFlag()).toEqual(3);
	}));
	it('should update cpr and retrieve profile level', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		service.cpr = cpr;
		expect(service.getProfileLevel()).toEqual(2);
	}));
	it('should retrieve profile case flag', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getProfileCaseFlag()).toEqual(2);
	}));
	it('should retrieve the user\'s full name', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getProfileFullname()).toEqual('Blake Callens');
	}));
	it('should retrieve account', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		expect(service.getAccount().test).toEqual('test');
	}));
	it('should retrieve a gravatar url', inject([ProfileService], (service: ProfileService) => {
		let gravatarUrl: string = service.getGravatarUrl('blcallen@cisco.com');
		console.log(gravatarUrl);
		expect(gravatarUrl).toEqual('http://www.gravatar.com/avatar/968cf9e07e312e7a3914ca4242d86ac7.jpg?s=80');
	}));
	it('should update an object\'s full name', inject([ProfileService], (service: ProfileService) => {
		var update: any = {
			firstName: 'john',
			lastName: 'doe'
		};
		service.cisco = cisco;
		service.updateProfile(update)
		expect(update.fullname).toEqual('John Doe');
	}));
	it('should update the profile\'s full name', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		service.updateProfileFullname()
		expect(service.getProfileFullname()).toEqual('Blake Callens');
	}));
	it('should update session ID', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		service.updateSessionId({
			session: 'testing'
		})
		expect(service.getSessionId().session).toEqual('testing');
	}));
	it('should update account auto-created', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		service.updateAccountCreated(true)
		expect(cisco.account.autoCreated).toEqual(true);
	}));
	it('should generate a session id', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		service.updateSessionId(null);
		expect(service.getSessionId().session.length).toEqual(36);
		cisco.user = undefined;
		expect(service.getSessionId().session.length).toEqual(36);
	}));
	it('should add a new cpr if none exists', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		cisco.user = undefined;
		service.cpr = cpr;
		expect(service.getProfileLevel()).toEqual(2);
	}));
	it('should add a new session ID if none exists', inject([ProfileService], (service: ProfileService) => {
		service.cisco = cisco;
		cisco.user = undefined;
		service.updateSessionId({
			session: 'testing'
		})
		expect(service.getSessionId().session).toEqual('testing');
	}));
});
