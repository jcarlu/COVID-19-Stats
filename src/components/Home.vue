<template>
  <div id="home">
      <h1>Coronavirus Data Analysis</h1>
    <div id="homeTiles">
     <div id="dataTile" @click="worldChart">
         <p id="tileTitle">World Distribution</p>
         <img id= "earth" src="../assets/earth.png">
     </div> 
     <div id="dataTile" @click="stateBarChart">
         <p id="tileTitle">Total COVID-19 Cases by State</p>
         <img id= "earth" src="../assets/states.png">
     </div> 
     <div id="dataTile" @click="stateRecoveryRate">
         <p id="tileTitle">Recovery Rate by State</p>
         <img id= "earth" src="../assets/states.png">
     </div> 
     <div id="dataTile" @click="michiganNewCases">
         <p id="tileTitle">Daily New Cases for Michigan</p>
         <img id= "earth" src="../assets/michigan.jpg">
     </div> 
      <div id="dataTile" @click="michiganHospitalizations">
         <p id="tileTitle">Hospitalizations in Michigan</p>
         <img id= "earth" src="../assets/michigan.jpg">
     </div> 
     
    </div>  
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {

    };
  },
  methods: {
    worldChart() {
      this.$router.push('/worldDistribution');
    },
    michiganHospitalizations() {
      this.$router.push('/michiganHospitalizations');
    },
    stateBarChart() {
      this.$router.push('/casesByState');
    },
    stateRecoveryRate() {
      this.$router.push('/stateRecoveryRate');
    },
    michiganNewCases() {
      this.$router.push('/michiganNewCases');
    },

  },
};
</script>

<style>
#dataTile {
    width: 300px;
    height: 400px;
    border: 3px;
    border-color: black;
    border-style: solid;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    text-align: center;
}
#dataTile:hover {
    cursor: pointer;
}
#homeTiles {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#earth {
    width: 280px;
    height: 280px;
}
#tileTitle {
    font-size: 36px;
    margin: 0;

}


</style>