import { environment } from './../environments/environment.prod';
export const TRUFFLE_API = {
    baseUrl: environment.api,
    basePictureUrl: environment.bucket_img
}