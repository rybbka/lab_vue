<template>
  <main>
    <h1>"THINK BEFORE YOU MOVE"</h1>

    <div v-if="chessPuzzles && chessPuzzles.length > 0" class="main-container">
      <ChessPuzzle :fen="chessPuzzles[currentIndex].fen" :currentIndex="currentIndex" :totalPuzzles="chessPuzzles.length"
        :moves="chessPuzzles[currentIndex].moves" @updateIndex="updateCurrentIndex" @fetchNewPuzzle="fetchNewPuzzle" />
    </div>
    <div v-else>
      Loading chess puzzles...
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import ChessPuzzle from '@/components/ChessPuzzle.vue';
import { puzzles } from '@/data/puzzles.js';

export default {
  components: {
    ChessPuzzle
  },
  data() {
    return {
      chessPuzzles: null,
      currentIndex: 0,
    };
  },
  created() {
    this.fetchChessPuzzles();
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
        timeout: 1000,
        headers: {
          'X-RapidAPI-Key': 'be0e2c4958msh4c8518f1aaa0ddcp1587c9jsn88949b61706e',
          'X-RapidAPI-Host': 'chess-puzzles.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        this.chessPuzzles = response.data.puzzles;
      } catch (error) {
        console.error('Fel vid hämtning av schackpussel:', error);
        this.chessPuzzles = puzzles;
      }
    },
    updateCurrentIndex(newIndex) {
      this.currentIndex = newIndex;
    },
    fetchNewPuzzle() {
      this.currentIndex += 1;
    }
  }
};
</script>

<style scoped>
h1 {
  padding-top: 20px;
}
</style>
