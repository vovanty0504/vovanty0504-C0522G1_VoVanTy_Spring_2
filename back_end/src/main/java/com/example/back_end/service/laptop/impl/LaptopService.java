package com.example.back_end.service.laptop.impl;

import com.example.back_end.dto.laptop.IHistoryDto;
import com.example.back_end.dto.laptop.ILaptopDto;
import com.example.back_end.model.decentralization.User;
import com.example.back_end.model.laptop.Laptop;
import com.example.back_end.repository.laptop.ILaptopRepository;
import com.example.back_end.service.laptop.ILaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LaptopService implements ILaptopService {
    @Autowired
    private ILaptopRepository iLaptopRepository;

    @Override
    public Page<ILaptopDto> findAllLaptopAndSearchPrice(Pageable pageable, String nameSearch, int startPrice, int endPrice) {
        return iLaptopRepository.findAllLaptopAndSearchPrice(pageable, nameSearch, startPrice, endPrice);
    }

    @Override
    public Page<ILaptopDto> findAllLaptopAndSearch(Pageable pageable, String nameSearch) {
        return iLaptopRepository.findAllLaptopAndSearch(pageable, nameSearch);
    }

    @Override
    public Optional<ILaptopDto> findByIdLaptop(Integer id) {
        return iLaptopRepository.findByIdLaptop(id);
    }

    @Override
    public Laptop findLaptop(Integer id) {
        return iLaptopRepository.findLaptop(id);
    }

    @Override
    public Page<IHistoryDto> getAllHistory(String username, Pageable pageable) {
        return iLaptopRepository.getAllHistory(username, pageable);
    }

    @Override
    public void laptopDelete(Integer id) {
        iLaptopRepository.laptopDelete(id);
    }


}
