package com.example.back_end.controller;

import com.example.back_end.dto.ILaptopDto;
import com.example.back_end.model.laptop.LaptopType;
import com.example.back_end.repository.laptop.ILaptopRepository;
import com.example.back_end.repository.laptop.ILaptopTypeRepository;
import com.example.back_end.service.laptop.ILaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/laptop")
public class LaptopController {
    @Autowired
    private ILaptopService laptopService;

    @Autowired
    private ILaptopTypeRepository laptopTypeRepository;

    @GetMapping("/list")
    public ResponseEntity<Page<ILaptopDto>> findAllLaptopAndSearch(
            @PageableDefault(value = 8) Pageable pageable,
            @RequestParam(value = "nameSearch", defaultValue = "", required = false) String nameSearch) {
        Page<ILaptopDto> laptopDtoPage = laptopService.findAllLaptopAndSearch(pageable, nameSearch);
        if (laptopDtoPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(laptopDtoPage, HttpStatus.OK);
    }

    @GetMapping("/type-list")
    public ResponseEntity<List<LaptopType>> findAllLaptopType() {
        List<LaptopType> laptopTypes = laptopTypeRepository.findAll();
        if (laptopTypes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(laptopTypes, HttpStatus.OK);
    }
}