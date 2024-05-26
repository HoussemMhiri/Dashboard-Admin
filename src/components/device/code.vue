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
  /*  async postOSPF() {
  try {
    // Check if required fields are provided
    if (!this.hostname || !this.customer || !this.ospf) {
      console.error("Hostname, customer, and OSPF are required");
      return;
    }

    // Get a reference to the dataset collection
    const datasetRef = collection(db, "dataset");

    // Get a reference to the router document
    const routerDocRef = doc(datasetRef, this.hostname);

    // Check if the router document exists
    const routerDocSnapshot = await getDoc(routerDocRef);
    if (!routerDocSnapshot.exists()) {
      console.error(`Router with hostname ${this.hostname} does not exist`);
      return;
    }

    // Get a reference to the customer collection
    const customerCollectionRef = collection(routerDocRef, this.customer);
    const customerQuerySnapshot = await getDocs(customerCollectionRef);

    if (!customerQuerySnapshot.empty) {
      // Assuming there's only one document in the collection,
      // we retrieve the reference to that document
      const customerDocRef = customerQuerySnapshot.docs[0].ref;

      // Get the customer document data
      const customerDocSnapshot = await getDoc(customerDocRef);
      if (customerDocSnapshot.exists()) {
        const customerData = customerDocSnapshot.data();
        const existingOspf = customerData.ospf || [];

        // Merge existing OSPF values with the new one
        const updatedOspf = [...existingOspf, this.ospf];

        // Update the OSPF field in the customer document
        await setDoc(customerDocRef, { ospf: updatedOspf });
      }
    } else {
      console.error(`Customer ${this.customer} does not exist`);
    }

    console.log(
      `OSPF ${this.ospf} added successfully for customer ${this.customer}`
    );
  } catch (error) {
    console.error("Error adding OSPF:", error);
  }
} */
  /* async postOSPF() {
  try {
    // Check if required fields are provided
    if (!this.hostname || !this.customer || !this.ospf) {
      console.error("Hostname, customer, and OSPF are required");
      return;
    }

    // Get a reference to the dataset collection
    const datasetRef = collection(db, "dataset");

    // Get a reference to the router document
    const routerDocRef = doc(datasetRef, this.hostname);

    // Check if the router document exists
    const routerDocSnapshot = await getDoc(routerDocRef);
    if (!routerDocSnapshot.exists()) {
      console.error(`Router with hostname ${this.hostname} does not exist`);
      return;
    }

    // Get a reference to the customer collection
    const customerCollectionRef = collection(routerDocRef, this.customer);
    const customerQuerySnapshot = await getDocs(customerCollectionRef);

    if (!customerQuerySnapshot.empty) {
      // Assuming there's only one document in the collection,
      // we retrieve the reference to that document
      const customerDocRef = customerQuerySnapshot.docs[0].ref;

      // Get the customer document data
      const customerDocSnapshot = await getDoc(customerDocRef);
      if (customerDocSnapshot.exists()) {
        const customerData = customerDocSnapshot.data();

        let updatedOspf = [];
        if (customerData.hasOwnProperty("ospf")) {
          // If OSPF field exists, merge existing OSPF values with the new one
          updatedOspf = Array.isArray(customerData.ospf)
            ? [...customerData.ospf, this.ospf]
            : [customerData.ospf, this.ospf];
        } else {
          // If OSPF field doesn't exist, create it with the new OSPF value
          updatedOspf = [this.ospf];
        }

        // Update the OSPF field in the customer document
        await setDoc(customerDocRef, { ospf: updatedOspf });
      }
    } else {
      console.error(`Customer ${this.customer} does not exist`);
    }

    console.log(
      `OSPF ${this.ospf} added successfully for customer ${this.customer}`
    );
  } catch (error) {
    console.error("Error adding OSPF:", error);
  }
}
*/
  // update and create of the vrf
  /* async postOSPF() {
      try {
        // Check if required fields are provided
        if (!this.hostname || !this.customer || !this.ospf) {
          console.error("Hostname, customer, and OSPF are required");
          return;
        }

        // Get a reference to the dataset collection
        const datasetRef = collection(db, "dataset");

        // Get a reference to the router document
        const routerDocRef = doc(datasetRef, this.hostname);

        // Check if the router document exists
        const routerDocSnapshot = await getDoc(routerDocRef);
        if (!routerDocSnapshot.exists()) {
          console.error(`Router with hostname ${this.hostname} does not exist`);
          return;
        }

        // Create a reference to the subcollection with the provided customer name
        const customerSubcollectionRef = collection(
          routerDocRef,
          this.customer
        );

        // Construct a query to efficiently retrieve existing documents
        const existingDocQuery = query(customerSubcollectionRef, limit(1));

        // Execute the query to fetch at most one document
        const existingDocSnapshot = await getDocs(existingDocQuery);

        // Get the reference to the single document or create a new one if it doesn't exist
        const customerDocRef = existingDocSnapshot.empty
          ? doc(customerSubcollectionRef)
          : existingDocSnapshot.docs[0].ref;

        // Get the current OSPF field value from the customer document
        const customerDocSnapshot = await getDoc(customerDocRef);
        let ospfArray = [];
        if (customerDocSnapshot.exists()) {
          const existingOspf = customerDocSnapshot.get("ospf");
          if (Array.isArray(existingOspf)) {
            ospfArray = existingOspf;
          } else if (existingOspf) {
            ospfArray.push(existingOspf);
          }
        }

        // Add the new OSPF value to the array
        ospfArray.push(this.ospf);

        // Update the OSPF field in the customer document
        await updateDoc(customerDocRef, { ospf: ospfArray });

        console.log(
          `OSPF ${this.ospf} added successfully for customer ${this.customer}`
        );
      } catch (error) {
        console.error("Error adding OSPF:", error);
      }
    }*/
  // update create and add ospf main doc
  /*
        async postOSPF() {
      try {
        // Check if required fields are provided
        if (!this.hostname || !this.customer || !this.ospf) {
          console.error("Hostname, customer, and OSPF are required");
          return;
        }

        // Get a reference to the dataset collection
        const datasetRef = collection(db, "dataset");

        // Get a reference to the router document
        const routerDocRef = doc(datasetRef, this.hostname);

        // Check if the router document exists
        const routerDocSnapshot = await getDoc(routerDocRef);
        if (!routerDocSnapshot.exists()) {
          console.error(`Router with hostname ${this.hostname} does not exist`);
          return;
        }

        // Create a reference to the subcollection with the provided customer name
        const customerSubcollectionRef = collection(
          routerDocRef,
          this.customer
        );

        // Construct a query to efficiently retrieve existing documents
        const existingDocQuery = query(customerSubcollectionRef, limit(1));

        // Execute the query to fetch at most one document
        const existingDocSnapshot = await getDocs(existingDocQuery);

        // Get the reference to the single document or create a new one if it doesn't exist
        const customerDocRef = existingDocSnapshot.empty
          ? doc(customerSubcollectionRef)
          : existingDocSnapshot.docs[0].ref;

        // Get the current OSPF field value from the customer document
        const customerDocSnapshot = await getDoc(customerDocRef);
        let ospfArray = [];
        if (customerDocSnapshot.exists()) {
          const existingOspf = customerDocSnapshot.get("ospf");
          if (Array.isArray(existingOspf)) {
            ospfArray = existingOspf;
          } else if (existingOspf) {
            ospfArray.push(existingOspf);
          }
        }

        // Add the new OSPF value to the array
        ospfArray.push(this.ospf);

        // Update the OSPF field in the customer document
        await updateDoc(customerDocRef, { ospf: ospfArray });

        // Check if the "ospf" document exists
        const ospfDocRef = doc(datasetRef, "ospf");
        const ospfDocSnapshot = await getDoc(ospfDocRef);

        // Set the OSPF document with the provided OSPF value and other fields
        if (!ospfDocSnapshot.exists()) {
          await setDoc(ospfDocRef, {
            ospf: this.ospf,
            area: this.area,
            network_address: this.network_address,
            wildcard_mask: this.wildcard_mask,
          });
        }

        console.log(
          `OSPF ${this.ospf} added successfully for customer ${this.customer}`
        );
      } catch (error) {
        console.error("Error adding OSPF:", error);
      }
    }*/
};
</script>

<style></style>
