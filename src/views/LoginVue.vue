<template>
  <div class="m-auto 0 login_container">
    <div class="auth_logo_container">
      <h1 class="text-center mt-3 heading">Login</h1>
      <img src="/img/3S.png" alt="" class="imgs" />
    </div>
    <form class="m-auto 0 w-75" @submit.prevent="handleSubmit">
      <div class="mt-5">
        <label for="exampleFormControlInput0" class="form-label"
          >Username</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput0"
          v-model="username"
        />
      </div>
      <div class="mb-3 mt-3">
        <label for="exampleFormControlInput1" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          v-model="email"
          required
        />
      </div>
      <p v-if="emailError" class="text-danger">
        {{ emailError }}
      </p>
      <div >
        <label for="exampleFormControlInput2" class="form-label"
          >Password</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput2"
          v-model="password"
          required
        />
      </div>
      <p v-if="passwordError" class="text-danger">
        {{ passwordError }}
      </p>
      <button type="submit" class="btn_submit">Login</button>
      <p>
        <router-link to="/forgot-password">Forgot Password?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppStore } from "../store";

export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      username: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.emailError = "";
      this.passwordError = "";

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("User logged in successfully:", userCredential.user);
        useAppStore().setUsername(this.username);
        this.$router.push("/"); // Redirect to the home page after successful login
      } catch (error) {
        console.error("Login error:", error);
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          this.emailError = "Invalid email or password";
          this.passwordError = "Invalid email or password";
        } else {
          this.emailError = error.message;
        }
      }
    },
  },
};
</script>

<style scoped>
.auth_logo_container {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: -50px;
}
.heading {
  padding-left: 50px;
  font-size: 35px;
  letter-spacing: 0.5px;
}
.imgs {
  width: 150px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}
.login_container {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-height: 400px;
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

.btn_submit:hover {
  background-color: #ea7b22;
}
</style>
