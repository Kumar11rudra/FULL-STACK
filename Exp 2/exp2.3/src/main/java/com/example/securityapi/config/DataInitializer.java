package com.example.securityapi.config;
import org.springframework.boot.*; import org.springframework.context.annotation.*; import org.springframework.security.crypto.password.*; import com.example.securityapi.model.Entities.AppUser; import com.example.securityapi.repository.Repositories.UserRepository;
@Configuration public class DataInitializer { @Bean CommandLineRunner seed(UserRepository u,PasswordEncoder p){return a->{if(u.count()==0){u.save(new AppUser("admin",p.encode("Admin@123"),"ADMIN"));u.save(new AppUser("user",p.encode("User@123"),"USER"));}};} }
