package com.hckz.dao;


import org.springframework.stereotype.Repository;

import com.hckz.entity.Customer;
@Repository
public interface CustomerMapper {
    int deleteByPrimaryKey(Integer customerid);

    int insert(Customer record);

    int insertSelective(Customer record);

    Customer selectByPrimaryKey(Integer customerid);

    int updateByPrimaryKeySelective(Customer record);

    int updateByPrimaryKey(Customer record);
    
    //登录
    Customer selectByPhone(String customerphone);
    
}