new Vue({
    el: '#app',
    data: {
        inputNumber: 0,
        multiplier: 1,
        gameState: 'stopped', // 'stopped', 'running', 'won', 'lost'
        timeLimit: 0,
        interval: null,
        message: '',
        chart: null,
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Multiplicador',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                },
            ],
        },
    },
    methods: {
        startGame() {
            //this.resetGame();
            if(isNaN(this.inputNumber) || this.inputNumber >= 1){
                this.timeLimit = Math.floor(Math.random() * (120 - 3 + 1)) + 3;
                this.gameState = 'running';
                this.message = `Você tem ${this.timeLimit} segundos. Boa sorte!`;
                this.startMultiplier();
            }
            else{
                alert("Escreva um número maior ou igual a 1");
                return;
            }
            
        },
        startMultiplier() {
            let secondsElapsed = 0;
            this.interval = setInterval(() => {
                if (this.timeLimit > 0) {
                    this.timeLimit -= 1;
                    this.multiplier += 0.2;
                    secondsElapsed += 1;
                    this.updateChart(secondsElapsed, this.multiplier);
                } else {
                    this.stopGame('lost');
                }
            }, 1000);
        },
        handleClick() {
            this.stopGame('won');
        },
        stopGame(result) {
            clearInterval(this.interval);
            if (result === 'won') {
                this.inputNumber =  Math.round(this.inputNumber * this.multiplier);
                this.message = `Você ganhou! Seu número final é: <span class="won">${this.inputNumber.toFixed(2)}</span>`;
            } else {
                this.multiplier = 0;
                this.inputNumber = this.inputNumber * this.multiplier;
                this.message = `Você perdeu! Seu número final é: <span class="lost"> ${this.inputNumber.toFixed(2)}</span>`;
            }
            this.gameState = result;
        },
        resetGame() {
            this.inputNumber = 0;
            this.multiplier = 1;
            this.gameState = 'stopped';
            this.timeLimit = 0;
            this.message = '';
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.resetChart();
        },
        createChart() {
            const ctx = document.getElementById('multiplierChart').getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'line',
                data: this.chartData,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Segundos'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Multiplicador'
                            }
                        }
                    }
                }
            });
        },
        updateChart(secondsElapsed, multiplier) {
            this.chartData.labels.push(secondsElapsed);
            this.chartData.datasets[0].data.push(multiplier);
            this.chart.update();
        },
        resetChart() {
            this.chartData.labels = [];
            this.chartData.datasets[0].data = [];
            if (this.chart) {
                this.chart.update();
            }
        }
    },
    mounted() {
        this.createChart();
    }
});







