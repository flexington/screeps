interface IConfig {
    nexToSpawn: string;
    spawnEntries: Array<ISpawnEntry>;

    lowPrio: number;
    lowTick: number;

    mediumPrio: number;
    mediumTick: number;

    highPrio: number;
    highTick: number;

    sources: Array<ISource>;
}