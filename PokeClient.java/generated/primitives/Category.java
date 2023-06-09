



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

