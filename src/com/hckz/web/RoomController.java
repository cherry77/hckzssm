package com.hckz.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hckz.entity.Customer;
import com.hckz.entity.Order;
import com.hckz.entity.Room;
import com.hckz.entity.StringUtil;
import com.hckz.services.OrderServices;
import com.hckz.services.RoomServices;

@Controller
public class RoomController {

	@Autowired
	private RoomServices roomServices;
	@Autowired
	private OrderServices orderServices;
	
	//预订房间
	@RequestMapping(value="/order")
	public ModelAndView selectByPrimaryKey(Order order,
			Integer roomRoomid,Integer hotelid,
			HttpSession session,HttpServletRequest request){
		ModelAndView mav=new ModelAndView("jsp/orderDetail.jsp");
		
		Customer customer=(Customer) request.getSession().getAttribute("customer");
		if(customer==null){
			
			mav.setViewName("jsp/customer_reg.jsp");
			mav.addObject("errormsg", "需要登录才能进行预订哦！");
		}
		
		Room room=roomServices.selectByPrimaryKey(roomRoomid);
		session.setAttribute("room", room);
		mav.addObject("orderRoom", room);
		return mav;
	}
}
