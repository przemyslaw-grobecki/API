/**
 * A pokemon's type.
 */
export declare enum Type {
    Bug = "bug",
    Dark = "dark",
    Dragon = "dragon",
    Electric = "electric",
    Fairy = "fairy",
    Fighting = "fighting",
    Fire = "fire",
    Flying = "flying",
    Ghost = "ghost",
    Grass = "grass",
    Ground = "ground",
    Ice = "ice",
    Normal = "normal",
    Poison = "poison",
    Psychic = "psychic",
    Rock = "rock",
    Steel = "steel",
    Water = "water"
}
export declare class Convert {
    static toType(json: string): Type;
    static typeToJson(value: Type): string;
}
