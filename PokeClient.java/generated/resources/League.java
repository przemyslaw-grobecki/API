



import com.fasterxml.jackson.annotation.*;

/**
 * A league.
 */
public class League {
    private long id;
    private String imageURL;
    private String name;

    /**
     * The unique identifier for a league
     */
    @JsonProperty("id")
    public long getID() { return id; }
    @JsonProperty("id")
    public void setID(long value) { this.id = value; }

    /**
     * An image corellated with league
     */
    @JsonProperty("imageUrl")
    public String getImageURL() { return imageURL; }
    @JsonProperty("imageUrl")
    public void setImageURL(String value) { this.imageURL = value; }

    /**
     * Leagues name
     */
    @JsonProperty("name")
    public String getName() { return name; }
    @JsonProperty("name")
    public void setName(String value) { this.name = value; }
}

