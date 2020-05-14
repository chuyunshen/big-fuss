package backend.model;

import org.springframework.data.annotation.Id;

public class Player {
    @Id
    private String id;
    private Boolean isHost;
    private String name;

    public Player(Boolean isHost, String name) {
        this.isHost = isHost;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public Boolean getIsHost() {
        return isHost;
    }

    public String getName() {
        return name;
    }
}
