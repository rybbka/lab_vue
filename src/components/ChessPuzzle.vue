<template>
  <div class="container">
    <div class="chessboard-container">
      <div ref="board" class="board" id="board"></div>
    </div>
    <div class="puzzle-status">{{ puzzleStatus }}</div>

    <div class="buttons">
      <button @click="fetchNewPuzzle">New Puzzle</button>
      <button @click="resetBoard()">Reset Board</button>
    </div>
    <div class="moves">
      <input type="checkbox" id="show-moves" v-model="showMoves" />
      <label for="show-moves">SHOW SOLUTION</label>
      <ul v-if="showMoves" class="moves-list">
        <li v-for="(move, index) in moves" :key="index">
          {{ move }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { Chessboard, INPUT_EVENT_TYPE } from 'cm-chessboard';
import { MARKER_TYPE, Markers } from "cm-chessboard/src/extensions/markers/Markers.js";
import { PromotionDialog } from "cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js";
import { Chess } from 'chess.js';
import { markRaw } from 'vue';





export default {
  props: {
    fen: String,
    currentIndex: Number,
    moves: String || Array,
    totalPuzzles: Number,
  },

  computed: {
    puzzleStatus() {
      return `PUZZLE ${this.currentIndex + 1} / ${this.totalPuzzles}`;
    }
  },

  data() {
    return {
      chessboard: null,
      game: new Chess(markRaw(this.fen)),
      useCustomPieces: false,
      username: '',
      showMoves: false
    };
  },
  mounted() {
    this.initializeChessboard();
  },
  watch: {
    fen(newFen) {
      this.chessboard.setPosition(newFen);
    }
  },
  methods: {
    initializeChessboard() {

      this.chessboard = new Chessboard(this.$refs.board, {
        position: markRaw(this.fen),
        assetsUrl: "./cm-chessboard/",
        extensions: [
          { class: Markers, props: { autoMarkers: MARKER_TYPE.square } },
          { class: PromotionDialog },
        ]
      });

      // Bind the input handler to the component's context
      const inputHandlerBound = this.inputHandler.bind(this);
      this.chessboard.enableMoveInput(inputHandlerBound);
    },

    inputHandler(event) {
      console.log(event)
      switch (event.type) {
        case INPUT_EVENT_TYPE.moveInputStarted:
          console.log(`moveInputStarted: ${event.squareFrom}`)
          return true // false cancels move
        case INPUT_EVENT_TYPE.validateMoveInput:
          console.log(`validateMoveInput: ${event.squareFrom}-${event.squareTo}`)
          return true // false cancels move
        case INPUT_EVENT_TYPE.moveInputCanceled:
          console.log(`moveInputCanceled`)
          break
        case INPUT_EVENT_TYPE.moveInputFinished:
          console.log(`moveInputFinished`)
          break
        case INPUT_EVENT_TYPE.movingOverSquare:
          console.log(`movingOverSquare: ${event.squareTo}`)
          break
      }
    },

    displayMoves() {
      // Backup puzzles have moves as string but api returs them as array
      if (Array.isArray(this.moves)) {
        return this.moves.join(' ');
      } else {
        return this.moves;
      }
    },

    fetchNewPuzzle() {
      console.log('Fetch new puzzle method called');
      this.$emit('fetchNewPuzzle');
      // Använd detta event för att meddela din föräldrakomponent att hämta ett nytt pussel
    },
    resetBoard() {
      // Återställer brädet till det aktuella FEN-läget
      console.log('Reset board method called')
      this.chessboard.setPosition(this.fen);
    },
  }
}
</script>

<style scoped>
.puzzle-status {
  font-size: 0.8em;
  /* Adjust the font size */
  color: #42210B;
  /* Set the text color */
  text-align: center;
  /* Center the text */
  padding: 20px;
  /* Add some padding for spacing */
  margin: 10px 0;
  /* Add margin for spacing from other elements */
  width: auto;
  /* Adjust width as needed */
}
</style>




<style>
/* Add CSS styles for the ChessPuzzle component here */

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chessboard-container {
  margin-bottom: 0.5rem;
  /* Add margin between chessboard and buttons */
}



.buttons button {
  display: inline-block;
  margin-right: 2rem;
  margin-left: 2rem;
  background-color: #FFFC47;
  /* Set to match background color */
}

div.board {
  float: center;
  max-width: 500px;
  /* Maximum width */
  width: 80vw;
  margin-bottom: 1rem;
}

.chessboard-container {
  display: flex;
  justify-content: center;
  max-width: 500px;
  /* Maximum width */
  width: 80vw;
  max-height: 80vh;
  /* Maximum height */
}



.buttons {
  display: block;
  /* Change from flex to block */
  text-align: center;
  /* Align button text to center */
  margin-top: 1rem;
  padding-bottom: 2rem;
  background-color: #FFFC47;
  /* Set to match background color */
}

.moves {
  text-align: center;
  margin-bottom: 6rem;
  background-color: #FFFC47;
  font-size: 0.8em;
  /* Set to match background color */
}

.cm-chessboard .coordinates,
.cm-chessboard .markers-layer,
.cm-chessboard .pieces-layer,
.cm-chessboard .markers-top-layer {
  pointer-events: none;
}

.cm-chessboard-content .list-inline {
  padding-left: 0;
  list-style: none;
}

.cm-chessboard-content .list-inline-item {
  display: inline-block;
}

.cm-chessboard-content .list-inline-item:not(:last-child) {
  margin-right: 1rem;
}

.cm-chessboard-content .list-inline {
  padding-left: 0;
  list-style: none;
}

.cm-chessboard-content .list-inline-item {
  display: inline-block;
}

.cm-chessboard-content .list-inline-item:not(:last-child) {
  margin-right: 1rem;
}

.cm-chessboard-accessibility.visually-hidden {
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.cm-chessboard.default .board .square.white {
  fill: #FFFC47;
}

.cm-chessboard.default .board .square.black {
  fill: #42210B;
}

.cm-chessboard.default.border-type-thin .board .border {
  stroke: #c5a076;
  stroke-width: 0.7%;
  fill: #c5a076;
}

.cm-chessboard.default.border-type-none .board .border {
  stroke: #c5a076;
  stroke-width: 0;
  fill: #c5a076;
}

.cm-chessboard.default.border-type-frame .board .border {
  fill: #ecdab9;
  stroke: none;
}

.cm-chessboard.default.border-type-frame .board .border-inner {
  fill: #c5a076;
  stroke: #c5a076;
  stroke-width: 0.7%;
}

.cm-chessboard.default .coordinates {
  pointer-events: none;
  user-select: none;
}

.cm-chessboard.default .coordinates .coordinate {
  fill: #b5936d;
  font-size: 7px;
  cursor: default;
}

.cm-chessboard.default .coordinates .coordinate.black {
  fill: #42210B
}

.cm-chessboard.default .coordinates .coordinate.white {
  fill: #FFFC47;
}

.cm-chessboard.default-contrast .board .square.white {
  fill: #ecdab9;
}

.cm-chessboard.default-contrast .board .square.black {
  fill: #c5a076;
}

.cm-chessboard.default-contrast.border-type-thin .board .border {
  stroke: #c5a076;
  stroke-width: 0.7%;
  fill: #c5a076;
}

.cm-chessboard.default-contrast.border-type-none .board .border {
  stroke: #c5a076;
  stroke-width: 0;
  fill: #c5a076;
}

.cm-chessboard.default-contrast.border-type-frame .board .border {
  fill: #ecdab9;
  stroke: none;
}

.cm-chessboard.default-contrast.border-type-frame .board .border-inner {
  fill: #c5a076;
  stroke: #c5a076;
  stroke-width: 0.7%;
}

.cm-chessboard.default-contrast .coordinates {
  pointer-events: none;
  user-select: none;
}

.cm-chessboard.default-contrast .coordinates .coordinate {
  fill: #b5936d;
  font-size: 7px;
  cursor: default;
}

.cm-chessboard.default-contrast .coordinates .coordinate.black {
  fill: #333;
}

.cm-chessboard.default-contrast .coordinates .coordinate.white {
  fill: #333;
}



body {
  background-color: #FFFC47;

}

h1 {
  font-size: 20px;
  text-align: center;
  color: #42210B;
  padding-bottom: 1em;
  margin-top: 2em;
  margin-bottom: 1em;
}

/* Hover effect */
.main:hover input~.checkbox-container {
  background-color: yellow;
}

/* Active effect */
.main input:active~.checkbox-container {
  background-color: red;
}

/* Checked effect */
.main input:checked~.checkbox-container {
  background-color: green;
}

/* Checkmark */
.checkbox-container:after {
  content: "";
  position: absolute;
  display: none;
}

/* Display checkmark when checked */
.main input:checked~.checkbox-container:after {
  display: block;
}
</style>
