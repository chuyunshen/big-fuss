package backend.model;

import java.util.UUID;

public class Player {
    public UUID id;
    private Boolean isHost;
    private String name;
    private Boolean isReady;

    public Player(Boolean isHost, String name, Boolean isReady) {
        this.isHost = isHost;
        this.name = name;
        this.id = UUID.randomUUID();
        this.isReady = isReady;
    }

    public UUID getId() {
        return id;
    }

    public Boolean getIsHost() {
        return isHost;
    }

    public Boolean getIsReady() {
        return isReady;
    }

    public String getName() {
        return name;
    }
}
