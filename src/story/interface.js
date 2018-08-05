// @flow

import type { IRoom } from "../room/interface";
import type { IActor } from "../actor/interface";

export interface IGame {
  id: string;
  chapters: Map<string, IChapter>;
  currentRoom: IRoom;
  currentActor: IActor;
}

export interface IChapter {
  id: string;
  isComplete: boolean;
}

export interface IStory {
  chapters: Map<string, IChapter>;
  initialRoom: IRoom;
  registerChapter(chapter: IChapter): void;
  save(game: IGame): void;
  load(gameId: string): void;
  generateGameId(): string;
}
