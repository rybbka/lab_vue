<template>
  <div class="about">
    <h1>(CP) is on a relentless quest to unearth the world's finest chess puzzles, offering them to you, our fellow aficionados, free of charge, 4-ever.</h1>
    <img src="@/assets/img/chesspieces_exp.png" alt="Chess pieces explained" class="about-image"/>
  </div>
</template>

<style scoped>
@media (min-width: 300px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column; /* Ändra till column för att ordna innehållet vertikalt */
    align-items: center; /* Centrerar innehållet horisontellt */
    justify-content: center; /* Centrerar innehållet vertikalt */
    background-color: #42210B;
    padding: 0;
  }

  .brand {
    color: #FFFC47; 
  }

  h1 {
    font-size: 2em;
    color: #FFFC47;
    padding: 1em;
  }


  .about-image {
    max-width: 40%; /* Gör att bilden inte överskrider containerbredden */
    height: auto;
    padding: 1em;
    padding-bottom: 10em;
  }

  body {
    padding-top: 2em;
    padding-bottom: 1em;
  }
}
</style>
