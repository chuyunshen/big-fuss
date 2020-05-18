package backend.services;

import backend.model.Game;
import backend.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.ArrayList;

@Service
public class QuestionService {

    @Autowired
    private GameService gameService;

    public HashMap<Integer, ArrayList<Question>> getQuestions(String gameId) {
        Game game = gameService.getGame(gameId);
        return game.getQuestions();
    }

    public void saveQuestion(String gameId, Integer round, Question question) {
        Game game = gameService.getGame(gameId);
        game.addQuestion(round, question);
        gameService.saveGame(game);
    }
}
