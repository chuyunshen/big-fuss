package backend.controllers;

import backend.model.Question;
import backend.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@CrossOrigin
@RestController
public class QuestionController {

    @Autowired
    private QuestionService service;

    @GetMapping("/games/{gameId}/questions")
    public HashMap<Integer, ArrayList<Question>> getAllQuestions(@PathVariable String gameId) {
        return service.getQuestions(gameId);
    }

    @PostMapping("/games/{gameId}/questions/{round}")
    public void saveQuestion(@PathVariable String gameId, @PathVariable Integer round, @RequestBody Question question) {
        service.saveQuestion(gameId, round, question);
    }
}
