package backend.services;

import backend.model.Game;
import backend.model.Player;
import backend.model.Question;
import backend.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Service
public class PopulateRepositoryService {
    @Autowired
    private GameRepository gameRepository;
    public void populate() {
        gameRepository.deleteAll();
        Player player = new Player(true, "Alex Turner", false);
        Question question = new Question(
                player.getId(), player.getName(),
                "What does the Bloody Mary lack?",
                new ArrayList<>(Arrays.asList("Tabasco", "Salt", "Pepper", "Coconut")),
                new ArrayList<>(Arrays.asList(0)));

        Player player2 = new Player(false, "Skeeter Davis", false);
        Question question2 = new Question(
                player2.getId(), player2.getName(),
                "Gonna get along with whom now?",
                new ArrayList<>(Arrays.asList("Him", "You", "Me", "Her")),
                new ArrayList<>(Arrays.asList(1)));

        Player player3 = new Player(false, "Arnold", false);
        Question question3 = new Question(
                player3.getId(), player3.getName(),
                "Instead of BuonGiorno, what do I say?",
                new ArrayList<>(Arrays.asList("Good Morrow", "BienGiorno", "DiGiorno", "Hi")),
                new ArrayList<>(Arrays.asList(2)));
        Integer roomSize = 3;
        Game game = new Game(player, "hot sauce", "personal", roomSize);
        game.addPlayer(player2);
        game.addPlayer(player3);
        game.addQuestion(question);
        game.addQuestion(question2);
        game.addQuestion(question3);
        gameRepository.save(game);
    }
}
