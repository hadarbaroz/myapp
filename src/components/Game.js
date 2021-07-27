import React from 'react';
import BaseGame from "./BaseGame";
import {GameDefinition} from "../database/game";

const Game = () => {
  return <BaseGame gameDefinition={GameDefinition} progressKey="progress" />
}
export default Game;