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
//     Move data = Converter.fromJsonString(jsonString);

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

    public static Move fromJsonString(String json) throws IOException {
        return getObjectReader().readValue(json);
    }

    public static String toJsonString(Move obj) throws JsonProcessingException {
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
        reader = mapper.readerFor(Move.class);
        writer = mapper.writerFor(Move.class);
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

// Move.java

package io.quicktype;

import com.fasterxml.jackson.annotation.*;

/**
 * A pokemon's move.
 */
public class Move {
    private Long accuracy;
    private Category category;
    private Long energyPoints;
    private long id;
    private Long pokemonID;
    private Long power;
    private Type type;

    @JsonProperty("accuracy")
    public Long getAccuracy() { return accuracy; }
    @JsonProperty("accuracy")
    public void setAccuracy(Long value) { this.accuracy = value; }

    @JsonProperty("category")
    public Category getCategory() { return category; }
    @JsonProperty("category")
    public void setCategory(Category value) { this.category = value; }

    @JsonProperty("energyPoints")
    public Long getEnergyPoints() { return energyPoints; }
    @JsonProperty("energyPoints")
    public void setEnergyPoints(Long value) { this.energyPoints = value; }

    @JsonProperty("id")
    public long getID() { return id; }
    @JsonProperty("id")
    public void setID(long value) { this.id = value; }

    @JsonProperty("pokemonId")
    public Long getPokemonID() { return pokemonID; }
    @JsonProperty("pokemonId")
    public void setPokemonID(Long value) { this.pokemonID = value; }

    @JsonProperty("power")
    public Long getPower() { return power; }
    @JsonProperty("power")
    public void setPower(Long value) { this.power = value; }

    @JsonProperty("type")
    public Type getType() { return type; }
    @JsonProperty("type")
    public void setType(Type value) { this.type = value; }
}

// Category.java

package io.quicktype;

import java.io.IOException;
import com.fasterxml.jackson.annotation.*;

/**
 * A pokemon move's category.
 */
public enum Category {
    PHYSICAL, SPECIAL, STATUS;

    @JsonValue
    public String toValue() {
        switch (this) {
            case PHYSICAL: return "Physical";
            case SPECIAL: return "Special";
            case STATUS: return "Status";
        }
        return null;
    }

    @JsonCreator
    public static Category forValue(String value) throws IOException {
        if (value.equals("Physical")) return PHYSICAL;
        if (value.equals("Special")) return SPECIAL;
        if (value.equals("Status")) return STATUS;
        throw new IOException("Cannot deserialize Category");
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

