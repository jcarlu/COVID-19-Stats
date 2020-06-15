<template>
    <div id="pieChart">
    <h1>COVID-19 Distribution by Country (Countries with >30K cases)</h1>
      <pie-chart v-if="loaded" :chartdata="chartdata" :options="options" :width="600" :height="600"/>
    </div>
</template>

<script>
import PieChart from "./PieChart.vue";
export default {
  name: "CaseDistributionChart",
  components: { PieChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    options: null
  }),
  methods: {
    getCountryLabel: function(countryData, totalConfirmedAllCountries) {
      const percentageOfCases = (
        (countryData.TotalConfirmed / totalConfirmedAllCountries) *
        100
      ).toFixed(2);
      return `${countryData.Country}: ${percentageOfCases}% (${countryData.TotalConfirmed})`;
    },
    getRandomHex: function() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
  },
  async mounted() {
    this.loaded = false;
    try {
      fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(summaryData => {
          const filteredSummaryData = summaryData.Countries.map(sd => {
              return {
                Country: sd.Country,
                TotalConfirmed: sd.TotalConfirmed
              };
            })
            .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
            .slice(0,25);
          const totalConfirmed = filteredSummaryData.reduce(
            (a, b) => a + b.TotalConfirmed,
            0
          );
          this.chartdata = {
            labels: filteredSummaryData.map(sd =>
              this.getCountryLabel(sd, totalConfirmed)
            ),
            datasets: [
              {
                backgroundColor: filteredSummaryData.map(this.getRandomHex),
                data: filteredSummaryData.map(sd => sd.TotalConfirmed)
              }
            ]
          };
          this.options = {
            responsive: false,
            maintainAspectRatio: false,
            
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
  #pie-chart {
    height: 600px;
    width: 600px;
  }
  #pieChart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 600px) {
    #pie-chart {
    height: 350px;
    width: 350px;
  }
  }
</style>