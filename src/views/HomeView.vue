<template>
  <main>
    <h1>CHESS PROBLEMS</h1>
    <!-- Check if chessPuzzles is not null and has at least one puzzle -->
    <div v-if="chessPuzzles && chessPuzzles.length > 0">
      <!-- Render the first puzzle -->
      <ChessPuzzle :fen="chessPuzzles[0].fen" />
    </div>
    <div v-else>
      Loading chess puzzle...
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import ChessPuzzle from '@/components/ChessPuzzle.vue';

export default {
  components: {
    ChessPuzzle
  },
  data() {
    return {
      chessPuzzles: null
    };
  },
  created() {
    this.fetchChessPuzzles(); // Call the method to fetch chess puzzles when the component is created
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
          count: '25'
        },
        headers: {
          'X-RapidAPI-Key': 'be0e2c4958msh4c8518f1aaa0ddcp1587c9jsn88949b61706e',
          'X-RapidAPI-Host': 'chess-puzzles.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data); // Log the response data to the console for debugging
        // Set the fetched chess puzzles to the data property
        this.chessPuzzles = response.data.puzzles;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
