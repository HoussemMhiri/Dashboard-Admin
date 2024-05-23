<template>
  <div class="forgot-password">
    <h2>Forgot Password</h2>
    <form @submit.prevent="sendPasswordResetEmail">
      <div class="mb-3 mt-4">
        <label for="email" class="form-label">Email:</label>
        <input type="email" class="form-control" v-model="email" required />
      </div>
      <button type="submit" class="btn_submit">Send Reset Link</button>
      <button class="btn_submit">
        <router-link to="/login">Back To Login</router-link>
      </button>
    </form>
    <p v-if="message" class="text-success">{{ message }}</p>
    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      message: "",
      error: "",
    };
  },
  methods: {
    async sendPasswordResetEmail() {
      try {
        await sendPasswordResetEmail(auth, this.email);
        this.message = "Password reset email sent!";
        this.error = "";
      } catch (error) {
        this.message = "";
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.forgot-password {
  max-width: 500px;
  margin: auto;
  padding: 2em;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;
  border-radius: 5px;
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
.text-success {
  color: green;
}
.text-danger {
  color: red;
}
</style>
