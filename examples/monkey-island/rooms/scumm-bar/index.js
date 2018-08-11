import { actors } from "./actors";
import { items } from "./items";
import imagePath from "./background.jpg";
import { walkableArea } from "./walkable-area";
import { height, width } from "../../settings";

export const scummBarRoom = {
  id: "scumm-bar",
  name: "Scumm Bar",
  width,
  height,
  imagePath,
  items,
  actors,
  currentActorId: "pirate",
  currentVerb: "WALK",
  walkableArea
};
