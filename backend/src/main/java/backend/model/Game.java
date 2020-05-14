package backend.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.HashMap;

public class Game {
    private Player host;
    private ArrayList<Player> players;
    @Id
    private String id;
    private String secretCode;
    private ArrayList<Question> questions;
    private HashMap<String, Integer> points;
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

    public ArrayList<Question> getQuestions() {
        return questions;
    }

    public HashMap<String, Integer> getPoints() {
        return points;
    }

    public String getGameType() {
        return gameType;
    }

    public Game(Player host, String secretCode, String gameType) {
        this.host = host;
        this.players = new ArrayList<>();
        this.secretCode = secretCode;
        this.questions = new ArrayList<>();
        this.gameType = gameType;
        this.points = new HashMap<>();
    }


    public void addPlayer(Player player) {
        players.add(player);
    }

    public void addQuestion(Question question) {
        questions.add(question);
    }

    public void incrementPoint(String playerId) {
        points.merge(playerId, 1, Integer::sum);
    }

    public Boolean validateSecretCode(String secretCode) {
        return this.secretCode.equalsIgnoreCase(secretCode);
    }
}
