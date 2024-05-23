<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3 mt-4">
        <label for="email" class="form-label">Email:</label>
        <input type="email" class="form-control" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn_submit">Register</button>

      <button class="btn_submit">
        <router-link to="/login">Back To Login</router-link>
      </button>
    </form>
    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log(userCredential); // Log userCredential for reference
        this.$router.push("/login");
        // Redirect to another page or perform other actions upon successful registration
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 500px;
  margin: auto;
  padding: 2em;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;
  border-radius: 5px;
}
.text-danger {
  color: red;
}

.btn_submit {
  border: none;
  background-color: #5e72c2;
  color: white;
  width: 100%;
  margin-top: 2em;
  border-radius: 5px;
  height: 30px;
  letter-spacing: 0.3px;
  transition: all 0.2s ease-in-out;
}

.btn_submit a {
  text-decoration: none !important;
  color: white;
}

.btn_submit:hover {
  background-color: #ea7b22;
}
</style>
