package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;


import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class TrivialApplication extends WebSecurityConfigurerAdapter {

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
