AdventureJS is a JavaScript adventure game engine broadly inspired by the SCUMM engine. The goal here is to give developers an easy-to-use open-source framework specifically dedicated to develop adventure games.

We, at first, basically used the same data models that in SCUMM engine :

- Rooms, which consists of the background, playable and unplayable characters, items, cutscenes
- Actors, which consists of playable and unplayable characters, they can speak, interact with current Room items, move to (x, y) position
- Items, which consists of usable items, they can be used by Actors in the Room and have associated actions based on the Verb emitted by the current played Actor
- Verbs, which consists of actions emitted by the Actors, they are the buttons you usually see in the bottom bar in [old LucasArts games](https://www.scummvm.org/data/screenshots/lec/monkey/scummvm_0_4_7-full.png).

## The Adventure class

The Adventure class is the main class of AdventureJS. It is where you will initialize the game with the `Adventure.init()` method. The Adventure class also has the `Adventure.register()` method, it used for AdventureJS to register every single components of your game.

### Usage

index.js

```
import rooms from './rooms.js';
import actors from './actors.js;
import items from './items.js';

Adventure.register('ROOMS', rooms);
Adventure.register('ACTORS', actors);
Adventure.register('ITEMS', items);

Adventure.init();
```

rooms.js

```
import MeleeIsland from './melee-island.js';

export default rooms: Map<string, Room> = new Map();

rooms.set('MELEE_ISLAND', MeleeIsland);
```

melee-island.js

```
import { Room } from 'AdventureJS';
import { GuybrushThreepwood, ElaineMarley } from './actors.js';

class MeleeIsland implements Room {
    id: string = 1;
    name: string = 'MELEE_ISLAND';
    actors: Map<string, Actor> = new Map([['GUYBRUSH_THREEPWOOD', GuybrushThreepwood], ['ELAINE_MARLEY', ElaineMarley]]);
    items: Map<string, Item> = new Map([['MEAT', Meat]]);
}
```
