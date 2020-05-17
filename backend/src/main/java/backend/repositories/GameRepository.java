package backend.repositories;

import backend.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    public Game findGameBySecretCode(String secretCode);
}
