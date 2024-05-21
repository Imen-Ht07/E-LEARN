import { Component , OnInit} from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-dashbord-etud',
  templateUrl: './dashbord-etud.component.html',
  styleUrls: ['./dashbord-etud.component.css']
})
export class DashbordEtudComponent implements OnInit {
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