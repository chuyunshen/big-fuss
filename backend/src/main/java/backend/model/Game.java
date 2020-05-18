package backend.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.HashMap;

public class Game {
    private Player host;
    private ArrayList<Player> players;
    // An array of questions for each round in game
    private HashMap<Integer, ArrayList<Question>> questions;
    @Id
    private String id;
    private String secretCode;
    private String gameType;

    public Player getHost() {
        return host;
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public String getId() {
        return id;
    }

    public String getSecretCode() {
        return secretCode;
    }

    public HashMap<Integer, ArrayList<Question>> getQuestions() {
        return questions;
    }

    public String getGameType() {
        return gameType;
    }

    public Game(Player host, String secretCode, String gameType) {
        this.host = host;
        this.players = new ArrayList<>();
        players.add(host);
        this.secretCode = secretCode;
        this.questions = new HashMap<>();
        this.gameType = gameType;
    }


    public void addPlayer(Player player) {
        players.add(player);
    }

    public void updatePlayer(Player player) {
        for (int i=0; i < players.size(); i++) {
            if (players.get(i).getName().equals(player.getName())) {
                players.set(i, player);
            }
        }
    }

    public void addQuestion(Integer round, Question question) {
        if (questions.containsKey(round)) {
            ArrayList<Question> oldQuestions = questions.get(round);
            oldQuestions.add(question);
            questions.put(round, oldQuestions);
        } else {
            ArrayList<Question> newQuestions = new ArrayList<>();
            newQuestions.add(question);
            questions.put(round, newQuestions);
        }
    }

    public Boolean validateSecretCode(String secretCode) {
        return this.secretCode.equalsIgnoreCase(secretCode);
    }
}
