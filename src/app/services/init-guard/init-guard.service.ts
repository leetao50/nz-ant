import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { INIT_FLAG } from '../local-storage/local-storage.namespace';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InitGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const init = !!this.store.get(INIT_FLAG);

        if(state.url.includes('setup')&&init){
          this.router.navigateByUrl('/main');
          return false;
        }

        if(!state.url.includes('setup')&&!init){
          this.router.navigateByUrl('/setup');
          return false;
        }

        return true;
  }

  constructor(private store: LocalStorageService,
    private router: Router,) { }
  
}
