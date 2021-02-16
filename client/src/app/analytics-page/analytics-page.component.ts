import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfaces";
import {Chart} from 'chart.js'
import {Subscription} from "rxjs";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  average: number
  pending = true
  aSub: Subscription

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit(): void {

    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'

    }

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average

      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      // *** Gain***
      // gainConfig.labels.push('17.02.2021')
      // gainConfig.data.push(10500)
      // gainConfig.labels.push('18.02.2021')
      // gainConfig.data.push(5500)
      // *** Gain***
      //
      //
      // *** Order***
      // orderConfig.labels.push('17.02.2021')
      // orderConfig.data.push(15)
      // orderConfig.labels.push('18.02.2021')
      // orderConfig.data.push(7)
      // *** Order***


      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'

      new Chart(gainCtx, createChartConfig(gainConfig))
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending = false
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}


function createChartConfig({labels, data, label, color}) {

  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
