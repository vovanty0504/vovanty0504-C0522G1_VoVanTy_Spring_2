package com.example.back_end.service.laptop;

import com.example.back_end.dto.laptop.IBookingLaptopDto;
import com.example.back_end.dto.laptop.ILaptopDto;

import java.util.List;
import java.util.Optional;

public interface IBookingLaptopService {
    void addLaptop(Integer quantity, Integer customerId,Integer laptopId);

    List<ILaptopDto> findCartByUser( Integer id);

    void ascQuantity(Integer id);

    void descQuantity( Integer id);

    void deleteCart( Integer id);


    void payBookingLaptop( Integer id);

    Optional<IBookingLaptopDto> getCartCount(Integer id);


}
