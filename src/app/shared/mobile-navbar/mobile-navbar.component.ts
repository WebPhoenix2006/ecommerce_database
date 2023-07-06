import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css']
})
export class MobileNavbarComponent {
  isMenuOpen: boolean = false;
  menuItems: string[] = ['Home', 'About', 'Services', 'Contact'];
  isMobileView: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileView = event.target.innerWidth <= 768; // Adjust the breakpoint as needed
    if (this.isMobileView) {
      this.isMenuOpen = false; // Close the menu when switching to mobile view
    }
  }
}
