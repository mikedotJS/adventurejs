import { Adventure } from "../../lib";

import { rooms } from "./rooms";

const adventure = new Adventure(1220, 655);

adventure.registerRooms(rooms);
adventure.openRoom("scumm-bar");
