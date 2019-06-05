# Screeps

## Harvester
---
### Tasks
The only task of a harvester is to receive energy from an energy source and drop it immediatly to make it available for every other creep.
### Configuration
`[MOVE, WORK, WORK]`
## Carrier
---
### Tasks
A carrier carries dropped resources to containers.
### Configuration
## Upgrader
---
### Tasks
The main task of the upgrader is to upgrade and maintain the room controller as well as all spawns. If the controller and spawns are fine, the upgrader becomes a repairer until there's something to do for the main task.
### Configuration
`[MOVE, WORK, WORK, CARRY]`
## Builder
---
Builder are (surprisingly) respsonible for all construction sites, if there are no construction sites, the builder becomes a repairer.
### Tasks
### Configuration
## Repairer
---
The task of the repairer is to repair all structures in the room.
### Tasks
### Configuration