import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-dashboard',templateUrl:'./dashboard.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  private chart?: Chart;
  constructor(public readonly data:FieldOpsDataService) {}
  ngAfterViewInit():void {
    Chart.register(...registerables);
    const canvas=document.getElementById('inspectionChart') as HTMLCanvasElement|null;
    const ctx=canvas?.getContext('2d');
    if(!ctx)return;
    this.chart=new Chart(ctx,{type:'doughnut',data:{labels:['Aprovadas','Em andamento','Em revisão','Reprovadas'],datasets:[{data:[64,22,10,4],backgroundColor:['#198754','#0d6efd','#ffc107','#dc3545'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'68%',plugins:{legend:{position:'bottom'}}}});
  }
  ngOnDestroy():void { this.chart?.destroy(); }
}
