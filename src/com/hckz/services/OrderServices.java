package com.hckz.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hckz.dao.OrderMapper;
import com.hckz.entity.Order;

@Service
public class OrderServices {
	@Autowired
	private OrderMapper orderMapper;
	//提交订单	
	public int insert(Order record){
		return orderMapper.insert(record);
	}
	//在预订成功页面显示本订单详情
	 public List<Order> selectSubmit(Integer roomid,Integer hotelid){
		 return orderMapper.selectSubmit(roomid, hotelid);
	 }
	 //根据客户id查询全部订单
	 public List<Order> selectOrder(Integer customerid){
		 return orderMapper.selectOrder(customerid);
	 }
	 
	//取消订单，将订单状态改为0:无效单
	 public int updateOrderState(Order record){
		  return orderMapper.updateOrderState(record);
	 }
	 //根据订单id查询订单
	 public  Order selectByPrimaryKey(Integer id){
		 return orderMapper.selectByPrimaryKey(id);
	 }
	
}
