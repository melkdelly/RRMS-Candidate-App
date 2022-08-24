<template>
<MyHeader />
<h1> Welcome </h1>
<h3> Latest Signals </h3>
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
    <button class="pagination-button" @click="prevPage" id="prevButton">
      &lt;
    </button>
    <span v-for="(item, index) in new Array(this.signals.length / this.perPage)" :key="index">
      <button class="pagination-button" @click="page = index + 1">
        {{ index + 1 }}
      </button>
    </span>
    <button class="pagination-button" @click="nextPage" id="nextButton">
      &gt;
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
    nextPage () {
      if (this.page <= this.perPage - 1) {
        this.page = this.page + 1
      }
    },
    prevPage () {
      if (this.page > 1) {
        this.page = this.page - 1
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
h3 {
  text-align: left;
}

table {
  width: 100%;
  border: 0;
  empty-cells: hide;
}

th {
  background-color: grey;
  color: white;
  font-style: italic;
}

tr:nth-child(even) {
  background-color: lightblue;
}

nav {
  display: flex;
  justify-content: center;
}

.pagination-nav-bar{
  font-size: 16px;
  margin: 0;
  padding: 8px;
  border-radius: 4px;
  list-style: none;
  display: flex;
  column-gap: 2px;
}

.pagination-button:hover {
  background-color: lightblue;
  transition: 0.7s;
}
</style>
