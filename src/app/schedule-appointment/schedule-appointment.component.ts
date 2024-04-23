import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarA11y, CalendarDateFormatter, CalendarEvent, CalendarModule, CalendarUtils, DateAdapter} from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [ CommonModule, CalendarModule],
  providers: [
    CalendarUtils, 
    CalendarA11y,
    CalendarDateFormatter,
    { provide: DateAdapter, useFactory: adapterFactory }
  ],
  templateUrl: './schedule-appointment.component.html',
  styleUrl: './schedule-appointment.component.css'
})
export class ScheduleAppointmentComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor() {
    this.fetchEvents();
  }

  dayClicked(event: any): void {
    const date = event.day.date; 
    const events = event.day.events;
  
    const eventTitle = prompt('Add an Event Title:');
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        start: startOfDay(date),
        allDay: true
      };
      this.events.push(newEvent);
      this.saveEvents();
    }
  }
  

  saveEvents(): void {
    try {
      localStorage.setItem('appointments', JSON.stringify(this.events));
      console.log('Saved events:', this.events);
    } catch (error) {
      console.error('Failed to save events to local storage:', error);
    }
  }
  
  fetchEvents(): void {
    try {
      this.events = JSON.parse(localStorage.getItem('appointments') || '[]');
      console.log('Fetched events:', this.events);
    } catch (error) {
      console.error('Failed to fetch events from local storage:', error);
    }
  }

  addEvent(title: string, date: Date): void {
    const newEvent = {
      title: title,
      start: startOfDay(date),
      allDay: true
    };
    this.events = [...this.events, newEvent];  
    this.saveEvents();
  }
}
