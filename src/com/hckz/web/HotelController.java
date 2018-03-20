package com.hckz.web;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.hckz.entity.Hotel;
import com.hckz.entity.Page;
import com.hckz.entity.Room;
import com.hckz.entity.SeeRecord;
import com.hckz.services.HotelServices;

@Controller
public class HotelController {
	@Autowired
	private HotelServices hotelServices;
	
	//查询全部酒店
	//根据酒店所在地查询酒店 positionid=1：北京 2：上海 3：广州 4：深圳  6:丽江 7：乌镇
	@RequestMapping(value="/list")
	public ModelAndView hotellist(Integer positionid){
		ModelAndView mav=new ModelAndView("jsp/search.jsp");
		mav.addObject("list", hotelServices.findHotel());
		mav.addObject("listBJ",hotelServices.findBeijing(positionid));
		mav.addObject("listSH",hotelServices.findShangHai(positionid));
		mav.addObject("listGZ",hotelServices.findGuangzhou(positionid));
		mav.addObject("listSZ",hotelServices.findShenZhen(positionid));
		mav.addObject("listCD",hotelServices.findChengDu(positionid));
		mav.addObject("listLJ",hotelServices.findLiJiang(positionid));
		mav.addObject("listWZ",hotelServices.findWuZhen(positionid));
		return mav;
	}	
	//关联酒店详情表，查询酒店详情
	//关联房间表，查询酒店房间
	@RequestMapping(value="/hotelDetails")
	public ModelAndView findHotelDetails(Hotel hotel,Integer hotelid,Room rooms,HttpSession session){
		ModelAndView mav=new ModelAndView("jsp/hotelDetails.jsp");
		mav.addObject("listDetails", hotelServices.findHotelDetails(hotelid));
		mav.addObject("listRoom", hotelServices.findRoom(hotelid));
		session.setAttribute("hotel", hotel);
		return mav;
	}
	

		
	/*分页查询
	@RequestMapping(value="/selectAll")
	public ModelAndView findByHotelName(
			@ModelAttribute("hotel") Hotel hotel,
			String hotelname,
			HttpServletRequest request, 
			Model model, SeeRecord seeRecord,
			String pageNow, HttpSession session){
		ModelAndView mav=new ModelAndView("jsp/hotel_list.jsp");	
		
		int totalCount = 0;
		Page page = null;// new 对象在下面
		
//		String hotelname = request.getParameter("hotelname");    
		String nameString = (String) session.getAttribute("hotelname");
		
		if (nameString != null && hotel.getHotelname()==null) {
			
			
			totalCount = hotelServices.getCount(nameString);
			seeRecord.setHotelname(nameString);
			session.setAttribute("hotelname", nameString);
			return mav;
		} else {
			
			totalCount = hotelServices.getCount(hotel.getHotelname());// 获取当前用户总记录条数
			seeRecord.setHotelname(hotel.getHotelname());
			session.setAttribute("hotelsname", hotel.getHotelname());
		}
		
		if (pageNow != null && pageNow != "") {// 防止出现空指针异常
			int pageNow1 = Integer.parseInt(pageNow);
			page = new Page(totalCount, pageNow1);// 这样写的好处，判断完成外面可以继续调用
		}

		seeRecord.setPage(page);
		List<Hotel> hotelsList = hotelServices.selectAllByPage(seeRecord, nameString);// 取得当前用户的所有操作记录
		model.addAttribute("page", page);
		model.addAttribute("hotelsList", hotelsList);
		return mav;
	}	
	*/
	
	//酒店模糊查询
	@RequestMapping(value="selectHotel")
	public ModelAndView selectHotel(String hotelname){
		ModelAndView mav=new ModelAndView("jsp/hotel_list.jsp");
		mav.addObject("hotelList", hotelServices.findByHotelName(hotelname));
		return mav;
	}
	
}
