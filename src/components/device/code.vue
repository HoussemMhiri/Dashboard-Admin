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
