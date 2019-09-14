import { Injectable } from '@angular/core';


@Injectable()
export class ImageUtilService {

    constructor() {}   
    
    dataUriToBlob(dataURI) {

        var byteString = atob(dataURI.split(',')[1])
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i) 
        }
        
        return new Blob([ab], {type: mimeString})
    }    

    public blobToFile = (theBlob: Blob, fileName:string): File => {
        var b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;
    
        //Cast to a File() type
        return <File>theBlob;
    }
}