<template>
  <div class="pie_container">
    <h3 class="text-center">Number of Devices</h3>
    <div class="canv">
      <canvas id="doughnutChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  props: ["dbData"],
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    countIdsStartingWithC() {
      const count = this.dbData.filter(
        (item) => item.id && item.id.toLowerCase().startsWith("ce")
      ).length;
      console.log("Count of IDs starting with 'C':", count);
      return count;
    },
    countIdsStartingWithS() {
      const count = this.dbData.filter(
        (item) => item.id && item.id.toLowerCase().startsWith("sw")
      ).length;
      console.log("Count of IDs starting with 'S':", count);
      return count;
    },
  },
  methods: {
    setupDoughnutChart() {
      if (!this.dbData || this.dbData.length === 0) {
        console.error("No data available to create the chart");
        return;
      }

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById("doughnutChart");
      if (!ctx) {
        console.error("DOM element not found");
        return;
      }

      const context = ctx.getContext("2d");
      if (!context) {
        console.error("Failed to get 2d rendering context");
        return;
      }

      Chart.register(ChartDataLabels);

      this.chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Switch", "Provider", "Provider edge", "Customer edge"],
          datasets: [
            {
              data: [
                this.countIdsStartingWithS,
                5,
                3,
                this.countIdsStartingWithC,
              ],
              backgroundColor: ["#5E72C2", "#96A6FB", "#EBEEFF", "#C8D6FF"],
              borderColor: ["#5E72C2", "#96A6FB", "#EBEEFF", "#C8D6FF"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,

          plugins: {
            legend: {
              position: "bottom",
              align: "center",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
              },
            },

            datalabels: {
              color: "black",
              font: {
                weight: "bold",
                size: "16",
              },
              formatter: (value) => {
                return value;
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    if (this.dbData && this.dbData.length > 0) {
      this.setupDoughnutChart();
    }
  },
  watch: {
    dbData: {
      handler(newData) {
        if (newData && newData.length > 0) {
          this.setupDoughnutChart();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
h3 {
  color: #434656;
  margin-top: 20px;
  /*   margin-bottom: -20px; */
}
.pie_container {
  /*  border: 1px solid red; */
  width: 100%;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /*   border: 1px solid black; */
  background-color: white;
  box-shadow: 0 2px 4px #5e72c2;
  border-radius: 5px;
  /*  padding-left: 40px; */
}
#doughnutChart {
  width: 370px !important;
  margin-bottom: 10px;
}
</style>
