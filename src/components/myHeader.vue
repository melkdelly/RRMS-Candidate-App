<template>
<div class="nav">
    <router-link to='/' @click="logout"> Logout </router-link>
</div>
</template>

<script>
export default {
  name: 'MyHeader',
  methods: {
    logout () {
      localStorage.clear('userData')
    }
  }
}
</script>

<style>
.nav{
    font-size: 20px;
    font-weight: 600;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    text-align: right;
    overflow:hidden
}
</style>
