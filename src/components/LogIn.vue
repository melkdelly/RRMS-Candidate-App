<template>
    <h2> Dealer Login </h2>
    <form>
        <div type="form-group">
            <label for="emailInput"> Email: </label> <br>
            <input type="email" v-model="email" size="30">
        </div>
        <br>
        <div type="form-group">
        <label for="pwInput"> Password: </label> <br>
        <input type="password" v-model="password" size="30"> <br>
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
      await axios.post('https://grasperapi.azurewebsites.net/api/v1/Users/authenticate', {
        email: this.email,
        password: this.password
      })
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
    }
  }
}
</script>
