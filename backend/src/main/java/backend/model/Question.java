package backend.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Question {

    private UUID id = UUID.randomUUID();
    private UUID playerId;
    private String prompt;
    private ArrayList<String> options;
    private ArrayList<Integer> correctAnswers;

    public Question(UUID playerId, String prompt, ArrayList<String> options, ArrayList<Integer> correctAnswers) {
        this.playerId = playerId;
        this.options = options;
        this.prompt = prompt;
        this.correctAnswers = correctAnswers;
    }

    public UUID getId() {
        return id;
    }

    public UUID getPlayerId() {
        return playerId;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public void setOptions(ArrayList<String> options) {
        this.options = options;
    }


    public List getOptions() {
        return options;
    }

    public ArrayList<Integer> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(ArrayList<Integer> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }
}