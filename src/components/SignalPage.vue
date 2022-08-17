<template> 

<table>
  <tr>
    <th> Date/Time </th>
    <th> Signal </th> 
    <th> Signal Desc. </th>
    <th> Alarm #</th>
  </tr>
</table>
</template>

<script>
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
    }
}
</script>

<style>
</style>
