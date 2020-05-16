package backend.controllers;

import backend.model.Question;
import backend.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:8081")
@RestController
public class QuestionController {

    @Autowired
    private QuestionService service;

    @GetMapping("/games/{gameId}/questions")
    public List<Question> getAllQuestions(@PathVariable String gameId) {
        return service.getQuestions(gameId);
    }

    @PostMapping("/games/{gameId}/questions")
    public void saveQuestion(@PathVariable String gameId, @RequestBody Question question) {
        service.saveQuestion(gameId, question);
    }
}
