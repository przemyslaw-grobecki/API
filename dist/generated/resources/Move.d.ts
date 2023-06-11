/**
 * A pokemon's move.
 */
export interface Move {
    accuracy?: number;
    category?: Category;
    energyPoints?: number;
    id: number;
    pokemonId?: number;
    power?: number;
    type?: Type;
    [property: string]: any;
}
/**
 * A pokemon move's category.
 */
export declare enum Category {
    Physical = "Physical",
    Special = "Special",
    Status = "Status"
}
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
export declare class MoveConverter {
    static toMove(json: string): Move;
    static moveToJson(value: Move): string;
}
