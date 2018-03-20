<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
 <style>
 *{margin:0;padding:0;}
#login{width:100%;height:100%;position:absolute;}
.first{padding-left:40%;width:100%;height:70px;background:rgba(1,1,1,0.7);}
.first ul li {width:100px;height:70px;line-height:70px;float:left;list-style-type:none;margin-left:50px;}
.first ul li a{text-decoration:none;color:white;}
.first ul li a:hover{color:red;}
.first .img1{position:absolute;left:160px;line-height:70px;padding-top:10px;}
.first .img2{position:absolute;left:60px;line-height:70px;}
#con{height:720px;width:1900px;}
#login #right{width:500px;height:400px;background:rgba(1,1,1,0.2);position:absolute;left:60%;top:200px;}
#login #right{text-align:center;padding-top:20px;}
#right span{padding-bottom:20px;}
#right input{width:300px;height:30px;padding-top:10px;margin-top:20px;line-height:30px;}
#right button{border:none;width:300px;height:40px;padding-top:10px;margin-top:20px;font-size:15px;}
#right button:hover{background:#FF4040;}
#right #login1,#login2{color:white;font-size:10px;padding:50px;font-size:30px;}
#right .right2{display:none;}
#right .right2 .ps{width:100px;height:30px;}
#right2 span a{font-size:13px;}
#right2 span input{width:10px;height:10px;}
#right .right3{position:relative;left:-80px;}
#right .right4{position:relative;left:60px;}
#right .right4 a{text-decoration:none;color:black;}
#right .right5{position:relative;left:100px;top:20px;color:black;cursor:pointer;}
#right .right11{position:relative;left:90px;top:20px;color:black;cursor:pointer;}
.errorclass {color: red;}
.form-ele .code {width: 150px;
margin-right: 10px;}
.form-ele img {margin-right: 7px;}
 </style>
 
 <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
<script type="text/javascript">
function changeImg(){    
    var imgSrc = $("#imgObj");    
    var src = imgSrc.attr("src");    
    imgSrc.attr("src",chgUrl(src));    
}    
//时间戳    
//为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳    
function chgUrl(url){   
    var timestamp = (new Date()).valueOf();    
    url = url.substring(0,17);    
    if((url.indexOf("&")>=0)){    
        url = url + "×tamp=" + timestamp;    
    }else{    
        url = url + "?timestamp=" + timestamp;    
    }    
    return url;    
}   
</script>

<script type="text/javascript">
		function reloadCode(){
			var time = new Date().getTime();
			document.getElementById("imagecode").src="<%=request.getContextPath() %>/servlet/ImageServlet?d="+time;
		}
	</script>
</head>
  
  <body> 
  <div id="login">
  
  <div class="first">
		  <ul>
		  <li class="img1"><img src="imag/hckz.png"></li>
		  <li class="img2"><img src="imag/icon_success.png"></li>
		  <li><a href="#">严打侵权传播</a></li>
		  <li><a href="#">首页</a></li>
		  <li><a href="#">客户端下载</a></li>
		  <li><a href="#">官方微博</a></li>
		  <li><a href="#">问题反馈</a></li>
		  </ul>
   </div>
   <div id="con"><img src="./imag/kezhan_bg.jpg">
   
 <div id="right">
  
  	<div class="right1" id="right1" style="display: none;"><br>
  				<span id="login1" onmouseover="bian1()">注册</span><br>
  				
	<form  action="reg" method="post">
		  <input type="text"  name="customerphone" placeholder="手机号码"/><br>
		  <input type="text"  name="customerpassword" placeholder="密码 "/><br>
		 <input type="submit" value="注册"/><br>
 	 </form>
 	 
   <span class="right11"><a onclick="bian2()">已有账号？登录</a></span>
 </div>
   <div class="right2" id="right2" style="display: block;"><br>
   <span id="login2" onmouseover="bian2()">登录</span><br>
   
  <!--  <div class="form-ele">
	<input id="veryCode" name="veryCode" type="text" class="code" />
	<img id="imgObj" alt="" src="xuan/verifyCode" />
    <a href="#" onclick="changeImg()">换一张</a>
	</div> -->
   <%
  	String customerphone="";
  	String customerpassword="";
  	
  	Cookie[]cookies=request.getCookies();
		if(cookies!=null&&cookies.length>0){
			for(Cookie c:cookies){
	  			if(c.getName().equals("customerphone")){
	  				
	  				customerphone=c.getValue();
	  			}
	  			if(c.getName().equals("customerpassword")){
	  				
	  				customerpassword=c.getValue();
	  			}
	  		}
		}	
  %>
   <form:form action="login" modelAttribute="customer" method="post">
  <input type="text"  name="customerphone" value="<%=customerphone %>" placeholder="手机"><br>
  <input type="password"  name="customerpassword" value="<%=customerpassword %>" ><br>
  
 <%--  <form action="<%=request.getContextPath() %>/servlet/LoginServlet" method="get"> --%>
   <input type="text" name="checkcode" placeholder=" 验证码"/><br/>
    <img alt="验证码" id="imagecode" src="<%=request.getContextPath() %>/servlet/ImageServlet"/>
    <a href="javascript: reloadCode();">看不清楚</a><br>
   <%--  </form> --%>
  <span class="right3"><input type="checkbox" name="isUseCookie" checked="checked">十天之内记住密码</span>
   <span class="right4"><a href="#">忘记密码</a></span><br>
  <div class="form-ele" style="color:red;">${errormsg }</div>
  <input type="submit" value="登录"/><br>
  </form:form>
  
  <span class="right5"><a onclick="bian1()">新用户注册</a></span>
  </div>
  </div>
</div>
<script>
var ri1=document.getElementById("right1");
var ri2=document.getElementById("right2");
function bian1(){
ri1.style.display="block";
ri2.style.display="none";

}
function bian2(){
right2.style.display="block";
right1.style.display="none";
}
</script>
</div>
</body>
</html>
