import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageType } from '../enums/message-type.enum';
import { MessageService } from '../services/message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(environment.httpRetry),
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.error instanceof ErrorEvent) {
          this.clientSideError(errorResponse.error);
        } else {
          this.serverSideError(errorResponse, request);
        }
        return throwError(errorResponse);
      }),
    );
  }

  clientSideError(error: ErrorEvent): void {
    this.messageService.sendMessage(error.error.message, MessageType.error);
  }

  serverSideError(error: HttpErrorResponse, request: HttpRequest<any>): void {
    switch (error.status) {
      case 401: {
        this.messageService.sendMessage('Twoja sesja wygasła. Zaloguj się ponownie', MessageType.warning);
        break;
      }
      case 403: {
        this.messageService.sendMessage('Nie masz uprawnień do tego zasobu', MessageType.warning);
        break;
      }
      case 404: {
        this.messageService.sendMessage('Podany zasób nie istnieje', MessageType.warning);
        break;
      }
      case 500: {
        this.messageService.sendMessage('Wystąpił nieoczekiwany problem. Proszę spróbuj ponownie', MessageType.error);
        break;
      }
      default: {
        this.messageService.sendMessage(`(${error.status}) ${error.message}`, MessageType.error);
        break;
      }
    }
  }
}
