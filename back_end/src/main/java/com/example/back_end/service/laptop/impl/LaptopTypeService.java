package com.example.back_end.service.laptop.impl;

import com.example.back_end.model.laptop.LaptopType;
import com.example.back_end.repository.laptop.ILaptopRepository;
import com.example.back_end.repository.laptop.ILaptopTypeRepository;
import com.example.back_end.service.laptop.ILaptopTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaptopTypeService implements ILaptopTypeService {
    @Autowired
    private ILaptopTypeRepository laptopTypeRepository;

    @Override
    public List<LaptopType> findAll() {
        return laptopTypeRepository.findAll();
    }


}
