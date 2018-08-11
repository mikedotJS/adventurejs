import { Adventure } from "../../lib";

import { width, height } from "./settings.json";
import { rooms } from "./rooms";

const adventure = new Adventure(width, height);

adventure.registerRooms(rooms);
adventure.openRoom("scumm-bar");
