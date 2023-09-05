import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { UsersComponent } from '../../users/users.component';
import { UserDetailsComponent } from '../../user-details/user-details.component';
import { TechniciansComponent } from 'app/pages/technicians/technicians.component';
import { ServicesComponent } from 'app/pages/services-page/services.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'technicians', component:  TechniciansComponent},
    { path: 'services', component: ServicesComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user-details', component: UserDetailsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
];
