/**
 * A pokemon.
 */
export interface Pokemon {
    /**
     * Passive effects that a certain pokemon has by it's birthright
     */
    abilities: Ability[];
    attack: number;
    defence: number;
    /**
     * The actual pokemon evolution
     */
    evolution: number;
    friendship: number;
    gender: Gender;
    /**
     * The generation in which the pokemon was introduced
     */
    generation: number;
    hp: number;
    /**
     * The unique identifier for a pokemon
     */
    id: number;
    /**
     * As the user will complete activities pokemon level will rise and increase pokemon stats
     */
    level?: number;
    /**
     * Name of the pokemon
     */
    name?: string;
    specialAttack: number;
    specialDefence: number;
    speed: number;
    types: Type[];
    price: any;
    [property: string]: any;
}
/**
 * A pokemon passive ability that is it's birthright.
 */
export declare enum Ability {
    AirLock = "air_lock",
    ArenaTrap = "arena_trap",
    BattleArmor = "battle_armor",
    Blaze = "blaze",
    Chlorophyl = "chlorophyl",
    ClearBody = "clear_body",
    CloudNine = "cloud_nine",
    ColorChange = "color_change",
    CompoundEyes = "compound_eyes",
    CuteCharm = "cute_charm",
    Damp = "damp",
    Drizzle = "drizzle",
    Drought = "drought",
    EarlyBird = "early_bird",
    EffectSpore = "effect_spore",
    FlameBody = "flame_body",
    FlashFire = "flash_fire",
    Forecast = "forecast",
    Guts = "guts",
    HugePower = "huge_power",
    Hustle = "hustle",
    HyperCutter = "hyper_cutter",
    Illuminate = "illuminate",
    Immunity = "immunity",
    InnerFocus = "inner_focus",
    Insomnia = "insomnia",
    Intimidate = "intimidate",
    KeenEye = "keen_eye",
    Levitate = "levitate",
    LightningRod = "lightning_rod",
    Limber = "limber",
    LiquidOoze = "liquid_ooze",
    MagmaArmor = "magma_armor",
    MagnetPull = "magnet_pull",
    MarvelScale = "marvel_scale",
    Minus = "minus",
    NaturalCure = "natural_cure",
    Oblivious = "oblivious",
    Overgrow = "overgrow",
    OwnTempo = "own_tempo",
    Pickup = "pickup",
    Plus = "plus",
    PoisonPoint = "poison_point",
    Pressure = "pressure",
    PurePower = "pure_power",
    RainDish = "rain_dish",
    RockHead = "rock_head",
    RoughSkin = "rough_skin",
    RunAway = "run_away",
    SandStream = "sand_stream",
    SandVeil = "sand_veil",
    SereneGrace = "serene_grace",
    ShadowTag = "shadow_tag",
    ShedSkin = "shed_skin",
    ShellArmor = "shell_armor",
    ShieldDust = "shield_dust",
    Soundproof = "soundproof",
    SpeedBoost = "speed_boost",
    Static = "static",
    Stench = "stench",
    StickyHold = "sticky_hold",
    Sturdy = "sturdy",
    SuctionCups = "suction_cups",
    Swarm = "swarm",
    SwiftSwim = "swift_swim",
    Synchronize = "synchronize",
    ThickFat = "thick_fat",
    Torrent = "torrent",
    Trace = "trace",
    Truant = "truant",
    VitalSpirit = "vital_spirit",
    VoltAbsorb = "volt_absorb",
    WaterAbsorb = "water_absorb",
    WaterVeil = "water_veil",
    WhiteSmoke = "white_smoke",
    WonderGuard = "wonder_guard"
}
/**
 * A pokemon's gender.
 */
export declare enum Gender {
    Empty = "\u2640",
    Gender = "\u2642"
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
export declare class PokemonConverter {
    static toPokemon(json: string): Pokemon;
    static pokemonToJson(value: Pokemon): string;
}
