package backend.controllers;

import backend.model.Game;
import backend.services.SecretCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:8081")
@RestController
@RequestMapping("/secretcodes")
public class SecretCodeController {

    @Autowired
    private SecretCodeService service;

    @GetMapping("/{secretCode}")
    public Game getGame(@PathVariable String secretCode) {
        return service.getGame(secretCode);
    }
}
