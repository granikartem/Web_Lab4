package com.example.wp.service;

import com.example.wp.domain.User;
import com.example.wp.form.UserCredentials;
import com.example.wp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isLoginVacant(String login){
        return userRepository.countByLogin(login) == 0;
    }

    public User register(UserCredentials userCredentials){
        User user = new User();
        user.setLogin(userCredentials.getLogin());
        user.setPassword(HashSequrity(userCredentials.getPassword()));
        userRepository.save(user);
        return user;
    }

    public boolean findByLoginAndPassword(String login, String password){
        int i = userRepository.countUserByLoginAndPassword(login,password);
        return i == 1;
    }

    public String HashSequrity(String password){
        String hashPassword = "";
       try {
           MessageDigest digest = MessageDigest.getInstance("SHA-256");
           byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
           StringBuilder hexString = new StringBuilder(2 * encodedHash.length);
           for (int i = 0; i < encodedHash.length; i++) {
               String hex = Integer.toHexString(0xff & encodedHash[i]);
               if(hex.length() == 1) {
                   hexString.append('0');
               }
               hexString.append(hex);
           }
           hashPassword = hexString.toString();
       }catch (NoSuchAlgorithmException e){
           e.printStackTrace();
       }
       return  hashPassword;
    }
}