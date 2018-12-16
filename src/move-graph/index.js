import type { IMoveGraph } from "./interface";
import type { IPoint } from "../point/interface";
import { Point } from "../point";

export class MoveGraph implements IMoveGraph {
  walkableArea: IPoint[];
  actor: IPoint;
  borders: [IPoint, IPoint][];
  paths: [IPoint, IPoint][];
  mousePath: [IPoint, IPoint];

  static intersection(
    [a, b]: [IPoint, IPoint],
    [c, d]: [IPoint, IPoint]
  ): IPoint | false {
    // Length 0
    if ((a.x === b.x && a.y === b.y) || (c.x === d.x && c.y === d.y)) {
      return false;
    }

    const factor = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

    // Parallel lines
    if (factor === 0) {
      return false;
    }

    const ua = ((d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x)) / factor;
    const ub = ((b.x - a.x) * (a.y - c.y) - (b.y - a.y) * (a.x - c.x)) / factor;

    // Intersection along segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Intersection point
    const x = a.x + ua * (b.x - a.x);
    const y = a.y + ua * (b.y - a.y);

    return new Point(x, y);
  }

  constructor(walkableArea: IPoint[], actor: IPoint) {
    this.walkableArea = walkableArea;
    this.actor = actor;
    this.borders = [];
    this.paths = [];
    let previousPoint = null;

    this.walkableArea.forEach((point: IPoint) => {
      if (previousPoint) {
        this.borders.push([previousPoint, point]);
      }

      previousPoint = point;
    });

    if (this.walkableArea.length) {
      this.borders.push([previousPoint, this.walkableArea[0]]);
    }
  }

  updateMousePath(mousePosition: IPoint) {
    const intersects = this.borders.some((border: [IPoint, IPoint]) => {
      const intersectionPoint = MoveGraph.intersection(
        [this.actor, mousePosition],
        border
      );

      if (intersectionPoint) {
        this.mousePath = [this.actor, intersectionPoint];
      }

      return !!intersectionPoint;
    });

    if (!intersects) {
      this.mousePath = [this.actor, mousePosition];
    }
  }
}
