package com.hckz.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hckz.entity.Customer;
import com.hckz.services.CustomerServices;
@Controller
@RequestMapping("/")
public class CustomerController {	
	@Autowired
	private CustomerServices customerServices;
	//用户注册
	@RequestMapping(value="/reg")
	public ModelAndView register(@ModelAttribute("record") Customer record){	
		ModelAndView mav=new ModelAndView("jsp/index.jsp");		
		int id=customerServices.add(record);	
		record.setCustomerid(id);
		mav.addObject("id", id);
		return mav;		
	}	
	//登录
	 @RequestMapping("/login")
      public ModelAndView checkLogin(
    	   @ModelAttribute("customer")Customer customer,
		   HttpServletRequest request,
		   HttpServletResponse response,
		   HttpSession session) throws IOException{
      
		ModelAndView mav=new ModelAndView("jsp/customer_reg.jsp");
		response.setContentType("text/html;charset=utf-8");
		 customer = customerServices.checkLogin(customer.getCustomerphone(), customer.getCustomerpassword()); 
		  String piccode = (String) request.getSession().getAttribute("piccode");

			String checkcode = request.getParameter("checkcode");
			session.setAttribute("user", customer);
			checkcode = checkcode.toUpperCase();
			if(checkcode==null||"".equals(checkcode)){
				mav.addObject("errormsg", "验证码不能为空！");
				return mav;
			}else if(customer==null){
				mav.addObject("errormsg", "账户或密码错误！");
				return mav;
			}else if(!checkcode.equals(piccode)){
				mav.addObject("errormsg", "验证码输入错误！");
				return mav;
			}else if(piccode.toLowerCase().equals(checkcode.toLowerCase())){
				mav.setViewName("list");
			}
			
		//cookie记住密码十天
       if(customer != null){
    	   String[] isUseCookie = request.getParameterValues("isUseCookie");
    	 	if (isUseCookie != null && isUseCookie.length > 0) {
    	 		
    	    String customerphone = request.getParameter("customerphone");
    		String customerpassword = request.getParameter("customerpassword");
      		Cookie phoneCookie = new Cookie("customerphone", customerphone);
     		Cookie passwordCookie = new Cookie("customerpassword", customerpassword);
     		phoneCookie.setMaxAge(86400);
     		passwordCookie.setMaxAge(86400);  		
     		response.addCookie(phoneCookie);
     		response.addCookie(passwordCookie);
     		
     		mav.addObject("customer",customer);
            session.setAttribute("customer", customer); // 登录成功之后加入session中
             return mav;
    	 	} 
    	 	else {
         		Cookie[]cookies=request.getCookies();
         		if(cookies!=null&&cookies.length>0){
         			for(Cookie c:cookies){
         	  			if(c.getName().equals("customerphone")||c.getName().equals("customerpassword")){
         	  				c.setMaxAge(0);
         	  				response.addCookie(c);
         	  			}
         	  		}
         		}	  
           }       	
           mav.addObject("customer",customer);
           session.setAttribute("customer", customer); // 登录成功之后加入session中
           return mav;
       }else{
    	  mav.setViewName("redirect:jsp/customer_reg.jsp");
    	  return mav;
       }
       
	 }   

}
