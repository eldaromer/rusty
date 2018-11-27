import { Component } from '@angular/core';
import { environment} from "../environments/environment";

import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rusty';
  room = "";
  private socket;

  constructor() {
    this.socket = io.connect(environment.api);
    this.socket.on('tick', () => {
      console.log('tick')
    })
  }

  join(event) {
    this.socket.emit('join', this.room)
  }

}
