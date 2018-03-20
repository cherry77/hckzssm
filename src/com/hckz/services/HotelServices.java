package com.hckz.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.hckz.dao.HotelMapper;
import com.hckz.entity.Hotel;
import com.hckz.entity.Hoteldetails;
import com.hckz.entity.SeeRecord;


@Service
public class HotelServices {
	@Autowired
	private HotelMapper hotelMapper;
	
	//查询全部酒店
	 public List<Hotel> findHotel(){
		 return hotelMapper.findAllHotel();
	 }
	 
	 //根据酒店所在地查询酒店
	//根据酒店所在地查询酒店 positionid=1：北京 2：上海 3：广州 4：深圳 5：成都 6:丽江 7：乌镇
	 public List<Hotel> findBeijing(Integer positionid){
		 return hotelMapper.findBeijing(positionid);
	}
	 public List<Hotel> findShangHai(Integer positionid){
		 return hotelMapper.findShangHai(positionid);
	}
	 public List<Hotel> findGuangzhou(Integer positionid){
		 return hotelMapper.findGuangzhou(positionid);
	}
	 public List<Hotel> findShenZhen(Integer positionid){
		 return hotelMapper.findShenZhen(positionid);
	}
	 public List<Hotel> findChengDu(Integer positionid){
		 return hotelMapper.findChengDu(positionid);
	}
	 public List<Hotel> findLiJiang(Integer positionid){
		 return hotelMapper.findLiJiang(positionid);
	}
	 public List<Hotel> findWuZhen(Integer positionid){
		 return hotelMapper.findWuZhen(positionid);
	}
	 //根据酒店id查询酒店详情
	 public List<Hotel> findHotelDetails(Integer hotelid){
		 return hotelMapper.findHotelDetails(hotelid);
	 }
	 
	//根据城市名字模糊查询
	    public List<Hotel> findByHotelName(String hotelname){
	    	return hotelMapper.findByHotelName(hotelname);
	    }
	    
	 /* //条件查询,分页
	    public List<Hotel> selectAllByPage(SeeRecord seeRecord,String hotelname){
	  	  return hotelMapper.selectAllByPage(seeRecord, hotelname);
	    }
	    public int getCount(String hotelname){
	  	  return hotelMapper.getCount(hotelname);
	    }*/
	    
	  //根据酒店id查询酒店房间
		 public List<Hotel> findRoom(Integer hotelid){
			 return hotelMapper.findRoom(hotelid);
		 }
}
