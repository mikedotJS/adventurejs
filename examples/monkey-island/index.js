import { Adventure } from "../../lib";

const adventure = new Adventure({
  width: 640,
  height: 380,
  rooms: [
    {
      id: "scumm-bar",
      name: "Scumm Bar",
      items: [
        {
          id: "sword",
          name: "Sword",
          actions: {
            PICK_UP: () => {}
          },
          inventoryImage: "assets/images/inventory/sword.jpg"
        }
      ],
      actors: [
        {
          id: "pirate",
          name: "Pirate",
          inventory: []
        }
      ],
      currentActorId: "pirate",
      currentVerb: "WALK"
    }
  ]
});

document.addEventListener("DOMContentLoaded", () => adventure.init());
