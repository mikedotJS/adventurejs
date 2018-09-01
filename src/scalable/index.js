// @flow

import type { IScalable } from "./interface";
import type { IRoom } from "../room/interface";

import { Renderable } from "../renderable";
import { rangeScale } from "../helpers/range-scale";

export class Scalable extends Renderable implements IScalable {
  yRange: [number, number];
  scaleRange: [number, number];

  scale: number;
  scaledWidth: number;
  scaledHeight: number;

  async init(room: IRoom): Promise<void> {
    await super.init();

    const yValues = room.walkableArea.map(point => point.y);

    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    this.yRange = [yMin, yMax];
    this.scaleRange = [room.yMinScale, 1];

    this.rescale();
  }

  rescale(): void {
    this.scale = rangeScale(this.y, this.yRange, this.scaleRange);

    this.scaledWidth = this.width * this.scale;
    this.scaledHeight = this.height * this.scale;
  }
}
