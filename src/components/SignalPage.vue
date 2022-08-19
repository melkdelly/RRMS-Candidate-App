<template>
<MyHeader />
<table>
  <thead>
    <tr>
      <th> Date/Time </th>
      <th> Signal </th>
      <th> Signal Desc. </th>
      <th> Alarm #</th>
    </tr>
  </thead>
  <tbody>
    <td> </td>
  </tbody>
</table>
</template>

<script>
import MyHeader from './MyHeader.vue'

export default {
  name: 'SignalPage',
  data () {
    return {
      siteDate: '',
      signalCode: '',
      eventCodeDesc: '',
      pointDesc: '',
      alarmNum: 0,
      xmit: ''
    }
  },
  components: { MyHeader }
}
</script>

<style>
</style>
