<template>
    <div id="lineChart">
    <h1>Current People Hospitalized in Michigan</h1>
      <line-chart v-if="loaded" :chartdata="chartdata" :options="options" :width="600" :height="500" />
    </div>
</template>

<script>
import LineChart from "./LineChart.vue";
export default {
  name: "HospitalizationChart",
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
          const inHospital = summaryData.map(day => {
              return {
                date: day.date,
                hospitalizedCurrently: day.hospitalizedCurrently
              };
            })
            .sort((a, b) => a.date - b.date)
            .slice(40);
          this.chartdata = {
            labels: inHospital.map(hospital => this.formatDate(hospital.date) ),
            datasets: [
              {
                data: inHospital.map(hospital => hospital.hospitalizedCurrently),
                borderColor: '#0000ff',
                label: 'Persons Hospitalized',
                backgroundColor: '#dbf3fa',
                fill: true,
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
                    labelString: 'Number of Persons Hospitalized',
                    fontSize: 24
                    },
                    ticks: {
                      min: 0,
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
    height: 350px;
    width: 350px;
  }


  }
</style>