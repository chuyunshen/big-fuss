package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class TrivialApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrivialApplication.class, args);
	}

//	@Override
//	public void run(String... args) throws Exception {
//		repository.deleteAll();
//
//		Player host = new Player(true, "Host");
//		Question question = new Question(host.getId(), "prompt",
//				new ArrayList<>(Arrays.asList("Option A", "Option B")),
//				new ArrayList<>(0));
//		Game game = new Game(host, "hotSauce", "personal");
//		game.addQuestion(question);
//		repository.save(game);
//
//		for (Game g: repository.findAll()) {
//		  System.out.println(g);
//		}
//	}
}
