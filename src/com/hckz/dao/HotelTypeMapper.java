package com.hckz.dao;

import org.springframework.stereotype.Repository;

import com.hckz.entity.HotelType;
@Repository
public interface HotelTypeMapper {
    int insert(HotelType record);

    int insertSelective(HotelType record);
}