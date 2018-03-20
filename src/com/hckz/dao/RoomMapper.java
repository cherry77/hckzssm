package com.hckz.dao;

import com.hckz.entity.Room;

public interface RoomMapper {
    int deleteByPrimaryKey(Integer roomRoomid);

    int insert(Room record);

    int insertSelective(Room record);

    Room selectByPrimaryKey(Integer roomRoomid);

    int updateByPrimaryKeySelective(Room record);

    int updateByPrimaryKey(Room record);
    
    //提交订单后改变房间的状态
    int updateRoomState(Room room);
}