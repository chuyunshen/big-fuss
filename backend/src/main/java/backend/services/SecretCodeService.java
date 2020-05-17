package backend.services;

import backend.model.Game;
import backend.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SecretCodeService {

    @Autowired
    private GameRepository repository;

    public Game getGame(String secretCode) {
        return repository.findGameBySecretCode(secretCode);
    }
}
