<template>
    <img alt="RRMS Logo" src="../assets/rapidlogo.png">
    <form @submit.prevent="login">
      <h2> Dealer Login </h2>
        <div type="form-group">
            <input type="email"
            v-model="email"
            placeholder="Enter Email"
            size="30">
        <br> <br>
            <input type="password"
            v-model="password"
            placeholder="Enter Password"
            size="30">
        <button type="button" class="button" @click="login"> Login </button>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import setAuthHeader from '@/auth/setAuthHeader.js'
export default {
  name: 'LogIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const result = await axios.post('https://grasperapi.azurewebsites.net/api/v1/Users/authenticate', {
        email: this.email,
        password: this.password
      })
      if (result.status === 200) {
        localStorage.setItem('userInfo', JSON.stringify(
          [result.data.email, result.data.firstName, result.data.lastName, result.data.token, result.data.userId]))
        setAuthHeader(result.data.token)
        this.$router.push({ name: 'SignalPage' })
      }
    }
  }
}
</script>

<style scoped>
input {
  padding: 10px;
}

* {
  box-sizing: border-box;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  background-color: grey;
  border-style: none;
  padding: 10px 30px;
}

.button:hover {
    background-color: lightblue;
    transition: 0.7s;
}

.button:focus {
    outline-color: transparent;
    outline-style: solid;
    box-shadow: 0 0 0 4px blue;
}
</style>
