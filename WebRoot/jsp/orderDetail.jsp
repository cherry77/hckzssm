<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!doctype html>
 
 <head>
 <base href="<%=basePath%>">
  <link rel="stylesheet" href="css/cssorder/datePicker.css" type="text/css">
  <link rel="stylesheet" href="css/cssorder/maincss.css" type="text/css">
  <link rel="stylesheet" href="css/cssorder/WdatePicker.css" type="text/css" >
  <script src="js/My97DatePicker/WdatePicker.js"></script> 
  <link href="css/common.css" type="text/css" rel="stylesheet">
 
 </head>
 <body> 
      
<div id="nTalk_post_hiddenElement" style="left: -10px; top: -10px; visibility: hidden; display: none; width: 1px; height: 1px;"></div><div class="order_head">
  <div class="o_main">
  
    <div class="o_login">
    <c:choose>
    	 <c:when test="${customer.customerid>0 }">
    	 <div id="login_html"><p class=" f_right">
    	 <img src="imag/menghuanzhilv.jpg" width="25" height="25">
    	 <a class="cursor" id="header_login">${customer.customerphone }</a><span>|</span><a href="#">退出</a></p></div>
    	 </c:when>
    	 <c:otherwise>
    	 	<div id="login_html">
    	 	<p class=" f_right"><a class="cursor" id="header_login">登录</a><span>|</span><a href="#">注册</a></p></div>
    	 </c:otherwise>
    </c:choose>
    
    	
       </div>
       </div>
    <div class="logo"> <a href="#"><img src="images/1.jpg" width="160" height="64"></a> </div>
  </div>

<div class="orderbox">
<form action="insert?roomRoomid=${room.roomRoomid }&hotelid=${hotel.hotelid}&customerid=${user.customerid}" name="bookform" id="bookform"  method="Post">
    <div class="o_list">
        <div class="o_listbox">
            <div class="o_nav"> 预订信息 </div>
            <div class="o_note">
               <dl class="eidt_date">
                    <dt>入离日期：</dt>
                    <dd id="ued_datePicker" style="width:550px;">
                  
						<div class="eidt_box_b f_left">
							<!-- <div> 
								<span>入住时间：</span>
								<span>2017-08-10<span>&nbsp;&nbsp;&nbsp;&nbsp;
								<span>离店时间：</span>
								<span>2017-08-11<span>		
							</div>               -->
							 <div class="eidt_box_b f_left">
                                    <div class="eidt_put"> <span>入住</span>
                                        <!-- <input type="text" readonly="readonly" class="ued_datePicker_start date" id="ued_datePicker_start" name="" > -->
                                         <input type="text" id="start" name="intime" value=""  class="date Wdate"  onclick="WdatePicker()">
                                        <i></i>
                                    </div>
                                   
                                    <div class="eidt_put"> <span>离店</span>
                                        <!-- <input type="text" readonly="readonly" class="ued_datePicker_end date" id="ued_datePicker_end" name="" >   -->
                                         <input type="text"  id="end" name="outtime" value="" class="date Wdate"  onclick="WdatePicker()">
                                        <i></i>
                                    </div>
                                    <span id="date_num" class="hotel_num f_left"></span>
                                <!--  <input type="button" value="确定" /> -->
                                </div>

							<div > 
							</div>
                            <span id="date_num" class="hotel_num f_left">共&nbsp;1&nbsp;晚</span>
                        </div>
                    </dd>
                </dl> 
              
              <dl class="message_a">
                    <dt>房间数量：</dt>
                    <dd>
                        <div class="select_box">
                            <select id="roomnum" name="roomnum" class="fi_s1"  onclick="clickMe()">
                                <option  selected="selected">1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                        </div>
                        <div class="room_price"> <i class="f_left">房费</i> 
                        <span class="room_pricetips"> <sub>￥</sub> 
            
                      <strong  id="TotalAmount"><input type="text" name="totalprice" value="${orderRoom.roomPrice}"/></strong> 
                       <!--  <strong id="TotalAmount">----</strong>  -->
                        </span> 
                        </div>
                        <div class="room_numtips" id="yd_info" style="display: block;"><font></font></div>
                        <div class="clearfloat"></div>
                        <div class="room_notes">
                        	(如果您需要6间以上客房，请拨打400-888-8888预订)
                        </div>
                    </dd>
                </dl>
                <dl class="message_b">
                    <dt>入住奖赏：</dt>
                    <dd>
                        <ul class="inbox">
                            <li id="jiangjin_1">
                                <div class="in_tips"> 点评返现 </div>
                                <div class="in_note">入住并完成点评后可获得<span class="f_f00" id="PaybackTotal">---</span>返现奖金</div>                                
                                <span msg_w="380" msg="您入住酒店并结帐，在离店后60天内登录住哪儿网点评入住酒店后，我们将会返还<b><font color=red>---</font></font></font></b>元至您的住哪儿网帐户中，满200元即可申请提现。" name="needTips" class="needTips" id="fx"></span>    
                            </li>
                                
                            <li>
                                <div class="in_tips"> 照片奖金 </div>
                                <div class="in_note">手机上传酒店照片通过审核后，可以获得最高<span class="f_f00">9</span>元的照片奖金。</div>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <dl class="message_c">
                    <dt>最晚抵店：</dt>
                    <dd class="safedd" id="rkTime">
                    	<input type="radio" name="ArriveTime" id="radio1" value="14:00-20:00" checked="" > 
                    <label for="radio1">20:00</label>&nbsp;&nbsp;
                    	<!-- <input type="radio" name="ArriveTime" id="radio2" value="20:00-23:59" >
                    <label for="radio2">24:00</label>&nbsp;&nbsp;
                    	<input type="radio" name="ArriveTime" id="radio3" value="23:59-06:00" > 
                    <label for="radio3">次日06:00</label></dd> -->
                </dl>
                <dl class="message_d" id="citip"><dt>&nbsp;</dt><dd>房间保留至<strong class="f_f00">8月10日20:00</strong>，如不能在<strong class="f_f00">20:00</strong>前到店，请及时通知住哪儿网或与酒店联系。</dd></dl>
                <dl class="message_e">
                    <dt>&nbsp;</dt>
                    <dd class="f_999"> (通常酒店14点办理入住，早到可能需要等待)</dd>
                </dl>
                <div class="clearfloat"></div>
                 
            </div>
            <div class="o_nav"> 联系信息 </div>
            <div class="o_person">
                <dl class="o_person_name">
                    <dt>入住人：</dt>
                    <dd>
                        <div class="time_safe">
                            <input name="customername" type="text" class="input_text" id="g_name[]" style="margin-right:10px;margin-bottom:10px;" b maxlength="20" index="1" >                                                         
                        </div>
                        <span class="person_note"> 每个房间只需填写1位，请确保所填姓名与入住时所持证件保持一致 
                            <span msg_w="380" msg="如果您是两个人入住一间房，每个房间只需填写一个入住人的姓名。<br />如果您是帮朋友订的，请填写您朋友的姓名。" name="needTips" class="needTips"></span>
                        </span>
                    </dd>
                </dl>
                <dl>
                    <dt>联系手机：</dt>
                    <dd>
                        <input name="mobile" type="text" class="input_text1 person_put" id="c_mobile" maxlength="11" >
                        <span class="person_note"> 预订成功后会向您发送短信通知 </span></dd>
                </dl>
                <dl>
                    <dt>Email：</dt>
                    <dd>
                        <input name="email" type="text" class="input_text" id="c_email" value="" size="30" >
                        <span class="person_note"> 建议填写 </span></dd>
                </dl>
                <dl>
                    <dt>备注信息：</dt>
                    <dd>
                        <textarea name="other" id="bak" style="height:100px;padding: 5px 0px 0px 5px;width: 70%;border:solid 1px #e2e2e2; resize:none;" rows="2" cols="60" ></textarea>
                        </dd>
                </dl>
            </div>
            
            
         
    <div class="o_listbox">       
      

        <div id="hotels_po" style="display: none;">
            <div class="o_nav"> 信用卡担保 <span>信用卡验证支付无需开通网银</span></div>    
            
            <div class="o_person box_con ">
              <div id="DbDes" class="roomtips"></div>
       

            </div>
        </div>
      
      
      <div class="clearfloat"></div>
      <div class="o_submit">
        <dl>
          <dt>
            <input name="" type="submit" id="btn1" value="提交订单" class="btn1">
          </dt>
          <dd>
		  如果您在预订过程中遇到问题或预订失败，建议您拨打400-888-8888进行预订<br>
		
		  </dd>
        </dl>
      </div>
    </div>
        </div>
    </div>
    
 
</form>
    
        
      <div class="o_side">
     
    <div class="side_name">
      <dl>
        <dt><img src="http://tp1.znimg.com//hotel_images/7269/160x120_20101401_0_8_1018_1.jpg" alt="床[客人实拍]" height="75" width="100"></dt> 
        <dd> 
          <h3>${orderRoom.hotel.hotelname}</h3>
          <p>${orderRoom.hotel.hotelposition}</p>       
        </dd>
      </dl>
    </div>

    <div class="side_note">
 
      <h3 id="rid_pid">您预订的房型：${orderRoom.roomType} [均价${orderRoom.roomPrice}]</h3> 
      <ul id="roomDescription"><li>早   餐：含双早</li><li>宽   带：免费WIFI</li></ul>
    </div>
    <div class="side_price">
    	<!-- <p><span id="rooms">1</span>间客房，入住<span id="days">1</span>晚</p> -->
        <!-- <h3>
        	<span class=""><sub>￥</sub> <strong id="TotalAmount_left">----</strong> </span><font>酒店前台付款：</font>
        </h3> -->
    </div>
    <div class="order_help"> 
    <ul> 
        <li><a href="javascript:;;" id="order_service" class="tips_b">在线客服</a></li>
        <li><p class="tips_c">400-888-8888</p></li>
      </ul>
    </div>
  </div>  
</div>
<script type="text/javascript">
       var sDom=document.getElementById("start");
       var eDom=document.getElementById("end");
	   var resultDom=document.getElementById("date_num");
       var num;
       var roomnum=document.getElementById("roomnum");
       var total=document.getElementById("TotalAmount");
	   eDom.onblur=function(){
	      var value1=sDom.value;
		  var value2=eDom.value;
		  var arr=[];
		  var brr=[];
		    arr=value1.split("-");
			brr=value2.split("-");
		 
		      num =(brr[1]-arr[1])*30+(brr[2]-arr[2])*1;
		  		resultDom.innerHTML="共&nbsp;"+num+"&nbsp;晚";
	   
	   }

                
                 function clickMe(){
                	    var price=parseInt(roomnum.value);
                	   total.innerText=num*price*${orderRoom.roomPrice};      	 
                 }
                 
                </script>
 </body>
</html>
