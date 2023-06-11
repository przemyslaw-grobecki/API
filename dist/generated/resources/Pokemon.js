"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonConverter = exports.Type = exports.Gender = exports.Ability = void 0;
/**
 * A pokemon passive ability that is it's birthright.
 */
var Ability;
(function (Ability) {
    Ability["AirLock"] = "air_lock";
    Ability["ArenaTrap"] = "arena_trap";
    Ability["BattleArmor"] = "battle_armor";
    Ability["Blaze"] = "blaze";
    Ability["Chlorophyl"] = "chlorophyl";
    Ability["ClearBody"] = "clear_body";
    Ability["CloudNine"] = "cloud_nine";
    Ability["ColorChange"] = "color_change";
    Ability["CompoundEyes"] = "compound_eyes";
    Ability["CuteCharm"] = "cute_charm";
    Ability["Damp"] = "damp";
    Ability["Drizzle"] = "drizzle";
    Ability["Drought"] = "drought";
    Ability["EarlyBird"] = "early_bird";
    Ability["EffectSpore"] = "effect_spore";
    Ability["FlameBody"] = "flame_body";
    Ability["FlashFire"] = "flash_fire";
    Ability["Forecast"] = "forecast";
    Ability["Guts"] = "guts";
    Ability["HugePower"] = "huge_power";
    Ability["Hustle"] = "hustle";
    Ability["HyperCutter"] = "hyper_cutter";
    Ability["Illuminate"] = "illuminate";
    Ability["Immunity"] = "immunity";
    Ability["InnerFocus"] = "inner_focus";
    Ability["Insomnia"] = "insomnia";
    Ability["Intimidate"] = "intimidate";
    Ability["KeenEye"] = "keen_eye";
    Ability["Levitate"] = "levitate";
    Ability["LightningRod"] = "lightning_rod";
    Ability["Limber"] = "limber";
    Ability["LiquidOoze"] = "liquid_ooze";
    Ability["MagmaArmor"] = "magma_armor";
    Ability["MagnetPull"] = "magnet_pull";
    Ability["MarvelScale"] = "marvel_scale";
    Ability["Minus"] = "minus";
    Ability["NaturalCure"] = "natural_cure";
    Ability["Oblivious"] = "oblivious";
    Ability["Overgrow"] = "overgrow";
    Ability["OwnTempo"] = "own_tempo";
    Ability["Pickup"] = "pickup";
    Ability["Plus"] = "plus";
    Ability["PoisonPoint"] = "poison_point";
    Ability["Pressure"] = "pressure";
    Ability["PurePower"] = "pure_power";
    Ability["RainDish"] = "rain_dish";
    Ability["RockHead"] = "rock_head";
    Ability["RoughSkin"] = "rough_skin";
    Ability["RunAway"] = "run_away";
    Ability["SandStream"] = "sand_stream";
    Ability["SandVeil"] = "sand_veil";
    Ability["SereneGrace"] = "serene_grace";
    Ability["ShadowTag"] = "shadow_tag";
    Ability["ShedSkin"] = "shed_skin";
    Ability["ShellArmor"] = "shell_armor";
    Ability["ShieldDust"] = "shield_dust";
    Ability["Soundproof"] = "soundproof";
    Ability["SpeedBoost"] = "speed_boost";
    Ability["Static"] = "static";
    Ability["Stench"] = "stench";
    Ability["StickyHold"] = "sticky_hold";
    Ability["Sturdy"] = "sturdy";
    Ability["SuctionCups"] = "suction_cups";
    Ability["Swarm"] = "swarm";
    Ability["SwiftSwim"] = "swift_swim";
    Ability["Synchronize"] = "synchronize";
    Ability["ThickFat"] = "thick_fat";
    Ability["Torrent"] = "torrent";
    Ability["Trace"] = "trace";
    Ability["Truant"] = "truant";
    Ability["VitalSpirit"] = "vital_spirit";
    Ability["VoltAbsorb"] = "volt_absorb";
    Ability["WaterAbsorb"] = "water_absorb";
    Ability["WaterVeil"] = "water_veil";
    Ability["WhiteSmoke"] = "white_smoke";
    Ability["WonderGuard"] = "wonder_guard";
})(Ability || (exports.Ability = Ability = {}));
/**
 * A pokemon's gender.
 */
var Gender;
(function (Gender) {
    Gender["Empty"] = "\u2640";
    Gender["Gender"] = "\u2642";
})(Gender || (Gender = {}));
/**
 * A pokemon's type.
 */
var Type;
(function (Type) {
    Type["Bug"] = "bug";
    Type["Dark"] = "dark";
    Type["Dragon"] = "dragon";
    Type["Electric"] = "electric";
    Type["Fairy"] = "fairy";
    Type["Fighting"] = "fighting";
    Type["Fire"] = "fire";
    Type["Flying"] = "flying";
    Type["Ghost"] = "ghost";
    Type["Grass"] = "grass";
    Type["Ground"] = "ground";
    Type["Ice"] = "ice";
    Type["Normal"] = "normal";
    Type["Poison"] = "poison";
    Type["Psychic"] = "psychic";
    Type["Rock"] = "rock";
    Type["Steel"] = "steel";
    Type["Water"] = "water";
})(Type || (exports.Type = Type = {}));
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
class PokemonConverter {
    static toPokemon(json) {
        return cast(JSON.parse(json), r("Pokemon"));
    }
    static pokemonToJson(value) {
        return JSON.stringify(uncast(value, r("Pokemon")), null, 2);
    }
}
exports.PokemonConverter = PokemonConverter;
function invalidValue(typ, val, key, parent = '') {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}
function prettyTypeName(typ) {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        }
        else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    }
    else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    }
    else {
        return typeof typ;
    }
}
function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}
function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}
function transform(val, typ, getProps, key = '', parent = '') {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val)
            return val;
        return invalidValue(typ, val, key, parent);
    }
    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            }
            catch (_) { }
        }
        return invalidValue(typs, val, key, parent);
    }
    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1)
            return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }
    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val))
            return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }
    function transformDate(val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }
    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result = {};
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
    if (typ === "any")
        return val;
    if (typ === null) {
        if (val === null)
            return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false)
        return invalidValue(typ, val, key, parent);
    let ref = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ))
        return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number")
        return transformDate(val);
    return transformPrimitive(typ, val);
}
function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}
function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}
function l(typ) {
    return { literal: typ };
}
function a(typ) {
    return { arrayItems: typ };
}
function u(...typs) {
    return { unionMembers: typs };
}
function o(props, additional) {
    return { props, additional };
}
function m(additional) {
    return { props: [], additional };
}
function r(name) {
    return { ref: name };
}
const typeMap = {
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
//# sourceMappingURL=Pokemon.js.map