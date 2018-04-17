import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar, MatDialog } from '@angular/material';

import { AuthService } from '../auth.service';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { ListService } from '../list.service';
import { ListStoreService } from '../list-store.service';
import { ItemService } from '../item.service';
import { SidebarService } from '../sidebar.service';

import { ListInviteComponent } from '../list-invite/list-invite.component';

import { List } from '../models/list';
import { Item } from '../models/item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    GoogleAnalyticsService,
    ListService,
    ItemService
  ]
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private googleAnalyticsService: GoogleAnalyticsService,
    private listService: ListService,
    private listStoreService: ListStoreService,
    private itemService: ItemService,
    private sidebarService: SidebarService    
  ) { }

  list: List;

  ngOnInit() {

    this.getList();

    this.route.params.subscribe( params => {
      this.getList();
    });

  }

  getList() {
    this.listService.getLists()
      .subscribe(data => {
        this.list = data.find(list => list._id === this.route.snapshot.paramMap.get('id'))
      })
  }

  inviteMembers(){
    let dialogRef = this.dialog.open(ListInviteComponent, {
      width: '250px',
      data: { listid: this.list._id, memberemail: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result', result);
      // this.animal = result;
    });
  }

  removeList() {
    this.listService.deleteList(this.list)
      .subscribe(lists => {
        this.snackBar.open(`List "${this.list.name}" deleted`, '', {
          duration: 1000
        });
        this.googleAnalyticsService.emitEvent('List', 'Remove');
        this.listStoreService.lists = lists;
        this.router.navigate(['']);
      });
  }

  //Item Methods
  addItem(name: string){
    this.itemService.addItem(this.list._id, name)
      .subscribe(data => {
        this.snackBar.open(`Item "${name}" added`, '', {
          duration: 1000
        });
        this.googleAnalyticsService.emitEvent('Item', 'Add');
        this.list = data;
      });
  }

  removeItem(item: Item){
    this.itemService.removeItem(this.list._id, item._id)
      .subscribe(list => {
        this.snackBar.open(`Item "${item.name}" removed`, '', {
          duration: 1000
        });
        this.googleAnalyticsService.emitEvent('Item', 'Remove');
        this.list = list;
      });
  }

}
