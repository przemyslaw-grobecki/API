



import com.fasterxml.jackson.annotation.*;

/**
 * A user.
 */
public class User {
    private String email;
    private String hash;
    private long id;
    private String password;
    private String salt;
    private String username;

    /**
     * email
     */
    @JsonProperty("email")
    public String getEmail() { return email; }
    @JsonProperty("email")
    public void setEmail(String value) { this.email = value; }

    /**
     * hash
     */
    @JsonProperty("hash")
    public String getHash() { return hash; }
    @JsonProperty("hash")
    public void setHash(String value) { this.hash = value; }

    /**
     * The unique identifier for a user
     */
    @JsonProperty("id")
    public long getID() { return id; }
    @JsonProperty("id")
    public void setID(long value) { this.id = value; }

    /**
     * Password
     */
    @JsonProperty("password")
    public String getPassword() { return password; }
    @JsonProperty("password")
    public void setPassword(String value) { this.password = value; }

    /**
     * Saltyness
     */
    @JsonProperty("salt")
    public String getSalt() { return salt; }
    @JsonProperty("salt")
    public void setSalt(String value) { this.salt = value; }

    /**
     * username
     */
    @JsonProperty("username")
    public String getUsername() { return username; }
    @JsonProperty("username")
    public void setUsername(String value) { this.username = value; }
}

