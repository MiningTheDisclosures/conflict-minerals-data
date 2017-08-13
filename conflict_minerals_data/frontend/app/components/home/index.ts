import { 
  Component 
} from '@angular/core';

import { Globals } from '../../globals';

@Component({
  templateUrl: 'index.html',
  styleUrls: ['index.css'],
})
export 
class Home { 
  year: number;
 
  constructor(private globals: Globals) { }

  get years() { return this.globals.YEARS}

}
