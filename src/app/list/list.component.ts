import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';
import { ListService } from '../list.service';

import { List } from '../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    ListService
  ]
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
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

  removeList() {
    console.log(`remove list ${this.list._id}`);
  }

}
