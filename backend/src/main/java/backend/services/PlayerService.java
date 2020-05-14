package backend.services;

import backend.model.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private GameService gameService;

    public void savePlayer(String gameId, Player player) {
        gameService.getGame(gameId).addPlayer(player);
    }

    public List<Player> getAllPlayers(String gameId) {
        return gameService.getGame(gameId).getPlayers();
    }
}
