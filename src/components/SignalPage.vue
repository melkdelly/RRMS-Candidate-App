<template>
<MyHeader />
<h1> Latest Signals </h1>
<table>
    <tr v-for="items in signals" :key="items.id">
      <td> {{ items.alarmNum }} </td> <!-- all 100 of them are null, you might need to write a method to fill this out in increments-->
      <td> {{ items.eventCodeDesc }} </td>
      <td> {{ items.pointDesc }} </td>
      <td> {{ items.signalCode }} </td>
      <td> {{ items.xmit }} </td>
      <td> {{ items.siteDate }} </td> <!-- needs to be mm/dd/yyyy hh:mm:ss format -->
    </tr>
</table>
</template>

<script>
import MyHeader from './MyHeader.vue'
import axios from 'axios'

export default {
  name: 'SignalPage',
  data () {
    return {
      signalsURL: 'https://grasperapi.azurewebsites.net/api/v1/Signals',
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
    async getSignals () {
      axios.get('https://grasperapi.azurewebsites.net/api/v1/Signals')
        .then(response => { this.signals = response.data.items })
        .catch((error) => { console.log(error) })
    }
  },
  mounted () {
    const user = localStorage.getItem('userInfo')
    if (!user) {
      this.$router.push({ name: 'LogIn' })
    }
  },
  created () {
    this.getSignals()
  }
}
</script>

<style>
</style>
