import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessageType } from '../enums/message-type.enum';
import { Message } from '../interfaces/message.interface';
import { MessageModel } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  public subject = new Subject<Message>();

  sendMessage(text: string, type: MessageType = MessageType.success): void {
    const model: MessageModel = new MessageModel();
    model.text = text;
    model.type = type;
    model.setTimeoutByType();
    this.subject.next(model);
  }

  sendMessageByObject(message: Message): void {
    const model: MessageModel = new MessageModel();
    model.text = message.text;
    model.type = message.type;
    model.dismissible = message.dismissible;
    model.setTimeoutByType();
    this.subject.next(model);
  }

  clearMessages(): void {
    this.subject.complete();
  }

  getMessage(): Observable<Message> {
    return this.subject.asObservable();
  }
}
