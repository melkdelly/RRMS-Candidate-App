<template>
    <img alt="RRMS Logo" src="../assets/rapidlogo.png">
    <h1> Dealer Login </h1>
    <form @submit.prevent="login">
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
        <br> <br>
        <button @click="login"> Login </button>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
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
      if (result.status === 200 && result.data.length > 0) {
        localStorage.setItem('userInfo', JSON.stringify(result.data[0]))
        this.$router.push({ name: 'SignalPage' })
      }
      console.warn(result)
    }
  }
}
</script>
