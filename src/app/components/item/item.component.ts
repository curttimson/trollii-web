import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { GoogleAnalyticsService } from '../../google-analytics.service';
import { ListStoreService } from '../../services/store/list-store.service';
import { ItemService } from '../../item.service';

import { List } from '../../models/list';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() listid: string;
  @Input() item: Item;

  removing: Boolean;

  constructor(
    private snackBar: MatSnackBar,
    private googleAnalyticsService: GoogleAnalyticsService,
    private listStoreService: ListStoreService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.removing = false;
  }

  removeItem(item: Item){
    this.removing = true;
    this.itemService.removeItem(this.listid, item._id)
      .subscribe(itemResponse => {
        this.listStoreService.updateListItems(itemResponse._id, itemResponse.items);
        this.snackBar.open(`Item "${item.name}" removed`, '', { duration: 1000 });
        this.googleAnalyticsService.emitEvent('Item', 'Remove');
      });
  }

}
