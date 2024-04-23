import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Patient } from '../models/patient.model';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleAppointmentComponent } from '../schedule-appointment/schedule-appointment.component';
import { CalendarModule, CalendarUtils } from 'angular-calendar';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, HttpClientModule, ScheduleAppointmentComponent, CalendarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentPatient: Patient | null = null;
  events: any[] = [];
  appointments: any[] = [];  // Declare the 'appointments' array

  constructor(private authService: AuthService, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.currentPatient = this.authService.getCurrentPatient();
    this.appointmentService.events.subscribe(events => {
      this.events = events;
      this.appointments = events; // Optionally synchronize 'appointments' with 'events'
    });
  }

  createAppointment(title: string, date: Date): void {
    this.appointmentService.addEvent(title, date);
  }
}
