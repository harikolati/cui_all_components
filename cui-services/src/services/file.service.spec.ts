import { TestBed, inject } from '@angular/core/testing';

import { FileService, FileInfo, FileType } from './file.service';

describe('FileService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FileService],
		});
	});

	it('should ...', inject([FileService], (service: FileService) => {
		expect(service).toBeTruthy();
	}));

	it('should retrieve file info by extension', inject([FileService], (service: FileService) => {
		const fileInfo: FileInfo = service.getFileInfo('txt');
		expect(fileInfo.type).toEqual(FileType.TEXT);
	}));

	it('should trigger file download', inject([FileService], (service: FileService) => {
		expect(service.triggerDownload).toBeTruthy();
		expect(service.triggerDownload('test', 'test.txt')).toBeUndefined();
	}));

	it('should trigger file open', inject([FileService], (service: FileService) => {
		expect(service.triggerOpenFile).toBeTruthy();
		expect(service.triggerOpenFile('test')).toBeUndefined();
	}));

	it('should encode base64', inject([FileService], (service: FileService) => {
		expect(service.encodeBase64('test')).toEqual('dGVzdA==');
	}));

	it('should decode base64', inject([FileService], (service: FileService) => {
		expect(service.decodeBase64('dGVzdA==')).toEqual('test');
	}));
});
