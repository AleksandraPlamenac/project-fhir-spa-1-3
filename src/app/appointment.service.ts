import { Injectable } from '@angular/core';
import { startOfDay } from 'date-fns';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private eventSource = new BehaviorSubject<any[]>(this.loadEvents());
  events = this.eventSource.asObservable();

  constructor() { }

  loadEvents(): any[] {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
  }

  saveEvents(events: any[]): void {
    localStorage.setItem('appointments', JSON.stringify(events));
    this.eventSource.next(events);
  }

  addEvent(title: string, date: Date): void {
    const newEvent = {
      title: title,
      start: startOfDay(date),
      allDay: true
    };
    const updatedEvents = [...this.eventSource.getValue(), newEvent]; 
    this.saveEvents(updatedEvents);
  }
}
