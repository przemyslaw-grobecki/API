



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

