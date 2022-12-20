package com.example.back_end.service.laptop;

import com.example.back_end.dto.laptop.IHistoryDto;
import com.example.back_end.dto.laptop.ILaptopDto;
import com.example.back_end.model.decentralization.User;
import com.example.back_end.model.laptop.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ILaptopService {
    Page<ILaptopDto> findAllLaptopAndSearchPrice(Pageable pageable, String nameSearch, int startPrice, int endPrice);

    Page<ILaptopDto> findAllLaptopAndSearch(Pageable pageable, String nameSearch);

    Optional<ILaptopDto> findByIdLaptop(Integer id);

    Laptop findLaptop( Integer id);

    Page<IHistoryDto> getAllHistory( String username, Pageable pageable);

}
