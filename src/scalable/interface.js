// @flow

import type { IRenderable } from "../renderable/interface";
import type { IRoom } from "../room/interface";

export interface IScalable extends IRenderable {
  yRange: [number, number];
  scaleRange: [number, number];

  scale: number;
  scaledWidth: number;
  scaledHeight: number;

  init(room: IRoom): Promise<void>;
  rescale(): void;
}
