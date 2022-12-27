package com.example.back_end.controller;

import com.example.back_end.model.laptop.Laptop;
import com.example.back_end.service.laptop.ILaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private ILaptopService laptopService;

    @GetMapping("/delete-laptop/{id}")
    public ResponseEntity<Laptop> deleteLaptop(@PathVariable(value = "id") Integer id) {
        laptopService.laptopDelete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
