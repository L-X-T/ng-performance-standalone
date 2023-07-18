import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  sidebarVisible = false;

  sidebarToggle(): void {
    const body = document.getElementsByTagName('body')[0];

    if (!this.sidebarVisible) {
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      body.classList.remove('nav-open');
      this.sidebarVisible = false;
    }
  }
}
