<template>
  <div class="pie_container">
    <div>
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

      const ctx = document.getElementById("doughnutChart").getContext("2d");

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
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            datalabels: {
              color: "#000",
              font: {
                weight: "bold",
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
.pie_container {
  width: 100%;
}
#doughnutChart {
  width: 80% !important;
  height: 400px !important;
}
</style>
