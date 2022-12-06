package com.example.back_end.service.laptop.impl;

import com.example.back_end.dto.ILaptopDto;
import com.example.back_end.repository.laptop.ILaptopRepository;
import com.example.back_end.service.laptop.ILaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class LaptopService implements ILaptopService {
    @Autowired
    private ILaptopRepository iLaptopRepository;

    @Override
    public Page<ILaptopDto> findAllLaptopAndSearch(Pageable pageable,String nameSearch) {
        return iLaptopRepository.findAllLaptopAndSearch(pageable, nameSearch);
    }
}
