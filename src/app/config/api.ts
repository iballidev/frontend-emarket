import { environment } from 'src/environments/environment';

export const baseUrl = environment.production ? 'https://api.emarket.com/whatever' : 'http://localhost:8081'
export const authUrl = baseUrl + '/auth';
// export const productsUrl = baseUrl + '/products';
// export const cartUrl = baseUrl + '/cart';
// export const wishlistUrl = baseUrl + '/wishlist';