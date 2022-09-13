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
    <tr v-for="signal in signals" :key="signal.signalId">
      <td> {{ signal.alarmNum }} </td> <!-- all 100 of them are null-->
      <td> {{ signal.eventCodeDesc }} </td>
      <td> {{ signal.pointDesc }} </td>
      <td> {{ signal.signalCode }} </td>
      <td> {{ signal.xmit }} </td>
      <td> {{ formatDate(signal.siteDate) }} </td>
    </tr>
  </tbody>
</table>
<nav class="pagination-nav-bar">
    <button class="pagination-button" @click="prevPage()" id="prevButton">
      &lt;
    </button>
    <!-- <span v-for="index in numPages" :key="index"> -->
      <button class="pagination-button disabled">
        {{ currentPage }}
      </button>
    <!-- </span> -->
    <button class="pagination-button" @click="nextPage()" id="nextButton">
      &gt;
    </button>
</nav>
</template>

<script>
import MyHeader from './MyHeader.vue'
import SigDataService from '@/services/SigDataService'
// import axios from 'axios'
import moment from 'moment'

export default {
  name: 'SignalPage',
  data () {
    return {
      signals: [],
      perPage: 10,
      currentPage: 1,
      numPages: 1,
      nextURL: '',
      previousURL: ''
    }
  },
  components: { MyHeader },
  methods: {
    // async getSignals () {
    //   await axios.get(this.signalsURL)
    //     .then(response => { this.signals = response.data.items })
    //     .catch((error) => { console.log(error) })
    // },
    // setPages () {
    //   const numOfPages = Math.ceil(this.signals.length / this.perPage)
    //   for (let index = 1; index <= numOfPages; index++) {
    //     this.pages.push(index)
    //   }
    // },
    // paginate (signals) {
    //   const page = this.page
    //   const perPage = this.perPage
    //   const from = (page * perPage) - perPage
    //   const to = (page * perPage)
    //   return signals.slice(from, to)
    // },
    nextPage () {
      if (this.nextURL && this.nextURL.length > 0 && this.currentPage < this.perPage) {
        this.currentPage += 1
        this.retrieveSignal()
      }
    },
    prevPage () {
      if (this.previousURL && this.previousURL.length > 0 && this.currentPage > 1) {
        this.currentPage -= 1
        this.retrieveSignal()
      }
    },
    getRequestParams (pageNum, limit) {
      const params = {}
      if (pageNum) {
        params.page = pageNum
      }
      if (limit) {
        params.Limit = limit
      }
      return params
    },
    retrieveSignal () {
      const params = this.getRequestParams(
        this.currentPage,
        this.perPage
      )
      SigDataService.getAll(params)
        .then((response) => {
          if (response.data) {
            if (response.data.items) {
              this.signals = response.data.items
            }
            this.currentPage = response.data.currentPage
            this.perPage = response.data.pageSize
            this.numPages = response.data.numPages
            this.nextURL = response.data.nextPage
            this.previousURL = response.data.previousPage
          }
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handlePageChange (value) {
      this.currentPage = value
      this.retrieveSignal()
      // this.getSignals()
    }
  },
  created () {
    // Displays the data from the Get API function
    // this.getSignals()
    // Utilizes Server-Side Paging
    this.retrieveSignal()
  },
  mounted () {
    // re-routes user to login page if they enter URL for
    //  signal-page and they are not an authorized user
    const user = localStorage.getItem('userInfo')
    if (!user) {
      this.$router.push({ name: 'LogIn' })
    }
  },
  computed: {
    formatDate () {
      return (val) => {
        return moment(String(val)).format('MM/DD/YYYY HH:mm:ss')
      }
    }
  }
}
</script>

<style>
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
