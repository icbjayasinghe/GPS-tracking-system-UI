import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router'

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/user-profile', title: 'UserProfile',  icon:'person', class: '' },
    // { path: '/user-list', title: 'Users',  icon:'supervisor_account', class: '' },
    // { path: '/vehicle-list', title: 'Vehicle List', icon:'location_on', class:''},
    // { path: '/check-point-list', title: 'Check Point',  icon:'content_paste', class: '' },
    //{ path: '/table-list', title: 'Vehicles',  icon:'content_paste', class: '' },
    { path: '/vehicleMap', title: 'VehicleMap',  icon:'local_shipping', class: '' },
    { path: '/maps', title: 'Maps',  icon:'history', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'equalizer', class: '' },
    { path: '/reports', title: 'Reports',  icon:'chrome_reader_mode', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' }
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 950) {
          return false;
      }
      return true;
  };

  logoutUser() {
    this.auth.logout();
    this.router.navigate(['/login']);
    window.location.reload();
    return false;
}
}

