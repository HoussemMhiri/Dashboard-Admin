<template>
  <div class="login_container">
    <h1 class="text-center mt-3 heading">Login</h1>
    <form class="w-75" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
        <p class="text-danger">{{ emailError }}</p>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
        <p class="text-danger">{{ passwordError }}</p>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <p class="mt-3">
        Don't have an account? <router-link to="/register">Register</router-link>
      </p>
      <p>
        <router-link to="/forgot-password">Forgot Password?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    };
  },
  methods: {
    async handleSubmit() {
  this.emailError = '';
  this.passwordError = '';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
    console.log('User logged in successfully:', userCredential.user);
    this.$router.push('/'); // Redirect to the home page after successful login
  } catch (error) {
    console.error('Login error:', error);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      this.emailError = 'Invalid email or password';
      this.passwordError = 'Invalid email or password';
    } else {
      this.emailError = error.message;
    }
  }
}

  }
};
</script>

<style scoped>
.login_container {
  max-width: 500px;
  margin: auto;
  padding: 2em;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;
  border-radius: 5px;
}
.heading {
  text-align: center;
  font-size: 24px;
  margin-top: 0;
}
.text-danger {
  color: red;
}
</style>
