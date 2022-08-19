<template>
<div class="nav">
    <router-link to='/'> Logout </router-link>
</div>
</template>

<script>
export default {
  name: 'MyHeader'
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
