
export class Path {
public API_PATH: string;
public API_IMAGE_PATH: string;
public LIST_MESSAGE: string;

public adminLoginStatus: boolean;

    constructor() {
        this.API_PATH           =   'http://localhost:8085/';
        this.API_IMAGE_PATH     =   'http://192.168.0.15:8085/uploads/';

        this.adminLoginStatus   =   false; 
    }
}
