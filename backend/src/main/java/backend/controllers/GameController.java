package backend.controllers;

import backend.model.Game;
import backend.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameService service;

    @GetMapping("/")
    public List<Game> getAllGames() {
        return service.getAllGames();
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable String id) {
        return service.getGame(id);
    }

    @PostMapping("/")
    public Game saveGame(@RequestBody Game game) {
        return service.saveGame(game);
    }

    @DeleteMapping("{id}")
    public void deleteGame(@PathVariable String id) {
        service.deleteGame(id);
    }
}
