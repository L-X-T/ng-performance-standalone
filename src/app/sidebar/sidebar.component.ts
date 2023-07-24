import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuicklinkModule } from 'ngx-quicklink';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, QuicklinkModule],
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent {}
