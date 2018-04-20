import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-success-credit',
  templateUrl: './success-credit.component.html'
})
export class SuccessCreditComponent implements OnInit {
  credit:number = 0
  constructor(private activadedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activadedRoute.params.subscribe(params => {
      this.credit = params['credit']
    })
  }

}
