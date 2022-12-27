package com.example.back_end.service.laptop.impl;

import com.example.back_end.dto.laptop.IBookingLaptopDto;
import com.example.back_end.dto.laptop.ILaptopDto;
import com.example.back_end.model.laptop.BookingLaptop;
import com.example.back_end.repository.laptop.IBookingLaptopRepository;
import com.example.back_end.service.laptop.IBookingLaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class BookingLaptopService implements IBookingLaptopService {

    @Autowired
    private IBookingLaptopRepository bookingLaptopRepository;

    @Override
    public void addLaptop(Integer quantity, Integer customerId, Integer laptopId) {
        Optional<BookingLaptop> bookingLaptop = bookingLaptopRepository.getBookingLaptopCart(customerId, laptopId);

        if (bookingLaptop.isPresent()) {
            bookingLaptopRepository.setQuantityLaptop(bookingLaptop.get().getQuantity() + quantity, customerId, laptopId);
        } else {
            bookingLaptopRepository.addLaptop(quantity, customerId, laptopId);
        }
    }

    @Override
    public List<ILaptopDto> findCartByUser(Integer id) {
        return bookingLaptopRepository.findCartByUser(id);
    }

    @Override
    public void ascQuantity(Integer id) {
        bookingLaptopRepository.ascQuantity(id);
    }

    @Override
    public void descQuantity(Integer id) {
        bookingLaptopRepository.descQuantity(id);
    }

    @Override
    public void deleteCart(Integer id) {
        bookingLaptopRepository.deleteCart(id);
    }

    @Override
    public void payBookingLaptop(Integer id) {
        bookingLaptopRepository.payBookingLaptop(id);
    }

    @Override
    public Optional<IBookingLaptopDto> getCartCount(Integer id) {
        return bookingLaptopRepository.getCartCount(id);
    }

    @Override
    public void deleteHistory(Integer id) {
        bookingLaptopRepository.deleteHistory(id);
    }

    @Override
    public Optional<ILaptopDto> sumMoney(Integer id) {
        return bookingLaptopRepository.sumMoney(id);
    }

}
