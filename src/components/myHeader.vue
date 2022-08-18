<template>
<div class="nav">
    <a @click='logout' href='?'> Logout </a>
</div>
</template>

<script>
export default {
  name: 'MyHeader',
  methods: {
    logout () {
      this.$router.push({ name: 'LogIn' })
    }
  }
}
</script>

<style>
.nav{
    background-color: green;
    overflow:hidden
}
</style>
