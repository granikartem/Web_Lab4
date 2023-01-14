package com.example.wp.controller;

import com.example.wp.domain.Point;
import com.example.wp.form.PointsCredentials;
import com.example.wp.repository.UserRepository;
import com.example.wp.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
public class MainController {
    @Autowired
    PointService pointService;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/point")
    public ResponseEntity setPoint(@Valid @ModelAttribute("checkForm") PointsCredentials point, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error");
        }
        point.setResult(point.getX(), point.getY(), point.getR());
        try {
            pointService.register(point);
        } catch (IllegalArgumentException e) {
            Map<String, String> resp = new HashMap<>();
            resp.put("error", "АААА");
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(resp);
        }
        List<Point> points = pointService.getAllPointsByUser(userRepository.getUserByLogin(point.getLogin()));
        StringJoiner joiner = new StringJoiner(",");
        for (Point oldpoint : points) {
            String s = "{\"x\":\"" +
                    String.format("%.4f", oldpoint.getX()) +
                    "\", \"y\":\"" +
                    String.format("%.4f", oldpoint.getY()) +
                    "\", \"r\":\"" +
                    String.format("%.4f", oldpoint.getR()) +
                    "\", \"result\":\"" +
                    oldpoint.getResult() +
                    "\"}";
            joiner.add(s);
        }
        return ResponseEntity.ok("[" + joiner + "]");
    }
}
