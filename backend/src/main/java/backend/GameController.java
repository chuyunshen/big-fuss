package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameRepository repository;

    @GetMapping("/")
    public List<Game> getAllGames() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable String id) {
        return repository.findById(id).orElseThrow(() -> new GameNotFoundException(id));
    }

    @PostMapping("/")
    public Game addGame(@RequestBody Game game) {
        return repository.save(game);
    }

    @DeleteMapping("{id}")
    public void deleteGame(@PathVariable String id) {
        repository.deleteById(id);
    }

}
