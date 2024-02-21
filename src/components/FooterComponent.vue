<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">
      <RouterLink class="footer-brand" to="/">(CP) CHESS PUZZLES v.1</RouterLink>
      <div class="footer-links">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"></a>
        <RouterLink to="/about">CONTACT</RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  background-color: #FFFC47;
  color: #42210B;
  padding: 0.5em;
  position: fixed;
  bottom: 0;
  left: 0;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
}

.footer-brand {
  color: #42210B;
  text-decoration: none;
}

.footer-links a,
.footer-links router-link {
  color: #42210B;
  margin-left: 20px;
  text-decoration: none;
}

.footer-links a:hover,
.footer-links router-link:hover {
  text-decoration: underline;
}
</style>
