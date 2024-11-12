import { Component } from '@angular/core';
import { BarometerViewComponent } from "./components/barometer-view/barometer-view.component";
import { MatCardModule } from '@angular/material/card';
import { SmhiFullViewComponent } from "./components/smhi-full-view/smhi-full-view.component";
import { SmhiViewComponent } from "./components/smhi-view/smhi-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BarometerViewComponent, MatCardModule, SmhiFullViewComponent, SmhiViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kiosk';
}
