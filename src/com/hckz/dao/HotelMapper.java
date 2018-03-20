package com.hckz.dao;

import java.util.List;

import com.hckz.entity.Hotel;

public interface HotelMapper {
    int deleteByPrimaryKey(Integer hotelid);

    int insert(Hotel record);

    int insertSelective(Hotel record);

    Hotel selectByPrimaryKey(Integer hotelid);

    int updateByPrimaryKeySelective(Hotel record);

    int updateByPrimaryKey(Hotel record);
    
  //查询全部酒店
    public List<Hotel> findAllHotel();
    
  //根据酒店所在地查询酒店 positionid=1：北京 2：上海 3：广州 4：深圳 5：成都 6:丽江 7：乌镇
    public List<Hotel> findBeijing(Integer positionid);
    public List<Hotel> findShangHai(Integer positionid);
    public List<Hotel> findGuangzhou(Integer positionid);
    public List<Hotel> findShenZhen(Integer positionid);
    public List<Hotel> findChengDu(Integer positionid);
    public List<Hotel> findLiJiang(Integer positionid);
    public List<Hotel> findWuZhen(Integer positionid); 
    
    
  //根据酒店id查询酒店详情，关联酒店详情表
    public List<Hotel> findHotelDetails(Integer hotelid);
    
  //根据城市名字模糊查询
    public List<Hotel> findByHotelName(String hotelname); 
    
  //根据酒店id查询酒店酒店房间，关联房间详情表
    public List<Hotel> findRoom(Integer hotelid);
   
    
 /* //分页
    取得操作记录，通过SeeRecord对象的属性来查询
    List<Hotel> selectAllByPage(@Param(value="seeRecord")SeeRecord seeRecord,@Param(value="hotelname")String hotelname);
    取得记录条数信息，通过当前商品名称查询
    int getCount(String hotelname);*/
    
}
