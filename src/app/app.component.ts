import { Component } from '@angular/core';
import { BarometerViewComponent } from "./components/barometer-view/barometer-view.component";
import { MatCardModule } from '@angular/material/card';
import { SmhiFullViewComponent } from "./components/smhi-full-view/smhi-full-view.component";
import { SmhiViewComponent } from "./components/smhi-view/smhi-view.component";
import { NewsViewComponent } from "./components/news-view/news-view.component";
import { NewsFullViewComponent } from "./components/news-full-view/news-full-view.component";
import { CalendarViewComponent } from "./components/calendar-view/calendar-view.component";
import { CalendarFullViewComponent } from "./components/calendar-full-view/calendar-full-view.component";
import { InfoViewComponent } from "./components/info-view/info-view.component";
import { FilestreamViewComponent } from "./components/filestream-view/filestream-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BarometerViewComponent, MatCardModule, SmhiFullViewComponent, SmhiViewComponent, NewsViewComponent, NewsFullViewComponent, CalendarViewComponent, CalendarFullViewComponent, InfoViewComponent, FilestreamViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kiosk';
}
