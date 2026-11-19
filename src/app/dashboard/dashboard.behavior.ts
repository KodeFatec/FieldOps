// @ts-nocheck
import { Chart } from 'chart.js';
export function initializeDashboardPage(): void {

    const ctx = document.getElementById('inspecoesChart');

    new Chart(ctx, {
        data: {
            labels: [
                'Semana 1',
                'Semana 2',
                'Semana 3',
                'Semana 4',
                'Hoje'
            ],

            datasets: [

                {
                    type: 'line',
                    label: 'Concluídas',
                    data: [12, 34, 38, 53, 58],

                    borderColor: '#16a34a',
                    backgroundColor: 'rgba(22, 163, 74, 0.12)',

                    borderWidth: 3,

                    fill: true,

                    tension: 0.4,

                    pointRadius: 4,
                    pointBackgroundColor: '#16a34a',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                },

                {
                    type: 'bar',
                    label: 'Em Andamento',
                    data: [0, 18, 23, 31, 42],

                    backgroundColor: '#f59e0b',

                    borderRadius: 3,

                    barThickness: 12
                },

                {
                    type: 'line',
                    label: 'Reprovadas',
                    data: [4, 5, 3, 12, 8],

                    borderColor: '#dc2626',
                    backgroundColor: '#dc2626',

                    borderWidth: 2,

                    tension: 0.4,

                    pointRadius: 3,
                    pointBackgroundColor: '#dc2626',

                    fill: false
                }

            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: 'index'
            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: '#172033',
                    padding: 12,
                    cornerRadius: 8
                }
            },

            scales: {

                x: {
                    grid: {
                        display: false
                    },

                    border: {
                        color: '#dbe3f0'
                    },

                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 13
                        }
                    }
                },

                y: {

                    beginAtZero: true,

                    suggestedMax: 70,

                    ticks: {
                        stepSize: 20,
                        color: '#94a3b8'
                    },

                    grid: {
                        color: '#dbe3f0',
                        borderDash: [4, 4]
                    },

                    border: {
                        display: false
                    }
                }
            }
        }
    });

}
