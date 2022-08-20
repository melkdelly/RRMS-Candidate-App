<template>
<MyHeader />
<table>
  <thead>
    <tr>
      <th> Date/Time </th>
      <th> Signal </th>
      <th> Signal Desc. </th>
      <th> Alarm # </th>
    </tr>
  </thead>
  <tbody>
    <td> </td>
  </tbody>
</table>
</template>

<script>
import MyHeader from './MyHeader.vue'
import axios from 'axios'

export default {
  name: 'SignalPage',
  data () {
    return {
      signalsURL: 'https://grasperapi.azurewebsites.net/api/v1/Users/Signals',
      signals: [],
      signalsData: {
        per_page: 10,
        page: 1
      },
      pagination: {
        nextPage: '',
        previousPage: '',
        totalRecords: 0,
        currentPage: 0,
        pageSize: 0,
        numPages: 0
      }
    }
  },
  components: { MyHeader },
  methods: {
    getSignals () {
      axios.get(this.signalsURL, { params: this.signalsData })
        .then((response) => { this.signals = response.data })
        .catch((error) => { console.log(error) })
    }
  },
  mounted () {
    const user = localStorage.getItem('userInfo')
    if (!user) {
      this.$router.push({ name: 'LogIn' })
    }
  }
}
</script>

<style>
</style>
