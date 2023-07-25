package ru.roman_sayapin.PP_315.rest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/api/user").setViewName("user_page");//работает!
        registry.addViewController("/api/admin").setViewName("admin_page");
    }
}
