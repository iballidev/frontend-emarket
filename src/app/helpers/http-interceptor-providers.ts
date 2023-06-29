import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";
import { RequestInterceptor } from "./request.interceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ];