<template>
    <div id="barChart">
    <h1>Total COVID-19 Cases by State (Top 30)</h1>
      <bar-chart v-if="loaded" :chartdata="chartdata" :options="options" :width="800" :height="600" />
    </div>
</template>

<script>
import BarChart from "./BarChart.vue";
export default {
  name: "StateBarDistribution",
  components: { BarChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    options: null
  }),
  methods: {
    getRandomHex: function() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
   
  },
  async mounted() {
    this.loaded = false;
    try {
      fetch("https://covidtracking.com/api/v1/states/20200521.json")
        .then(response => response.json())
        .then(summaryData => {
          const stateCases = summaryData.map(states => {
              return {
                state: states.state,
                positive: states.positive
              };
            })
            .sort((a, b) => b.positive - a.positive)
            .slice(0,30);
          this.chartdata = {
            labels: stateCases.map(sd => sd.state),
            datasets: [
              {
                data: stateCases.map(sd => sd.positive),
                backgroundColor: stateCases.map(this.getRandomHex),
                label: 'Total Cases',
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
                    labelString: 'Total Positive Cases',
                    fontSize: 24
                    },
                
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
  #bar-chart {
    height: 600px;
    width: 800px;
  }
  #barChart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h1{
    text-align: center;
  }
  @media (max-width: 600px) {
    #bar-chart {
    height: 310px;
    width: 350px;
  }


  }
</style>