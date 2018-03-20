package com.hckz.dao;

import org.springframework.stereotype.Repository;

import com.hckz.entity.Vip;
@Repository
public interface VipMapper {
    int deleteByPrimaryKey(Integer vipId);

    int insert(Vip record);

    int insertSelective(Vip record);

    Vip selectByPrimaryKey(Integer vipId);

    int updateByPrimaryKeySelective(Vip record);

    int updateByPrimaryKey(Vip record);
}