<template>
<MyHeader />
<h1> Latest Signals </h1>
<table>
    <tr v-for="items in signals" :key="items.id">
      <td> {{ items.alarmNum }} </td>
      <td> {{ items.eventCodeDesc }} </td>
      <td> {{ items.pointDesc }} </td>
      <td> {{ items.signalCode }} </td>
      <td> {{ items.xmit }} </td>
      <td> {{ items.siteDate }} </td>
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
      signals: [],
      signalsData: {
        per_page: 25,
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
  async mounted () {
    const user = localStorage.getItem('userInfo')
    if (!user) {
      this.$router.push({ name: 'LogIn' })
    }
    const result = await axios.get('https://grasperapi.azurewebsites.net/api/v1/Signals')
    console.warn(result)
    this.signals = result.data.items
  }
}
</script>

<style>
</style>
