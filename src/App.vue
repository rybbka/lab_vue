<script setup>
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'


</script>

<template>
  <div>
    <!-- Navbar -->
    <NavBar />

    <!-- Main Content -->
    <router-view> </router-view>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<style scoped>

</style>
