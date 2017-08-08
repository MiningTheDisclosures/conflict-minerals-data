import { 
  Component 
} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <header>Conflict Minerals Data</header>
  <nav>
      <a routerLink="/companies-by-year/2017" routerLinkActive="active">2017</a>
  </nav>
  <router-outlet></router-outlet>
  `,
})

export 
class AppComponent { }
