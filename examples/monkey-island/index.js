import { Adventure } from "../../lib";

import { rooms } from "./rooms";

Adventure.registerRooms(rooms);

Adventure.width = 1220;
Adventure.height = 655;

Adventure.init();
Adventure.openRoom("scumm-bar");
