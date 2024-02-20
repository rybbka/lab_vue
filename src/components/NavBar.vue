<template>
  <!-- Navbar with a fixed position at the top of the page -->
  <nav class="navbar yellow fixed-top">
    <div class="container-fluid">

      <!-- RouterLink functioning as a link to the home page with the text "CHESS PROBLEMS" -->
      <RouterLink class="navbar-brand" to="/">(CP)</RouterLink>

      <!-- Offcanvas menu toggle button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar" @click="toggleOffcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Offcanvas menu -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <!-- Navigation links for the home page and "About" page -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link active" to="/">CHESS PUZZLES</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">ABOUT (CP)</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    toggleOffcanvas() {
      // Implement your toggle logic here if needed
    }
  }
};
</script>

<style scoped>


.navbar-toggler-icon {
  background-image: none;
  width: 30px;
  height: 3px;
  background-color: #42210B;
  position: relative;
  display: inline-block;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: #42210B;
  left: 0;
}

.navbar-toggler-icon::before {
  top: -8px;
}

.navbar-toggler-icon::after {
  bottom: -8px;
}





/* Styles for offcanvas title */
.offcanvas-title {
  color: #42210B;
}

.offcanvas-body {
  background-color: #FFFC47;
}

.offcanvas-header {
  background-color: #FFFC47;
}

/* Styles for navbar-brand */
.navbar-brand {
  color: #42210B;
  /* Change to white */
  font-size: 40px;
  /* Adjust font size */
  padding: 5px 10px;
  /* Adjust padding */
}

/* Styles for navbar-toggler */
.navbar-toggler {
  background-color: #FFFC47;
  border: none; /* Removes the border */
  background-color: transparent; /* Makes the background transparent */
}

/* Styles for navbar */
.navbar {
  background-color: #FFFC47;
  /* Change background color */
  height: 50px;
  /* Adjust height */
  padding: 5px;
  /* Adjust padding */
  z-index: 1000; /* Ensures they appear above other content */
}

/* Adjust hamburger icon styles */
.navbar-toggler-icon {
  background-image: none;
  width: 30px;
  height: 3px;
  background-color: #42210B;
}

/* Offcanvas menu styles */
.offcanvas {
  background-color: #FFFC47;
}

</style>
