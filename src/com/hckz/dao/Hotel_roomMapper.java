package com.hckz.dao;

import org.springframework.stereotype.Repository;

import com.hckz.entity.Hotel_room;
@Repository
public interface Hotel_roomMapper {
    int insert(Hotel_room record);

    int insertSelective(Hotel_room record);
}