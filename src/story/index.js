// @flow

import type { IGame, IStory, IChapter } from "./interface";
import type { IRoom } from "../room/interface";

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
    global.localStorage.setItem(this.generateGameId(), JSON.stringify(game));
  }

  load(gameId: string) {
    this.currentGame = JSON.parse(global.localStorage.getItem(gameId));
  }

  generateGameId(): string {
    const gameId: string = `${this.currentRoom} - ${Date.now()}`;
    return gameId;
  }
}
