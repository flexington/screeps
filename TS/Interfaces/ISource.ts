/**
 * Description of a source
 */
interface ISource {
    /**
     * Position of the source
     */
    position: IPosition;

    /**
     * Places around the source which can be used by screeps to harvest
     */
    places: Array<IAssignablePosition>;
}