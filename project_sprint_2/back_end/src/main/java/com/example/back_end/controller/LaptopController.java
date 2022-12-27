package com.example.back_end.controller;

import com.example.back_end.dto.laptop.IHistoryDto;
import com.example.back_end.dto.laptop.ILaptopDto;
import com.example.back_end.jwt.JwtTokenUtil;
import com.example.back_end.model.customer.Customer;
import com.example.back_end.model.decentralization.User;
import com.example.back_end.model.laptop.Laptop;
import com.example.back_end.model.laptop.LaptopType;
import com.example.back_end.service.customer.ICustomerService;
import com.example.back_end.service.decentralization.IUserService;
import com.example.back_end.service.laptop.ILaptopService;
import com.example.back_end.service.laptop.ILaptopTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/laptop")
public class LaptopController {
    @Autowired
    private ILaptopService laptopService;

    @Autowired
    private ICustomerService customerService;

    @Autowired
    private ILaptopTypeService laptopTypeService;

    @Autowired
    private IUserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    @GetMapping("/history/{username}")
    public ResponseEntity<Page<IHistoryDto>> getAllHistory(@PageableDefault Pageable pageable,
                                                           @PathVariable(value = "username") String username) {
        System.out.println(username);
        Page<IHistoryDto> historyDtoPage = laptopService.getAllHistory(username, pageable);
        if (historyDtoPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(historyDtoPage, HttpStatus.OK);

    }

    @GetMapping("/list")
    public ResponseEntity<Page<ILaptopDto>> findAllLaptopAndSearch(
            @PageableDefault(value = 8) Pageable pageable,
            @RequestParam(value = "nameSearch", defaultValue = "", required = false) String nameSearch,
            @RequestParam(value = "startPrice", defaultValue = "0", required = false) int startPrice,
            @RequestParam(value = "endPrice", defaultValue = "0", required = false) int endPrice) {

        Page<ILaptopDto> laptopDtoPage;
        if (endPrice == 0) {
            laptopDtoPage = laptopService.findAllLaptopAndSearch(pageable, nameSearch);
        } else {
            laptopDtoPage = laptopService.findAllLaptopAndSearchPrice(pageable, nameSearch, startPrice, endPrice);
        }

        if (laptopDtoPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(laptopDtoPage, HttpStatus.OK);
    }

    @GetMapping("/type-list")
    public ResponseEntity<List<LaptopType>> findAllLaptopType() {
        List<LaptopType> laptopTypes = laptopTypeService.findAll();
        if (laptopTypes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(laptopTypes, HttpStatus.OK);
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findByIdLaptop(@PathVariable Integer id) {
        Optional<ILaptopDto> laptopDtoOptional = laptopService.findByIdLaptop(id);
        if (laptopDtoOptional.isPresent()) {
            return new ResponseEntity<>(laptopDtoOptional, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @GetMapping("/get-customer")
    public ResponseEntity<Customer> getCustomerByUsername(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
        Customer customer = customerService.findCustomerByUsername(username);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/get-laptop/{id}")
    public ResponseEntity<Laptop> getLaptop(@PathVariable(value = "id") Integer id) {
        Laptop laptop = laptopService.findLaptop(id);
        return new ResponseEntity<>(laptop, HttpStatus.OK);
    }



    @GetMapping("/find-all-customer/{username}")
    public ResponseEntity<?> findAllCustomer(@PathVariable(value = "username") String username) {
        Customer customer = customerService.findCustomerByUsername(username);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }


}
