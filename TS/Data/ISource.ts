/**
 * Description of a source
 */
interface ISource {
    /**
     * Position of the source
     */
    position: IRoomPosition;

    /**
     * Places around the source which can be used by screeps to harvest
     */
    places: Array<IRoomPosition>;

    /**
     * Creeps assigned to this source
     */
    creeps: Array<string>;
}