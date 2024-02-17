<template>
  <div class="chess-puzzle">
    <div class="chess-board-container">
      <div ref="board" class="chess-board"></div>
    </div>
  </div>
</template>

<script>
import Chessboard from 'chessboardjs';

export default {
  props: {
    fen: String
  },
  mounted() {
    // Render the chessboard using chessboard.js
    Chessboard(this.$refs.board, {
      position: this.fen,
      draggable: false
    });
  }
};
</script>

<style scoped>
/* Add CSS styles for the ChessPuzzle component here */
.chess-puzzle {
  display: flex;
  justify-content: center;
}

.chess-board-container {
  margin-top: 50px;
  margin-bottom: 20px;
}

.chess-board {
  width: 600px;
}
</style>










<!-- <template>
  <div class="chess-puzzle">
    <div class="chess-board-container">
      <div ref="board" class="chess-board"></div>
    </div>
    <div class="fen-code">
      <p>{{ fen }}</p>
    </div>
  </div>
</template>

<script>
import Chessboard from 'chessboardjs'; // Import Chessboard from the chessboardjs library

export default {
  props: {
    fen: String
  },
  mounted() {
    // Log the FEN notation to verify if it's correct
    console.log('FEN notation:', this.fen);

    // Render the chessboard using chessboard.js with the pieceTheme option
    Chessboard(this.$refs.board, {
      pieceTheme: (piece) => {
        // Return the path to the chess piece image based on the piece code
        return `/img/chesspieces/wikipedia/${piece}.png`;
      },
      position: this.fen,
      draggable: false
    });
  } // Add this closing curly brace
}
</script>

<style scoped>
/* Add CSS styles for the ChessPuzzle component here */
.chess-puzzle {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chess-board-container {
  margin-top: 50px;
  margin-bottom: 20px;
}

.chess-board {
  width: 600px; /* Adjust the width as needed */
}

.fen-code {
  font-family: monospace;
  color: #555;
}
</style> -->
