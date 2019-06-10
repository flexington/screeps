interface IConfig {
    spawnEntries: Array<ISpawnEntry>;
    lastSpawned: string;

    lowPrio: number;
    lowTick: number;

    mediumPrio: number;
    mediumTick: number;

    highPrio: number;
    highTick: number;

    sources: Array<ISource>;
}