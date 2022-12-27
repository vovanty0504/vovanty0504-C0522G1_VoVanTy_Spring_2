package com.example.back_end.controller;

import com.example.back_end.dto.laptop.IBookingLaptopDto;
import com.example.back_end.dto.laptop.ILaptopDto;
import com.example.back_end.model.laptop.BookingLaptop;
import com.example.back_end.model.laptop.History;
import com.example.back_end.service.customer.ICustomerService;
import com.example.back_end.service.laptop.IBookingLaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("api/booking")
public class BookingLaptopController {
    @Autowired
    private IBookingLaptopService bookingLaptopService;


    @GetMapping("/add-cart/{quantity}&{customerId}&{laptopId}")
    public ResponseEntity<BookingLaptop> addCart(@PathVariable("quantity") Integer quantity,
                                                 @PathVariable("customerId") Integer customerId,
                                                 @PathVariable("laptopId") Integer laptopId) {
        bookingLaptopService.addLaptop(quantity, customerId, laptopId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list-cart/{id}")
    public ResponseEntity<List<ILaptopDto>> showCartByUser(@PathVariable("id") Integer id) {
        List<ILaptopDto> cart = bookingLaptopService.findCartByUser(id);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/list-money/{id}")
    public ResponseEntity<?> sumMoney(@PathVariable("id") Integer id) {
        Optional<ILaptopDto> iLaptopDto = bookingLaptopService.sumMoney(id);

        if (iLaptopDto.isPresent()) {
            return new ResponseEntity<>(iLaptopDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        List<ILaptopDto> cart = bookingLaptopService.sumMoney(id);
//        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/asc-quantity/{id}")
    public ResponseEntity<BookingLaptop> ascQuantity(@PathVariable("id") Integer id) {
        bookingLaptopService.ascQuantity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/desc-quantity/{id}")
    public ResponseEntity<BookingLaptop> descQuantity(@PathVariable("id") Integer id) {
        bookingLaptopService.descQuantity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/pay-laptop/{id}")
    public ResponseEntity<BookingLaptop> payBookingLaptop(@PathVariable("id") Integer id) {
        System.out.println("paypal");
        bookingLaptopService.payBookingLaptop(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/delete-cart/{id}")
    public ResponseEntity<BookingLaptop> deleteCart(@PathVariable("id") Integer id) {
        bookingLaptopService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cart-count/{id}")
    public ResponseEntity<?> cartCount(@PathVariable("id") Integer id) {
        Optional<IBookingLaptopDto> getCarCount = bookingLaptopService.getCartCount(id);

        if (getCarCount.isPresent()) {
            return new ResponseEntity<>(getCarCount, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/delete-history/{id}")
    public ResponseEntity<History> deleteHistory(@PathVariable("id") Integer id) {
        bookingLaptopService.deleteHistory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

