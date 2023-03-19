import BasePokeResource from '../../BasePokeResource';

export const POKEMON_ROUTE : string = "/pokemon";

// To parse this data:
//
//   import { Convert, Pokemon } from "./file";
//
//   const pokemon = Convert.toPokemon(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * A pokemon.
 */
export class Pokemon extends BasePokeResource {
    /**
     * Passive effects that a certain pokemon has by it's birthright
     */
    abilities: Ability[];
    attack:    number;
    defence:   number;
    /**
     * The actual pokemon evolution
     */
    evolution:  number;
    friendship: number;
    gender:     Gender;
    /**
     * The generation in which the pokemon was introduced
     */
    generation: number;
    hp:         number;
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
    name?:          string;
    specialAttack:  number;
    specialDefence: number;
    speed:          number;
    types:          Type[];
    price:          any;
    moves:          any;
	Delete = () : void => {
		this.HttpDelete(POKEMON_ROUTE);
	}

	Modify = () : void => {
		this.HttpPatch(POKEMON_ROUTE);
	}


}

/**
 * A pokemon passive ability that is it's birthright.
 */
export enum Ability {
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
    WonderGuard = "wonder_guard",
}

/**
 * A pokemon's gender.
 */
export enum Gender {
    Empty = "♀",
    Gender = "♂",
}

/**
 * A pokemon's type.
 */
export enum Type {
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
    Water = "water",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class PokemonConverter {
    public static toPokemon(json: string): Pokemon {
        return cast(JSON.parse(json), r("Pokemon"));
    }

    public static pokemonToJson(value: Pokemon): string {
        return JSON.stringify(uncast(value, r("Pokemon")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Pokemon": o([
        { json: "abilities", js: "abilities", typ: a(r("Ability")) },
        { json: "attack", js: "attack", typ: 0 },
        { json: "defence", js: "defence", typ: 0 },
        { json: "evolution", js: "evolution", typ: 0 },
        { json: "friendship", js: "friendship", typ: 0 },
        { json: "gender", js: "gender", typ: r("Gender") },
        { json: "generation", js: "generation", typ: 0 },
        { json: "hp", js: "hp", typ: 0 },
        { json: "id", js: "id", typ: 0 },
        { json: "level", js: "level", typ: u(undefined, 0) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "specialAttack", js: "specialAttack", typ: 0 },
        { json: "specialDefence", js: "specialDefence", typ: 0 },
        { json: "speed", js: "speed", typ: 0 },
        { json: "types", js: "types", typ: a(r("Type")) },
        { json: "price", js: "price", typ: "any" },
        { json: "moves", js: "moves", typ: "any" },
    ], "any"),
    "Ability": [
        "air_lock",
        "arena_trap",
        "battle_armor",
        "blaze",
        "chlorophyl",
        "clear_body",
        "cloud_nine",
        "color_change",
        "compound_eyes",
        "cute_charm",
        "damp",
        "drizzle",
        "drought",
        "early_bird",
        "effect_spore",
        "flame_body",
        "flash_fire",
        "forecast",
        "guts",
        "huge_power",
        "hustle",
        "hyper_cutter",
        "illuminate",
        "immunity",
        "inner_focus",
        "insomnia",
        "intimidate",
        "keen_eye",
        "levitate",
        "lightning_rod",
        "limber",
        "liquid_ooze",
        "magma_armor",
        "magnet_pull",
        "marvel_scale",
        "minus",
        "natural_cure",
        "oblivious",
        "overgrow",
        "own_tempo",
        "pickup",
        "plus",
        "poison_point",
        "pressure",
        "pure_power",
        "rain_dish",
        "rock_head",
        "rough_skin",
        "run_away",
        "sand_stream",
        "sand_veil",
        "serene_grace",
        "shadow_tag",
        "shed_skin",
        "shell_armor",
        "shield_dust",
        "soundproof",
        "speed_boost",
        "static",
        "stench",
        "sticky_hold",
        "sturdy",
        "suction_cups",
        "swarm",
        "swift_swim",
        "synchronize",
        "thick_fat",
        "torrent",
        "trace",
        "truant",
        "vital_spirit",
        "volt_absorb",
        "water_absorb",
        "water_veil",
        "white_smoke",
        "wonder_guard",
    ],
    "Gender": [
        "♀",
        "♂",
    ],
    "Type": [
        "bug",
        "dark",
        "dragon",
        "electric",
        "fairy",
        "fighting",
        "fire",
        "flying",
        "ghost",
        "grass",
        "ground",
        "ice",
        "normal",
        "poison",
        "psychic",
        "rock",
        "steel",
        "water",
    ],
};

