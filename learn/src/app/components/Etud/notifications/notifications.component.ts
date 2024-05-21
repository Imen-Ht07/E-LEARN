import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.getAllNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}