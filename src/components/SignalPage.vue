<template>
<MyHeader />
<h1> Latest Signals </h1>
<table>
  <thead>
    <tr>
      <th> Alarm # </th>
      <th> Event Code Desc. </th>
      <th> Point Desc. </th>
      <th> Signal Code </th>
      <th> xmit </th>
      <th> Date/Time </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="items in displayedSignals" :key="items.id">
      <td> {{ items.alarmNum }} </td> <!-- all 100 of them are null-->
      <td> {{ items.eventCodeDesc }} </td>
      <td> {{ items.pointDesc }} </td>
      <td> {{ items.signalCode }} </td>
      <td> {{ items.xmit }} </td>
      <td> {{ formatDate(items.siteDate) }} </td>
    </tr>
  </tbody>
</table>
<nav class="pagination-nav-bar">
    <button class="pagination-button" id="first-button">
      &lt;&lt;
    </button>
    <button class="pagination-button" @click="prevPage" id="prev-button">
      &lt;
    </button>
    <span v-for="(item, index) in new Array(this.signals.length / this.perPage)" :key="index">
      <button class="pagination-button" @click="page = index + 1">
        {{ index + 1 }}
      </button>
    </span>
    <button class="pagination-button" @click="nextPage" id="next-button">
      &gt;
    </button>
    <button class="pagination-button" @clickid="last-button" id="last-button">
      &gt;&gt;
    </button>
</nav>
</template>

<script>
import MyHeader from './MyHeader.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'SignalPage',
  data () {
    return {
      signalsURL: 'https://grasperapi.azurewebsites.net/api/v1/Signals',
      signals: [],
      perPage: 10,
      page: 1,
      currentPage: 0,
      pages: []
    }
  },
  components: { MyHeader },
  methods: {
    async getSignals () {
      await axios.get(this.signalsURL)
        .then(response => { this.signals = response.data.items })
        .catch((error) => { console.log(error) })
    },
    setPages () {
      const numOfPages = Math.ceil(this.signals.length / this.perPage)
      for (let index = 1; index <= numOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate (signals) {
      const page = this.page
      const perPage = this.perPage
      const from = (page * perPage) - perPage
      const to = (page * perPage)
      return signals.slice(from, to)
    },
    firstPage () {
      if (this.page < this.perPage) {
        this.page = (this.perPage / this.perPage)
      } else {
        document.getElementById('first-button').disabled = true
      }
    },
    nextPage () {
      if (this.page < this.perPage) {
        this.page = this.page + 1
      } else {
        document.getElementById('next-button').disabled = true
      }
    },
    prevPage () {
      if (this.page > 1) {
        this.page = this.page - 1
      } else {
        document.getElementById('prev-button').disabled = true
      }
    },
    lastPage () {
      if (this.page < this.perPage) {
        this.page = this.perPage
      } else {
        document.getElementById('last-button').disabled = true
      }
    }
  },
  created () {
    // Displays the data from the Get API function
    this.getSignals()
  },
  mounted () {
    // re-routes user to login page if they enter URL for
    //  signal-page and they are not an authorized user
    const user = localStorage.getItem('userInfo')
    if (!user) {
      this.$router.push({ name: 'LogIn' })
    }
  },
  watch: {
    signals () {
      this.setPages()
    }
  },
  computed: {
    displayedSignals () {
      return this.paginate(this.signals)
    },
    formatDate () {
      return (val) => {
        return moment(String(val)).format('MM/DD/YYYY HH:MM:SS')
      }
    }
  }
}
</script>

<style scoped>
th {
  background-color: grey;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.pagination-button{
  background-color: #008CBA;
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
}
</style>
