<template>
    <div id="lineChart">
    <h1>Daily New Cases of COVID-19 in Michigan</h1>
      <line-chart v-if="loaded" :chartdata="chartdata" :options="options" :width="600" :height="500" />
    </div>
</template>

<script>
import LineChart from "./LineChart.vue";
export default {
  name: "NewDailyCasesMichigan",
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    options: null
  }),
  methods: {
    formatDate: function(dateUnformatted) {
        let day = String(dateUnformatted).substring(6,8);
        let month = String(dateUnformatted).substring(4,6);
        return `${month}/${day}`;
    }
   
  },
  async mounted() {
    this.loaded = false;
    try {
      fetch("https://covidtracking.com/api/v1/states/MI/daily.json")
        .then(response => response.json())
        .then(summaryData => {
          const newCases = summaryData.map(day => {
              return {
                date: day.date,
                positiveIncrease: day.positiveIncrease
              };
            })
            .sort((a, b) => a.date - b.date);
          this.chartdata = {
            labels: newCases.map(daily => this.formatDate(daily.date) ),
            datasets: [
              {
                data: newCases.map(daily => daily.positiveIncrease),
                borderColor: '#0000ff',
                backgroundColor: '#dbf3fa',
                fill: true,
                label: 'Daily New Cases of COVID-19',
              }
            ]
          };
          this.options = {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Daily New Cases of COVID-19',
                    fontSize: 24
                    }
                }]
                },
            legend: {
                display: false
             }    

          };
          
          this.loaded = true;
        });
    } catch (e) {
      console.error(e);
    }
  },
  created() {
    this.mounted();
  }
};
</script>

<style>
  #line-chart {
    height: 500px;
    width: 600px;
  }
  #lineChart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h1{
    text-align: center;
  }
  @media (max-width: 600px) {
    #line-chart {
    height: 380px;
    width: 350px;
  }


  }
</style>