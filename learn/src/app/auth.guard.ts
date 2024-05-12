import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkUserLogin(route, url);
  }

  private checkUserLogin(route: ActivatedRouteSnapshot, url: string): boolean {
    if (this.userService.isLoggedIn()) {
      const userRole = this.userService.getRole();
      if (userRole && route.data['role'] && route.data['role'].indexOf(userRole) !== -1) {
        return true; // L'utilisateur est authentifié et son rôle est autorisé pour cette route
      } else {
        // L'utilisateur est authentifié mais son rôle ne lui permet pas d'accéder à cette route
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }
  
    // L'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    this.router.navigate(['/login']);
    return false;
  }
}
