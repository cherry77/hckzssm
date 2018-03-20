package com.hckz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hckz.dao.RoomMapper;
import com.hckz.entity.Room;

@Service
public class RoomServices {
	@Autowired
	private RoomMapper roomMapper;
	
	 public Room selectByPrimaryKey(Integer roomRoomid){
		 return roomMapper.selectByPrimaryKey(roomRoomid);
	 }
	 
	//提交订单后改变房间的状态
	 public int updateRoomState(Room room){
		 return roomMapper.updateRoomState(room);
	 }
}
