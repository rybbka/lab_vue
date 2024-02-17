<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
   <footer class="site-footer">
      <div class="footer-container">
        <RouterLink class="footer-brand" to="/">CHESS PROBLEMS</RouterLink>
        <div class="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">I</a>
          <RouterLink to="/about">INSTAGRAM</RouterLink>
        </div>
      </div>
    </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  background-color: #C9C5BE;
  /* Eller vilken färg som passar med din webbplats */
  color:#1E0A0A;
  padding: 15px 0;
  position: fixed;
  bottom: 0;
  left: 0;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
}

.footer-brand {
  color: #1E0A0A;
  text-decoration: none;
}

.footer-links a,
.footer-links router-link {
  color: #1E0A0A;
  margin-left: 20px;
  text-decoration: none;
}

.footer-links a:hover,
.footer-links router-link:hover {
  text-decoration: underline;
}
</style>
