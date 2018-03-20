package com.hckz.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hckz.entity.Order;
@Repository
public interface OrderMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
   
    //在预订成功的页面上显示订单详情
    List<Order> selectSubmit(Integer roomid,Integer hotelid);
    
   //根据客户id查询订单 
    List<Order> selectOrder(Integer customerid);
    
    //取消订单，将订单状态改为0:无效单
   int updateOrderState(Order record);
}