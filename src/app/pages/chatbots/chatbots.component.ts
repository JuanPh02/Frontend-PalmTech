import { Component, OnInit } from '@angular/core';
import { Chatbot } from 'app/models/chatbot.model';

@Component({
  selector: 'app-chatbots',
  templateUrl: './chatbots.component.html',
  styleUrls: ['./chatbots.component.css']
})
export class ChatbotsComponent implements OnInit {

  chatbots: Chatbot[] = [
    {
      'botID': 'd4f54-g89094-34dfg',
      'name': 'testbot1',
      'userEmail': 'juan@stelliontech.com',
      'bucket': 'https://s3.bucket.co/idbot',
      'active': false
    },
    {
      'botID': 'd4f54-g89094-34dfg',
      'name': 'testbot1',
      'userEmail': 'juan@stelliontech.com',
      'bucket': 'https://s3.bucket.co/idbot',
      'active': true
    },
    {
      'botID': 'd4f54-g89094-34dfg',
      'name': 'testbot1',
      'userEmail': 'juan@stelliontech.com',
      'bucket': 'https://s3.bucket.co/idbot',
      'active': false
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
