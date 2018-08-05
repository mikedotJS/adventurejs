import { actors } from "./actors";
import { items } from "./items";

import background from "./background.jpg";
import { walkableArea } from "./walkable-area";

export const scummBarRoom = {
  id: "scumm-bar",
  name: "Scumm Bar",
  background,
  items,
  actors,
  currentActorId: "pirate",
  currentVerb: "WALK",
  walkableArea
};
