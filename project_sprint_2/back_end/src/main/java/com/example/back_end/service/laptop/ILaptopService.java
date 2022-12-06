package com.example.back_end.service.laptop;

import com.example.back_end.dto.ILaptopDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ILaptopService {
    Page<ILaptopDto> findAllLaptopAndSearch(Pageable pageable,String nameSearch);
}
