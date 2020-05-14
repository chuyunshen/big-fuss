package backend.model;

import org.springframework.data.annotation.Id;

import java.util.UUID;

public class Player {
    private UUID id = UUID.randomUUID();
    private Boolean isHost;
    private String name;

    public Player(Boolean isHost, String name) {
        this.isHost = isHost;
        this.name = name;
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
