import { environment } from 'src/environments/environment';

export const baseUrl = environment.production
  ? 'https://api.emarket.com/whatever'
  : 'http://localhost:8081';
export const authUrl = baseUrl + '/auth';
export const productCategoryUrl = baseUrl + '/product-category';
export const refreshTokenUrl = baseUrl + '/refresh-token';
export const userProfileUrl = baseUrl + '/user-profile';
// export const productsUrl = baseUrl + '/products';
// export const cartUrl = baseUrl + '/cart';
// export const wishlistUrl = baseUrl + '/wishlist';
