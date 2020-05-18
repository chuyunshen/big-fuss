package backend;

import backend.services.PopulateRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrivialApplication implements CommandLineRunner {

	@Autowired
	private PopulateRepositoryService service;
	public static void main(String[] args) {
		SpringApplication.run(TrivialApplication.class, args);
	}

	public void run(String... args) throws Exception {
		service.populate();
	}

}
