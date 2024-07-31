import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrizeModalComponent } from "../prize-modal/prize-modal.component";
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart, { ChartItem } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-spin',
  standalone: true,
  imports: [CommonModule, RouterModule, PrizeModalComponent],
  templateUrl: './spin.component.html',
  styleUrl: './spin.component.scss',
})
export class SpinComponent implements AfterViewInit {
  @ViewChild('wheel', { static: true })
  wheelRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('spinBtn', { static: true })
  spinBtnRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('finalValue', { static: true })
  finalValueRef!: ElementRef<HTMLDivElement>;
  @ViewChild('spinSound', { static: true }) spinSoundRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('winSound', { static: true }) winSoundRef!: ElementRef<HTMLAudioElement>;

  totalSpinsAvailable = 10;
  completedSpins = 5;
  awardedMoneyToday = '$100';
  totalWinnings = '$500';

 
  private rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 }
  ];

  private data = [16, 16, 16, 16, 16, 16];
  private pieColors = [
    "#8b35bc", "#b163da", "#8b35bc", "#b163da",
    "#8b35bc", "#b163da"
  ];

  private myChart: any;
  private count = 0;
  private resultValue = 101;

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  initializeChart() {
    const ctx = this.wheelRef.nativeElement.getContext('2d') as ChartItem | null;
    if (ctx) {
      this.myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: {
          labels: [1, 2, 3, 4, 5, 6],
          datasets: [{
            backgroundColor: this.pieColors,
            data: this.data,
          }],
        },
        options: {
          responsive: true,
          animation: { duration: 0 },
          plugins: {
            tooltip: {
              enabled: false
            },
            legend: { display: false },
            datalabels: {
              color: "#ffffff",
              formatter: (_: any, context: any) => context.chart.data.labels[context.dataIndex],
              font: { size: 24 },
            },
          },
        },
      });
    }
  }

  valueGenerator(angleValue: number) {
    for (let i of this.rotationValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        this.finalValueRef.nativeElement.innerHTML = `<p>You Won Rs: ${i.value}</p>`;
        this.spinBtnRef.nativeElement.disabled = false;
        // this.winSoundRef.nativeElement.play();
        break;
      }
    }
  }

  spin() {
    this.spinBtnRef.nativeElement.disabled = true;
    this.finalValueRef.nativeElement.innerHTML = `<p>Good Luck!</p>`;
    this.spinSoundRef.nativeElement.play();

    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
      this.myChart.options.rotation = this.myChart.options.rotation + this.resultValue;
      this.myChart.update();

      if (this.myChart.options.rotation >= 360) {
        this.count += 1;
        this.resultValue -= 5;
        this.myChart.options.rotation = 0;
      } else if (this.count > 15 && this.myChart.options.rotation === randomDegree) {
        this.valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        this.count = 0;
        this.resultValue = 101;
      }
    }, 10);
  }
}