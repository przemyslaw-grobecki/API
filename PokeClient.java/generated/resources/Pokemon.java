import PokeClient.java.generated.primitives.Type;
import PokeClient.java.generated.primitives.Ability;
import PokeClient.java.generated.primitives.Gender;




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
