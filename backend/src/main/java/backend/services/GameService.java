package backend.services;

import backend.exceptions.GameNotFoundException;
import backend.model.Game;
import backend.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    public List<Game> getAllGames() {
        return repository.findAll();
    }

    public Game getGame(String id) {
        return repository.findById(id).orElseThrow(() -> new GameNotFoundException(id));
    }

    public Game saveGame(Game game) {
        return repository.save(game);
    }

    public void deleteGame(String id) {
        repository.deleteById(id);
    }
}
