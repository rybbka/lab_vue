<template>
  <main>
    <h1>"THINK BEFORE YOU MOVE"</h1>

    <!-- Kontrollerar om det finns schackpussel att visa -->
    <div v-if="chessPuzzles && chessPuzzles.length > 0" class="main-container">
      <!-- Komponent för att visa ett schackpussel. Props skickas för att bestämma vilket pussel som ska visas. -->
      <ChessPuzzle :fen="chessPuzzles[currentIndex].fen" :currentIndex="currentIndex" :totalPuzzles="chessPuzzles.length"
        :moves="chessPuzzles[currentIndex].moves" @updateIndex="updateCurrentIndex" @fetchNewPuzzle="fetchNewPuzzle" />
    </div>
    <!-- Visas om inga schackpussel laddats -->
    <div v-else>
      Loading chess puzzles...
    </div>
  </main>
</template>

<script>
import axios from 'axios'; // Importerar axios för att göra HTTP-anrop
import ChessPuzzle from '@/components/ChessPuzzle.vue'; // Importerar ChessPuzzle-komponenten
import { puzzles } from '@/data/puzzles.js'; // Importerar statisk data om schackpussel

export default {
  components: {
    ChessPuzzle // Registrerar ChessPuzzle-komponenten
  },
  data() {
    return {
      chessPuzzles: null, // Håller data om hämtade schackpussel
      currentIndex: 0, // Index för det aktuella schackpusslet som visas
    };
  },
  created() {
    this.fetchChessPuzzles(); // Hämtar schackpussel när komponenten skapas
  },
  methods: {
    async fetchChessPuzzles() {
      const options = {
        method: 'GET',
        url: 'https://chess-puzzles.p.rapidapi.com/',
        params: {
          themes: '["middlegame","advantage"]',
          rating: '1500',
          themesType: 'ALL',
          playerMoves: '4',
          count: '300'
        },
        timeout: 10000, // Timeout för anropet
        headers: {
          'X-RapidAPI-Key': 'be0e2c4958msh4c8518f1aaa0ddcp1587c9jsn88949b61706e',
          'X-RapidAPI-Host': 'chess-puzzles.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options); // Gör API-anropet
        this.chessPuzzles = response.data.puzzles; // Sparar svaret i chessPuzzles
      } catch (error) {
        console.error('Fel vid hämtning av schackpussel:', error); // Loggar fel om något går fel
        this.chessPuzzles = puzzles; // Använder statisk data som backup
      }
    },
    updateCurrentIndex(newIndex) {
      this.currentIndex = newIndex; // Uppdaterar index för det aktuella schackpusslet
    },
    fetchNewPuzzle() {
      this.currentIndex += 1; // Går till nästa schackpussel
    }
  }
};
</script>

<style scoped>
h1 {
  padding-top: 20px;
}
</style>
