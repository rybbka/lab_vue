<template>
  <header>
    <!-- Navbar with a fixed position at the top of the page -->
    <nav class="navbar bg-dark-green fixed-top">
      <div class="container-fluid">

        <!-- RouterLink functioning as a link to the home page with the text "CHESS PROBLEMS" -->
        <RouterLink class="navbar-brand" to="/">CHESS PROBLEMS</RouterLink>

        <!-- Offcanvas menu toggle button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
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
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <RouterLink class="nav-link active" to="/">CHESS PROBLEMS</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about">ABOUT</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- RouterView is used to render the current routed component -->
  <RouterView />
</template>

<style scoped>
/* Styles for header element, set line height and max height */
header {
  line-height: 0;
  max-height: 50vh;
}

/* Styles for offcanvas title, set text color to hot pink */
.offcanvas-title {
  color: #ff69b4;
}

/* Styles for navbar-brand, set text color to white */
.navbar-brand {
  color: #ffffff; /* Change to white */
  font-size: 20px; /* Adjust font size */
  padding: 5px 10px; /* Adjust padding */
}

/* Styles for navbar-toggler, set background color to white */
.navbar-toggler {
  background-color: #ffffff; /* Change to white */
}

/* New styles for navbar */
.navbar {
  background-color: #031e03; /* Change background color to dark green */
  height: 90px; /* Adjust height */
  padding: 5px; /* Adjust padding */
}
</style>
