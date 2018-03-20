package com.hckz.web;



import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.omg.PortableInterceptor.USER_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hckz.entity.Customer;
import com.hckz.entity.Hotel;
import com.hckz.entity.Order;
import com.hckz.entity.Room;
import com.hckz.entity.StringUtil;
import com.hckz.services.OrderServices;
import com.hckz.services.RoomServices;

@Controller
@RequestMapping(value="/")
public class OrderController {
	@Autowired	
	private OrderServices orderServices;
	
	@Autowired
	private RoomServices roomServices;
	
	@InitBinder   
    public void initBinder(WebDataBinder binder) {   
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
        dateFormat.setLenient(true);   
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));   
    } 
	
	
	@RequestMapping("insert")
	public ModelAndView insert(Room room,Integer customerid,Integer roomRoomid, Integer hotelid, Order record,HttpServletRequest request,HttpSession session){
		ModelAndView mav=new ModelAndView("changeRoomState");
//		Customer customer=(Customer) request.getSession().getAttribute("customer");
//		roomRoomid=4&hotelid=1001&customerid=1
		
//	    Room room = new Room();
//	    Hotel hotel = new Hotel();
		//订单所属用户
		record.setCustomerid(customerid);
		//订单号
		record.setName(StringUtil.createOrderId());
		//订单状态
		record.setOrderstate(1);
		//订单所属房间id
		/*room.setRoomRoomid(room.getRoomRoomid());
		record.setRoom(room);*/
		record.setRoomid(roomRoomid);
		//订单所属酒店
		/*hotel.setHotelid(hotel.getHotelid());
		record.setHotel(hotel);*/
		record.setHotelid(hotelid);	
		int ins = orderServices.insert(record);
		mav.addObject(ins);
		return mav;
	}	
	//提交后改变房间状态
	@RequestMapping("changeRoomState")
	public ModelAndView changeRoomState(Room room){
		ModelAndView mav=new ModelAndView("selectSubmit");
		mav.addObject("roomState", roomServices.updateRoomState(room));
		return mav;
	}
	
	
	/*在预订成功的界面上显示订单详情 */
	@RequestMapping("selectSubmit")
	public ModelAndView selectSubmit(Integer roomid,Integer hotelid){
		ModelAndView mav=new ModelAndView("/jsp/order_submit.jsp");
		List<Order> order=orderServices.selectSubmit(roomid, hotelid);
		mav.addObject("selectSubmit", order);		
		return mav;
	}
	 
	 //根据客户id查询全部订单
	@RequestMapping("selectOrder")
	public ModelAndView selectOrder(Integer customerid,HttpSession session){
		ModelAndView mav=new ModelAndView("jsp/myorders.jsp");
		List<Order> orders=orderServices.selectOrder(customerid);
		mav.addObject("orders", orders);
		session.setAttribute("orders", orders);
		return mav;
	}
	//取消订单，将订单状态改为0:无效单
	@RequestMapping("cancle")
	public ModelAndView updateOrderState( Order record){
		ModelAndView mav=new ModelAndView("selectOrder");	
		mav.addObject("orderState",orderServices.updateOrderState(record));
		return mav;
	}
	@RequestMapping("findOrderState")
	public ModelAndView selectByPrimaryKey(Order order,Integer id){
		ModelAndView mav=new ModelAndView("cancle");
		 order=orderServices.selectByPrimaryKey(order.getId());
		mav.addObject(order);
		return mav;
		
	}
}
