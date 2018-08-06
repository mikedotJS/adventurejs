import { actors } from "./actors";
import { items } from "./items";
import imagePath from "./background.jpg";
import { walkableArea } from "./walkable-area";

export const scummBarRoom = {
  id: "scumm-bar",
  name: "Scumm Bar",
  imagePath,
  items,
  actors,
  currentActorId: "pirate",
  currentVerb: "WALK",
  walkableArea
};
