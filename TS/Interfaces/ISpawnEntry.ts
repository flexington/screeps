interface ISpawnEntry {
    name: string;
    body: BodyPartConstant[];
    role: string;
    isBusy: boolean;
    target: IPosition;
}