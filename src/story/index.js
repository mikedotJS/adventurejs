// @flow

import type { IGame, IStory, IChapter } from "./interface";
import type { IRoom, ISave } from "../room/interface";

export class Story implements IStory {
  chapters: Map<string, IChapter>;
  initialRoom: IRoom;
  currentRoom: IRoom;
  currentGame: IGame;

  constructor(initialRoom: IRoom, save?: IGame) {
    if (save) {
      this.initialRoom = save.currentRoom;
    } else {
      this.initialRoom = initialRoom;
    }
  }

  registerChapter(chapter: IChapter): void {
    this.chapters.set(chapter.id, chapter);
  }

  save(game: IGame) {
    const gameId = this.generateGameId();

    const currentGames = global.localStorage.getItem("SAVES");
    const newGame = {
      id: "Game" + ++currentGames.length,
      gameId
    };
    const saves = global.localStorage.get("SAVES");

    global.localStorage.setItem("SAVES", {
      ...saves,
      newGame
    });

    global.localStorage.setItem(gameId, JSON.stringify(game));
  }

  load(gameId: string) {
    this.currentGame = JSON.parse(global.localStorage.getItem(gameId));
  }

  generateGameId(): string {
    const gameId: string = `${this.currentRoom} - ${Date.now()}`;
    return gameId;
  }

  getSaves(): { [string]: ISave } {
    return global.localStorage.getItem("SAVES");
  }
}
