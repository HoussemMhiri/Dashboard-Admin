<template></template>

<script>
export default {
  /* addVRF() {
      setDoc(doc(db, "dataset", this.router), {
        VRF_Name: this.VRF_Names,
        RD: this.Rds,
        RT_Export: this.RT_Exports,
        RT_Import: this.RT_Imports,
      });
      this.VRF_Names = "";
      this.Rds = "";
      this.RT_Exports = "";
      this.RT_Imports = "";
      this.router = "";
    }, */
  /*     async addVRF() {
      const datasetRef = collection(db, "dataset");
      const routerDocRef = doc(datasetRef, this.router);

      try {
        // Check if the document exists
        const docSnapshot = await getDoc(routerDocRef);

        if (docSnapshot.exists()) {
          // Document exists, create a subcollection with the name of VRF_Names
          const vrfNameSubcollectionRef = collection(
            routerDocRef,
            this.VRF_Names
          );

          // Add additional information to the subcollection
          await addDoc(vrfNameSubcollectionRef, {
            RD: this.Rds,
            RT_Export: this.RT_Exports,
            RT_Import: this.RT_Imports,
          });
        } else {
          // Document does not exist, create it and add the provided information
          await setDoc(routerDocRef, {});

          // Create a subcollection with the name of VRF_Names
          const vrfNameSubcollectionRef = collection(
            routerDocRef,
            this.VRF_Names
          );

          // Add additional information to the subcollection
          await addDoc(vrfNameSubcollectionRef, {
            RD: this.Rds,
            RT_Export: this.RT_Exports,
            RT_Import: this.RT_Imports,
          });
        }

        this.VRF_Names = "";
        this.Rds = "";
        this.RT_Exports = "";
        this.RT_Imports = "";
        this.router = "";
      } catch (error) {
        console.error(error);
      }
    }, */
  /*   async postData() {
      try {
        const { data } = await axios.post(
          "http://127.0.0.1:5000/addConfig",
          this.dataToPost
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }, */
  /*   async addCE() {
      setDoc(doc(db, "dataset", this.ce), {
        ce_router: this.ce,
        interface: this.inter,
        ip_address: this.ip,
        mask: this.mask,
        ospf: this.ospf,
      });

      this.ce = "";
      this.inter = "";
      this.ip = "";
      this.mask = "";
      this.ospf = "";
    }, */
};
</script>

<style></style>
<template>
  <div class="pie_container">
    <!--  <h1>Pie</h1> -->
    <div>
      <canvas id="doughnutChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: ["dbData"],
  methods: {
    setupDoughnutChart() {
      const ctx = document.getElementById("doughnutChart").getContext("2d");

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            "Switch",
            "Provider",
            "Provider edge",
            "Customer edge",
            /*    "Purple",
            "Orange", */
          ],
          datasets: [
            {
              /*  label: "# of Votes", */
              data: [2, 5, 3, 4],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                /*     "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)", */
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                /*    "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)", */
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    },
  },
  mounted() {
    this.setupDoughnutChart();
  },
};
</script>

<style scoped>
.pie_container {
  /*   border: 1px solid red; */
  width: 100%;
}
#doughnutChart {
  width: 80% !important;
  height: 400px !important;
}
</style>
