package backend;

import java.util.UUID;

import static java.util.UUID.randomUUID;

public class Player {
    private UUID id;
    private Boolean isHost;
    private String name;

    public Player(Boolean isHost, String name) {
        this.isHost = isHost;
        this.name = name;
        this.id = UUID.randomUUID();
    }

    public UUID getId() {
        return id;
    }

    public Boolean getIsHost() {
        return isHost;
    }

    public String getName() {
        return name;
    }
}
