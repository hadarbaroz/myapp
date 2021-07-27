import React from 'react';
import BaseGame from "./BaseGame";
import {SecondGameDefinition} from "../database/game";

const SecondGame = () => {
  return <BaseGame gameDefinition={SecondGameDefinition} progressKey="progress2" />
}
export default SecondGame;