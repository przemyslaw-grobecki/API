



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

