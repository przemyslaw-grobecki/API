import PokeClient.java.generated.primitives.Type;
import PokeClient.java.generated.primitives.Category;




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
