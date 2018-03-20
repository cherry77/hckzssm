package com.hckz.dao;

import java.util.List;

import com.hckz.entity.Hotel;
import com.hckz.entity.Hoteldetails;

public interface HoteldetailsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Hoteldetails record);

    int insertSelective(Hoteldetails record);

    Hoteldetails selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Hoteldetails record);

    int updateByPrimaryKey(Hoteldetails record);
    
    //根据hotelid寻找酒店，返回list集合
    public List<Hoteldetails> selectByHotelid(Integer hotelid);
     
    
}