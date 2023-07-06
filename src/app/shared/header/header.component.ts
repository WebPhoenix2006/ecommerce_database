import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isSticky: boolean = false;
  isSidebarActive: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 80; // Adjust the scroll position threshold as needed
  }
  @Output() openSidebar: EventEmitter<void> = new EventEmitter<void>();


  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  closeSidebar() {
    this.isSidebarActive = false;
  }
  toggleCartSide() {
    this.openSidebar.emit();
  }
}
