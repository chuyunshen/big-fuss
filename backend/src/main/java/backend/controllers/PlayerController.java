package backend.controllers;

import backend.model.Player;
import backend.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayerController {

    @Autowired
    private PlayerService service;

    @GetMapping("/games/{gameId}/players")
    public List<Player> getPlayers(@PathVariable String gameId) {
        return service.getAllPlayers(gameId);
    }

    @PostMapping("/games/{gameId}/players")
    public void savePlayer(@PathVariable String gameId, @RequestBody Player player) {
        service.savePlayer(gameId, player);
    }
}
