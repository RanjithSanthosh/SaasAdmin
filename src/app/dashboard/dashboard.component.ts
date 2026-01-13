import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MainSectionComponent } from '../components/main-section/main-section.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderComponent, SidebarComponent, MainSectionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSidebarOpen = false; // Default closed on mobile, or handle logic

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
