package ru.cds.coreuiapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class CoreUiAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoreUiAppApplication.class, args);
	}

}
