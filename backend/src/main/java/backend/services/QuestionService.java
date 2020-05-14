package backend.services;

import backend.model.Game;
import backend.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private GameService gameService;

    public List<Question> getQuestions(String gameId) {
        Game game = gameService.getGame(gameId);
        return game.getQuestions();
    }

    public void saveQuestion(String gameId, Question question) {
        Game game = gameService.getGame(gameId);
        game.addQuestion(question);
        gameService.saveGame(game);
    }
}
