import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() rname: string = '';
  @Input() id: string = '';
  showRecipeName: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    // Display the recipe name in sidebar when the recipe detail page is opened
    if(changes['rname'] && !changes['rname']['firstChange']) {
      this.rname = changes['rname']['currentValue'];
      this.id = changes['id']['currentValue'];
      // Flag if recipe name can be shown
      this.showRecipeName = true;
    }
  }

}
