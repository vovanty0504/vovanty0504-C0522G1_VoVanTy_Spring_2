package com.example.back_end.service.laptop;

import com.example.back_end.model.laptop.LaptopType;

import java.util.List;

public interface ILaptopTypeService {

    List<LaptopType> findAll();
}
