package com.hckz.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hckz.dao.CustomerMapper;
import com.hckz.entity.Customer;
@Service
public class CustomerServices {

	@Autowired
	private CustomerMapper customerMapper;
	
	//用户注册
	public int add(Customer record){
		return customerMapper.insert(record);
	}
	
	//用户登录
	 public Customer checkLogin(String customerphone,String customerpassword) { 
		 Customer customer = customerMapper.selectByPhone(customerphone);
	        if(customer != null && customer.getCustomerphone().equals(customerphone)&&customer.getCustomerpassword().equals(customerpassword)){
	            return customer;
	        }
	        return null;		 
	    } 
}
