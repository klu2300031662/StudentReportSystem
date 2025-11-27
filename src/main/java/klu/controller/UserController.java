package klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import klu.model.User;
import klu.model.UserManager;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend
public class UserController {

    @Autowired
    private UserManager userManager;

    // SIGNUP
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        return userManager.insertData(user);
    }

    // SIGNIN
    @PostMapping("/signin")
    public String signin(@RequestBody Map<String, String> body) {
        String emailid = body.get("emailid");
        String password = body.get("password");
        return userManager.signIn(emailid, password);
    }

    // FORGOT PASSWORD
    @PostMapping("/forgotpassword")
    public String forgotPassword(@RequestBody Map<String, String> body) {
        String emailid = body.get("emailid");
        return userManager.getPassword(emailid);
    }

    // GET FULL NAME (optional)
    @PostMapping("/fullname")
    public String getFullName(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        return userManager.getFullName(token);
    }
}
