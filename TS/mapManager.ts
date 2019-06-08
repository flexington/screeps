class MapManager {
    private _lastTick: number;
    public readonly roomConfig: Array<IRoomConfig>;

    public checkRooms() {
        if (this._lastTick === undefined || Game.time > this._lastTick + 500) {
            // for (let name in Game.rooms) {
            //     let config: RoomConfig;
            //     config.roomName = name;
            //     config.maxHarvester = this.getMaxHarvesters(Game.rooms[name]);
            // }
        }
        return this.roomConfig;
    }

    /**
     * Get the maximum amount of harvesters for the current room.
     * To get the right amount, the number off accessable tiles around an energy source is used as well as the maximum amount of energy on that source.
     * @param room The room to be considered
     * @returns The amount of harvesters this room can utilize at the same time.
     */
    private getMaxHarvesters(room: Room) {
        // get sources for room
        let sources = room.find(FIND_SOURCES);
        let totalHarvester: number;
        // Loop through all sources
        for (let i: number, source: Source; source = sources[i]; i++) {
            // Get position of source
            let position: RoomPosition = source.pos;
            totalHarvester += this.getWalkableFields(position, position.roomName).length;
        }
        return totalHarvester;
    }

    /**
     * Get's all walkable fields (Plain and Swamp) around a given RoomPosition, where the position itself will be ignored.
     * @param position A RoomPosition as the center.
     * @param room The name of the room.
     * @returns A collection of RoomPositions representing all walkable fields AROUND that position.
     */
    public static getWalkableFields(position: IRoomPosition) {
        let terrain = new Room.Terrain(position.room);
        let fields: Array<RoomPosition> = [];
        for (let x: number = position.x - 1; x < position.x + 1; x++) {
            for (let y: number = position.y - 1; y < position.y + 1; y++) {
                if (x === position.x && y === position.y) continue;
                if (terrain.get(x, y) != 2) {
                    fields.push(new RoomPosition(x, y, position.room));
                }
            }
        }
        return fields;
    }
}