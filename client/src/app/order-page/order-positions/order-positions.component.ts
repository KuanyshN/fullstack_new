import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Position} from "../../shared/interfaces";
import {PositionsService} from "../../shared/services/positions.service";
import {ActivatedRoute, Params} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {OrderService} from "../order.service";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(private positionsService: PositionsService,
              private route: ActivatedRoute,
              private order: OrderService) {
  }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.positionsService.fetch(params['id'])
        }),
        map((positions: Position[]) => {
          return positions.map(position => {
            position.quantity = 1
            return position
          })
        })
      )
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Добавенео x${position.quantity}`)
    this.order.add(position)
  }

}
