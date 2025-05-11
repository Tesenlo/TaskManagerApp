package com.taskManagerApp.main.config;

import com.taskManagerApp.main.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable()  // Disable CSRF protection for simplicity (you can enable it if needed)
//            .authorizeRequests()
//            .requestMatchers("/loginUser", "/addUser", "/tasks/addTask", "/tasks", "/deleteTask/${id}").permitAll()  // Allow login and register without authentication
//            .anyRequest().authenticated();  // Protect all other routes with authentication
//
//        // Add the JwtAuthenticationFilter before UsernamePasswordAuthenticationFilter
//        http.addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();  // Return the configured SecurityFilterChain
//    }
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .cors() //
	        .and()
	        .csrf().disable()
	        .authorizeRequests()
	        .requestMatchers("/loginUser", "/addUser").permitAll() //add this if not working{ "/tasks/**"}
	        .anyRequest().authenticated()
	        .and()
	        .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}

}
