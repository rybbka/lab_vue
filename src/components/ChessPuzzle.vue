<template>
  <div class="container">
    <!-- Schackbrädet och dess container -->
    <div class="chessboard-container">
      <div ref="board" class="board" id="board"></div>
    </div>
    <!-- Visar status för det aktuella pusslet, t.ex. "PUZZLE 1 / 10" -->
    <div class="puzzle-status">{{ puzzleStatus }}</div>

    <!-- Knappar för att hämta ett nytt pussel och återställa brädet -->
    <div class="buttons">
      <button @click="fetchNewPuzzle">New Puzzle</button>
      <button @click="resetBoard()">Reset Board</button>
    </div>
    <!-- Alternativ för att visa drag (lösningen) för det aktuella pusslet -->
    <div class="moves">
      <input type="checkbox" id="show-moves" v-model="showMoves" />
      <label for="show-moves">SHOW SOLUTION</label>
      <!-- Lista som visar pusslets drag om 'showMoves' är sann -->
      <ul v-if="showMoves" class="moves-list">
        <li v-for="(move, index) in moves" :key="index">
          {{ move }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Importerar nödvändiga bibliotek och komponenter
import { Chessboard, INPUT_EVENT_TYPE } from 'cm-chessboard';
import { MARKER_TYPE, Markers } from "cm-chessboard/src/extensions/markers/Markers.js";
import { PromotionDialog } from "cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js";
import { Chess } from 'chess.js';
import { markRaw } from 'vue';

export default {
  props: {
    fen: String,
    currentIndex: Number,
    moves: [String, Array],
    totalPuzzles: Number,
  },

  computed: {
    // Beräknar och visar status för det aktuella pusslet
    puzzleStatus() {
      return `PUZZLE ${this.currentIndex + 1} / ${this.totalPuzzles}`;
    }
  },

  data() {
    return {
      chessboard: null, // Referens till schackbrädet
      game: new Chess(markRaw(this.fen)), // Initierar ett schackspel med startpositionen från FEN
      useCustomPieces: false, // Anger om anpassade pjäser ska användas
      username: '', // Användarnamn (ej använd i denna komponent)
      showMoves: false // Anger om lösningen (drag) ska visas
    };
  },
  mounted() {
    // Initierar schackbrädet när komponenten är monterad
    this.initializeChessboard();
  },
  watch: {
    // Uppdaterar brädets position när 'fen'-prop ändras
    fen(newFen) {
      this.chessboard.setPosition(newFen);
    }
  },
  methods: {
    // Initierar och konfigurerar schackbrädet
    initializeChessboard() {
      this.chessboard = new Chessboard(this.$refs.board, {
        position: markRaw(this.fen), // Sätter startpositionen för brädet
        assetsUrl: "./cm-chessboard/", // Sökväg till schackbrädets resurser
        extensions: [
          { class: Markers, props: { autoMarkers: MARKER_TYPE.square } },
          { class: PromotionDialog },
        ]
      });

      // Binder händelsehanteraren för input till denna komponents kontext
      const inputHandlerBound = this.inputHandler.bind(this);
      this.chessboard.enableMoveInput(inputHandlerBound);
    },

    // Hanterar olika typer av input-händelser på schackbrädet
    inputHandler(event) {
      console.log(event)
      switch (event.type) {
        case INPUT_EVENT_TYPE.moveInputStarted:
          console.log(`moveInputStarted: ${event.squareFrom}`)
          return true // false avbryter draget
        case INPUT_EVENT_TYPE.validateMoveInput:
          console.log(`validateMoveInput: ${event.squareFrom}-${event.squareTo}`)
          return true // false avbryter draget
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

    // Visar pusslets drag
    displayMoves() {
      // Hanterar om 'moves' är en sträng eller en array och konverterar till en sträng
      if (Array.isArray(this.moves)) {
        return this.moves.join(' ');
      } else {
        return this.moves;
      }
    },

    // Meddelar föräldrakomponenten att hämta ett nytt pussel
    fetchNewPuzzle() {
      console.log('Fetch new puzzle method called');
      this.$emit('fetchNewPuzzle');
    },
    // Återställer schackbrädet till dess ursprungliga position baserat på FEN
    resetBoard() {
      console.log('Reset board method called')
      this.chessboard.setPosition(this.fen);
    },
  }
}
</script>

<!-- Stilsektionen definierar utseendet för olika delar av komponenten, inklusive schackbrädet, knapparna och texten -->
<style scoped>
/* Stil för pusselstatus */
.puzzle-status {
  font-size: 0.8em;
  color: #42210B;
  text-align: center;
  padding: 20px;
  margin: 10px 0;
  width: auto;
}
</style>

<style>
/* Stilar för container, schackbrädet, knappar och draglistan */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chessboard-container {
  margin-bottom: 0.5rem;
}

.buttons button {
  display: inline-block;
  margin-right: 2rem;
  margin-left: 2rem;
  background-color: #FFFC47;
}

div.board {
  float: center;
  max-width: 500px;
  width: 80vw;
  margin-bottom: 1rem;
}

.chessboard-container {
  display: flex;
  justify-content: center;
  max-width: 500px;
  width: 80vw;
  max-height: 80vh;
}

.buttons {
  display: block;
  text-align: center;
  margin-top: 1rem;
  padding-bottom: 2rem;
  background-color: #FFFC47;
}

.moves {
  text-align: center;
  margin-bottom: 6rem;
  background-color: #FFFC47;
  font-size: 0.8em;
  color: #42210B;
}

/* Stilar för schackbrädets utseende och beteende */
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

/* Stilar för anpassning av schackbrädets färger */
.cm-chessboard.default .board .square.white {
  fill: #FFFC47;
}

.cm-chessboard.default .board .square.black {
  fill: #42210B;
}

/* Stilar för koordinater och rutor på schackbrädet */
.cm-chessboard.default .coordinates .coordinate {
  fill: #b5936d;
  font-size: 7px;
}

.cm-chessboard.default .coordinates .coordinate.black {
  fill: #42210B
}

.cm-chessboard.default .coordinates .coordinate.white {
  fill: #FFFC47;
}

/* Ytterligare stilar för bakgrund och text */
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
</style>
