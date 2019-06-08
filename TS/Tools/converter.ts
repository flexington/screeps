class Converter {
    /**
     * Converts a given IRoomPosition to an instance of RoomPosition
     * @param position IRoomPosition
     */
    public static toRoomPosition(position: IRoomPosition) {
        return new RoomPosition(position.x, position.y, position.room);
    }
}