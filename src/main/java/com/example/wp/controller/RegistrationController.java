package com.example.wp.controller;

import com.example.wp.domain.Point;
import com.example.wp.form.UserCredentials;
import com.example.wp.form.validator.UserCredentialsRegisterValidator;
import com.example.wp.repository.UserRepository;
import com.example.wp.service.PointService;
import com.example.wp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

@Controller
@CrossOrigin
public class RegistrationController {
    @Autowired
    UserCredentialsRegisterValidator userCredentialsRegisterValidator;
    @Autowired
    UserService userService;
    @Autowired
    PointService pointService;
    @Autowired
    UserRepository userRepository;


    @InitBinder
    public void initBinder(WebDataBinder webDataBinder){
        webDataBinder.addValidators(userCredentialsRegisterValidator);
    }

    @GetMapping("/register")
    public String get(Model model){
        model.addAttribute("registerform", new UserCredentials());
        return "registerPage";
    }
    @PostMapping("/all")
    public ResponseEntity getAll( @ModelAttribute("registerform")UserCredentials credentials, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
        }
        List<Point> points = pointService.getAllPointsByUser(userRepository.getUserByLogin(credentials.getLogin()));
        StringJoiner joiner = new StringJoiner(",");
        for(Point point : points){
            String s = "{\"x\":\"" +
                    String.format("%.2f", point.getX()) +
                    "\", \"y\":\"" +
                    String.format("%.2f", point.getY()) +
                    "\", \"r\":\"" +
                    String.format("%.2f", point.getR()) +
                    "\", \"result\":\"" +
                    point.getResult() +
                    "\"}";
            joiner.add(s);
        }
        return ResponseEntity.ok("[" + joiner + "]");
    }
    @PostMapping("/register")
    public ResponseEntity post(@Valid @ModelAttribute("registerform")UserCredentials credentials, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "Логин уже занят");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
        }
        Map<String, Object> resp = new HashMap<>();
        resp.put("login", credentials.getLogin());
        resp.put("password", credentials.getPassword());
        userService.register(credentials);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity login(@ModelAttribute("registerform")UserCredentials credentials, BindingResult bindingResult){
        if(bindingResult.hasErrors() || !userService.findByLoginAndPassword(credentials.getLogin(), userService.HashSequrity(credentials.getPassword()))){
            Map<String, Object> resp = new HashMap<>();
            resp.put("error", "Ошибка в авторизации");
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(resp);
        }
        if(userService.findByLoginAndPassword(credentials.getLogin(), userService.HashSequrity(credentials.getPassword()))) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("login", credentials.getLogin());
            resp.put("password", credentials.getPassword());

            return ResponseEntity.ok(resp);
        }
        return null;
    }
}
