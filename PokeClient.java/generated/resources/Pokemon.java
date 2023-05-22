// Converter.java

// To use this code, add the following Maven dependency to your project:
//
//
//     com.fasterxml.jackson.core     : jackson-databind          : 2.9.0
//     com.fasterxml.jackson.datatype : jackson-datatype-jsr310   : 2.9.0
//
// Import this package:
//
//     import io.quicktype.Converter;
//
// Then you can deserialize a JSON string with
//
//     Pokemon data = Converter.fromJsonString(jsonString);

package io.quicktype;

import java.io.IOException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.OffsetTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;

public class Converter {
    // Date-time helpers

    private static final DateTimeFormatter DATE_TIME_FORMATTER = new DateTimeFormatterBuilder()
            .appendOptional(DateTimeFormatter.ISO_DATE_TIME)
            .appendOptional(DateTimeFormatter.ISO_OFFSET_DATE_TIME)
            .appendOptional(DateTimeFormatter.ISO_INSTANT)
            .appendOptional(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SX"))
            .appendOptional(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ssX"))
            .appendOptional(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
            .toFormatter()
            .withZone(ZoneOffset.UTC);

    public static OffsetDateTime parseDateTimeString(String str) {
        return ZonedDateTime.from(Converter.DATE_TIME_FORMATTER.parse(str)).toOffsetDateTime();
    }

    private static final DateTimeFormatter TIME_FORMATTER = new DateTimeFormatterBuilder()
            .appendOptional(DateTimeFormatter.ISO_TIME)
            .appendOptional(DateTimeFormatter.ISO_OFFSET_TIME)
            .parseDefaulting(ChronoField.YEAR, 2020)
            .parseDefaulting(ChronoField.MONTH_OF_YEAR, 1)
            .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
            .toFormatter()
            .withZone(ZoneOffset.UTC);

    public static OffsetTime parseTimeString(String str) {
        return ZonedDateTime.from(Converter.TIME_FORMATTER.parse(str)).toOffsetDateTime().toOffsetTime();
    }
    // Serialize/deserialize helpers

    public static Pokemon fromJsonString(String json) throws IOException {
        return getObjectReader().readValue(json);
    }

    public static String toJsonString(Pokemon obj) throws JsonProcessingException {
        return getObjectWriter().writeValueAsString(obj);
    }

    private static ObjectReader reader;
    private static ObjectWriter writer;

    private static void instantiateMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<OffsetDateTime>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        reader = mapper.readerFor(Pokemon.class);
        writer = mapper.writerFor(Pokemon.class);
    }

    private static ObjectReader getObjectReader() {
        if (reader == null) instantiateMapper();
        return reader;
    }

    private static ObjectWriter getObjectWriter() {
        if (writer == null) instantiateMapper();
        return writer;
    }
}

// Pokemon.java

package io.quicktype;

import com.fasterxml.jackson.annotation.*;

/**
 * A pokemon.
 */
public class Pokemon {
    private Ability[] abilities;
    private long attack;
    private long defence;
    private long evolution;
    private long friendship;
    private Gender gender;
    private long generation;
    private long hp;
    private long id;
    private Long level;
    private String name;
    private long specialAttack;
    private long specialDefence;
    private long speed;
    private Type[] types;
    private Object price;

    /**
     * Passive effects that a certain pokemon has by it's birthright
     */
    @JsonProperty("abilities")
    public Ability[] getAbilities() { return abilities; }
    @JsonProperty("abilities")
    public void setAbilities(Ability[] value) { this.abilities = value; }

    @JsonProperty("attack")
    public long getAttack() { return attack; }
    @JsonProperty("attack")
    public void setAttack(long value) { this.attack = value; }

    @JsonProperty("defence")
    public long getDefence() { return defence; }
    @JsonProperty("defence")
    public void setDefence(long value) { this.defence = value; }

    /**
     * The actual pokemon evolution
     */
    @JsonProperty("evolution")
    public long getEvolution() { return evolution; }
    @JsonProperty("evolution")
    public void setEvolution(long value) { this.evolution = value; }

    @JsonProperty("friendship")
    public long getFriendship() { return friendship; }
    @JsonProperty("friendship")
    public void setFriendship(long value) { this.friendship = value; }

    @JsonProperty("gender")
    public Gender getGender() { return gender; }
    @JsonProperty("gender")
    public void setGender(Gender value) { this.gender = value; }

    /**
     * The generation in which the pokemon was introduced
     */
    @JsonProperty("generation")
    public long getGeneration() { return generation; }
    @JsonProperty("generation")
    public void setGeneration(long value) { this.generation = value; }

    @JsonProperty("hp")
    public long getHP() { return hp; }
    @JsonProperty("hp")
    public void setHP(long value) { this.hp = value; }

    /**
     * The unique identifier for a pokemon
     */
    @JsonProperty("id")
    public long getID() { return id; }
    @JsonProperty("id")
    public void setID(long value) { this.id = value; }

    /**
     * As the user will complete activities pokemon level will rise and increase pokemon stats
     */
    @JsonProperty("level")
    public Long getLevel() { return level; }
    @JsonProperty("level")
    public void setLevel(Long value) { this.level = value; }

    /**
     * Name of the pokemon
     */
    @JsonProperty("name")
    public String getName() { return name; }
    @JsonProperty("name")
    public void setName(String value) { this.name = value; }

    @JsonProperty("specialAttack")
    public long getSpecialAttack() { return specialAttack; }
    @JsonProperty("specialAttack")
    public void setSpecialAttack(long value) { this.specialAttack = value; }

    @JsonProperty("specialDefence")
    public long getSpecialDefence() { return specialDefence; }
    @JsonProperty("specialDefence")
    public void setSpecialDefence(long value) { this.specialDefence = value; }

    @JsonProperty("speed")
    public long getSpeed() { return speed; }
    @JsonProperty("speed")
    public void setSpeed(long value) { this.speed = value; }

    @JsonProperty("types")
    public Type[] getTypes() { return types; }
    @JsonProperty("types")
    public void setTypes(Type[] value) { this.types = value; }

    @JsonProperty("price")
    public Object getPrice() { return price; }
    @JsonProperty("price")
    public void setPrice(Object value) { this.price = value; }
}

// Ability.java

package io.quicktype;

import java.io.IOException;
import com.fasterxml.jackson.annotation.*;

/**
 * A pokemon passive ability that is it's birthright.
 */
public enum Ability {
    AIR_LOCK, ARENA_TRAP, BATTLE_ARMOR, BLAZE, CHLOROPHYL, CLEAR_BODY, CLOUD_NINE, COLOR_CHANGE, COMPOUND_EYES, CUTE_CHARM, DAMP, DRIZZLE, DROUGHT, EARLY_BIRD, EFFECT_SPORE, FLAME_BODY, FLASH_FIRE, FORECAST, GUTS, HUGE_POWER, HUSTLE, HYPER_CUTTER, ILLUMINATE, IMMUNITY, INNER_FOCUS, INSOMNIA, INTIMIDATE, KEEN_EYE, LEVITATE, LIGHTNING_ROD, LIMBER, LIQUID_OOZE, MAGMA_ARMOR, MAGNET_PULL, MARVEL_SCALE, MINUS, NATURAL_CURE, OBLIVIOUS, OVERGROW, OWN_TEMPO, PICKUP, PLUS, POISON_POINT, PRESSURE, PURE_POWER, RAIN_DISH, ROCK_HEAD, ROUGH_SKIN, RUN_AWAY, SAND_STREAM, SAND_VEIL, SERENE_GRACE, SHADOW_TAG, SHED_SKIN, SHELL_ARMOR, SHIELD_DUST, SOUNDPROOF, SPEED_BOOST, STATIC, STENCH, STICKY_HOLD, STURDY, SUCTION_CUPS, SWARM, SWIFT_SWIM, SYNCHRONIZE, THICK_FAT, TORRENT, TRACE, TRUANT, VITAL_SPIRIT, VOLT_ABSORB, WATER_ABSORB, WATER_VEIL, WHITE_SMOKE, WONDER_GUARD;

    @JsonValue
    public String toValue() {
        switch (this) {
            case AIR_LOCK: return "air_lock";
            case ARENA_TRAP: return "arena_trap";
            case BATTLE_ARMOR: return "battle_armor";
            case BLAZE: return "blaze";
            case CHLOROPHYL: return "chlorophyl";
            case CLEAR_BODY: return "clear_body";
            case CLOUD_NINE: return "cloud_nine";
            case COLOR_CHANGE: return "color_change";
            case COMPOUND_EYES: return "compound_eyes";
            case CUTE_CHARM: return "cute_charm";
            case DAMP: return "damp";
            case DRIZZLE: return "drizzle";
            case DROUGHT: return "drought";
            case EARLY_BIRD: return "early_bird";
            case EFFECT_SPORE: return "effect_spore";
            case FLAME_BODY: return "flame_body";
            case FLASH_FIRE: return "flash_fire";
            case FORECAST: return "forecast";
            case GUTS: return "guts";
            case HUGE_POWER: return "huge_power";
            case HUSTLE: return "hustle";
            case HYPER_CUTTER: return "hyper_cutter";
            case ILLUMINATE: return "illuminate";
            case IMMUNITY: return "immunity";
            case INNER_FOCUS: return "inner_focus";
            case INSOMNIA: return "insomnia";
            case INTIMIDATE: return "intimidate";
            case KEEN_EYE: return "keen_eye";
            case LEVITATE: return "levitate";
            case LIGHTNING_ROD: return "lightning_rod";
            case LIMBER: return "limber";
            case LIQUID_OOZE: return "liquid_ooze";
            case MAGMA_ARMOR: return "magma_armor";
            case MAGNET_PULL: return "magnet_pull";
            case MARVEL_SCALE: return "marvel_scale";
            case MINUS: return "minus";
            case NATURAL_CURE: return "natural_cure";
            case OBLIVIOUS: return "oblivious";
            case OVERGROW: return "overgrow";
            case OWN_TEMPO: return "own_tempo";
            case PICKUP: return "pickup";
            case PLUS: return "plus";
            case POISON_POINT: return "poison_point";
            case PRESSURE: return "pressure";
            case PURE_POWER: return "pure_power";
            case RAIN_DISH: return "rain_dish";
            case ROCK_HEAD: return "rock_head";
            case ROUGH_SKIN: return "rough_skin";
            case RUN_AWAY: return "run_away";
            case SAND_STREAM: return "sand_stream";
            case SAND_VEIL: return "sand_veil";
            case SERENE_GRACE: return "serene_grace";
            case SHADOW_TAG: return "shadow_tag";
            case SHED_SKIN: return "shed_skin";
            case SHELL_ARMOR: return "shell_armor";
            case SHIELD_DUST: return "shield_dust";
            case SOUNDPROOF: return "soundproof";
            case SPEED_BOOST: return "speed_boost";
            case STATIC: return "static";
            case STENCH: return "stench";
            case STICKY_HOLD: return "sticky_hold";
            case STURDY: return "sturdy";
            case SUCTION_CUPS: return "suction_cups";
            case SWARM: return "swarm";
            case SWIFT_SWIM: return "swift_swim";
            case SYNCHRONIZE: return "synchronize";
            case THICK_FAT: return "thick_fat";
            case TORRENT: return "torrent";
            case TRACE: return "trace";
            case TRUANT: return "truant";
            case VITAL_SPIRIT: return "vital_spirit";
            case VOLT_ABSORB: return "volt_absorb";
            case WATER_ABSORB: return "water_absorb";
            case WATER_VEIL: return "water_veil";
            case WHITE_SMOKE: return "white_smoke";
            case WONDER_GUARD: return "wonder_guard";
        }
        return null;
    }

    @JsonCreator
    public static Ability forValue(String value) throws IOException {
        if (value.equals("air_lock")) return AIR_LOCK;
        if (value.equals("arena_trap")) return ARENA_TRAP;
        if (value.equals("battle_armor")) return BATTLE_ARMOR;
        if (value.equals("blaze")) return BLAZE;
        if (value.equals("chlorophyl")) return CHLOROPHYL;
        if (value.equals("clear_body")) return CLEAR_BODY;
        if (value.equals("cloud_nine")) return CLOUD_NINE;
        if (value.equals("color_change")) return COLOR_CHANGE;
        if (value.equals("compound_eyes")) return COMPOUND_EYES;
        if (value.equals("cute_charm")) return CUTE_CHARM;
        if (value.equals("damp")) return DAMP;
        if (value.equals("drizzle")) return DRIZZLE;
        if (value.equals("drought")) return DROUGHT;
        if (value.equals("early_bird")) return EARLY_BIRD;
        if (value.equals("effect_spore")) return EFFECT_SPORE;
        if (value.equals("flame_body")) return FLAME_BODY;
        if (value.equals("flash_fire")) return FLASH_FIRE;
        if (value.equals("forecast")) return FORECAST;
        if (value.equals("guts")) return GUTS;
        if (value.equals("huge_power")) return HUGE_POWER;
        if (value.equals("hustle")) return HUSTLE;
        if (value.equals("hyper_cutter")) return HYPER_CUTTER;
        if (value.equals("illuminate")) return ILLUMINATE;
        if (value.equals("immunity")) return IMMUNITY;
        if (value.equals("inner_focus")) return INNER_FOCUS;
        if (value.equals("insomnia")) return INSOMNIA;
        if (value.equals("intimidate")) return INTIMIDATE;
        if (value.equals("keen_eye")) return KEEN_EYE;
        if (value.equals("levitate")) return LEVITATE;
        if (value.equals("lightning_rod")) return LIGHTNING_ROD;
        if (value.equals("limber")) return LIMBER;
        if (value.equals("liquid_ooze")) return LIQUID_OOZE;
        if (value.equals("magma_armor")) return MAGMA_ARMOR;
        if (value.equals("magnet_pull")) return MAGNET_PULL;
        if (value.equals("marvel_scale")) return MARVEL_SCALE;
        if (value.equals("minus")) return MINUS;
        if (value.equals("natural_cure")) return NATURAL_CURE;
        if (value.equals("oblivious")) return OBLIVIOUS;
        if (value.equals("overgrow")) return OVERGROW;
        if (value.equals("own_tempo")) return OWN_TEMPO;
        if (value.equals("pickup")) return PICKUP;
        if (value.equals("plus")) return PLUS;
        if (value.equals("poison_point")) return POISON_POINT;
        if (value.equals("pressure")) return PRESSURE;
        if (value.equals("pure_power")) return PURE_POWER;
        if (value.equals("rain_dish")) return RAIN_DISH;
        if (value.equals("rock_head")) return ROCK_HEAD;
        if (value.equals("rough_skin")) return ROUGH_SKIN;
        if (value.equals("run_away")) return RUN_AWAY;
        if (value.equals("sand_stream")) return SAND_STREAM;
        if (value.equals("sand_veil")) return SAND_VEIL;
        if (value.equals("serene_grace")) return SERENE_GRACE;
        if (value.equals("shadow_tag")) return SHADOW_TAG;
        if (value.equals("shed_skin")) return SHED_SKIN;
        if (value.equals("shell_armor")) return SHELL_ARMOR;
        if (value.equals("shield_dust")) return SHIELD_DUST;
        if (value.equals("soundproof")) return SOUNDPROOF;
        if (value.equals("speed_boost")) return SPEED_BOOST;
        if (value.equals("static")) return STATIC;
        if (value.equals("stench")) return STENCH;
        if (value.equals("sticky_hold")) return STICKY_HOLD;
        if (value.equals("sturdy")) return STURDY;
        if (value.equals("suction_cups")) return SUCTION_CUPS;
        if (value.equals("swarm")) return SWARM;
        if (value.equals("swift_swim")) return SWIFT_SWIM;
        if (value.equals("synchronize")) return SYNCHRONIZE;
        if (value.equals("thick_fat")) return THICK_FAT;
        if (value.equals("torrent")) return TORRENT;
        if (value.equals("trace")) return TRACE;
        if (value.equals("truant")) return TRUANT;
        if (value.equals("vital_spirit")) return VITAL_SPIRIT;
        if (value.equals("volt_absorb")) return VOLT_ABSORB;
        if (value.equals("water_absorb")) return WATER_ABSORB;
        if (value.equals("water_veil")) return WATER_VEIL;
        if (value.equals("white_smoke")) return WHITE_SMOKE;
        if (value.equals("wonder_guard")) return WONDER_GUARD;
        throw new IOException("Cannot deserialize Ability");
    }
}

// Gender.java

package io.quicktype;

import java.io.IOException;
import com.fasterxml.jackson.annotation.*;

/**
 * A pokemon's gender.
 */
public enum Gender {
    EMPTY, GENDER;

    @JsonValue
    public String toValue() {
        switch (this) {
            case EMPTY: return "\u2640";
            case GENDER: return "\u2642";
        }
        return null;
    }

    @JsonCreator
    public static Gender forValue(String value) throws IOException {
        if (value.equals("\u2640")) return EMPTY;
        if (value.equals("\u2642")) return GENDER;
        throw new IOException("Cannot deserialize Gender");
    }
}

// Type.java

package io.quicktype;

import java.io.IOException;
import com.fasterxml.jackson.annotation.*;

/**
 * A pokemon's type.
 */
public enum Type {
    BUG, DARK, DRAGON, ELECTRIC, FAIRY, FIGHTING, FIRE, FLYING, GHOST, GRASS, GROUND, ICE, NORMAL, POISON, PSYCHIC, ROCK, STEEL, WATER;

    @JsonValue
    public String toValue() {
        switch (this) {
            case BUG: return "bug";
            case DARK: return "dark";
            case DRAGON: return "dragon";
            case ELECTRIC: return "electric";
            case FAIRY: return "fairy";
            case FIGHTING: return "fighting";
            case FIRE: return "fire";
            case FLYING: return "flying";
            case GHOST: return "ghost";
            case GRASS: return "grass";
            case GROUND: return "ground";
            case ICE: return "ice";
            case NORMAL: return "normal";
            case POISON: return "poison";
            case PSYCHIC: return "psychic";
            case ROCK: return "rock";
            case STEEL: return "steel";
            case WATER: return "water";
        }
        return null;
    }

    @JsonCreator
    public static Type forValue(String value) throws IOException {
        if (value.equals("bug")) return BUG;
        if (value.equals("dark")) return DARK;
        if (value.equals("dragon")) return DRAGON;
        if (value.equals("electric")) return ELECTRIC;
        if (value.equals("fairy")) return FAIRY;
        if (value.equals("fighting")) return FIGHTING;
        if (value.equals("fire")) return FIRE;
        if (value.equals("flying")) return FLYING;
        if (value.equals("ghost")) return GHOST;
        if (value.equals("grass")) return GRASS;
        if (value.equals("ground")) return GROUND;
        if (value.equals("ice")) return ICE;
        if (value.equals("normal")) return NORMAL;
        if (value.equals("poison")) return POISON;
        if (value.equals("psychic")) return PSYCHIC;
        if (value.equals("rock")) return ROCK;
        if (value.equals("steel")) return STEEL;
        if (value.equals("water")) return WATER;
        throw new IOException("Cannot deserialize Type");
    }
}

