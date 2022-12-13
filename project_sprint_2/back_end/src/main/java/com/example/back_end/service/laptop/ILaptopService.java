package com.example.back_end.service.laptop;

import com.example.back_end.dto.laptop.ILaptopDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ILaptopService {
    Page<ILaptopDto> findAllLaptopAndSearchPrice(Pageable pageable, String nameSearch, int startPrice, int endPrice);

    Page<ILaptopDto> findAllLaptopAndSearch(Pageable pageable, String nameSearch);

    Optional<ILaptopDto> findByIdLaptop(Integer id);
}
