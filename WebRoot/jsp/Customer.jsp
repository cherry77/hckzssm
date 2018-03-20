<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">  
<link type="text/css" rel="stylesheet" href="http://js2.znimg.com/c/??bass.css?20140606">
<link href="http://js2.znimg.com/c/u/??userbass.css,noteuser.css,hoteluse.css,jquery-ui-1.10.4.min.css?20140606" rel="stylesheet" type="text/css">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/base.css">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/head.css">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/window.css">

<script type="text/javascript" async="" charset="utf-8" src="http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9937&amp;XNform=zhuna"></script>
<script type="text/javascript" async="" src=""></script>
<script type="text/javascript" async="" charset="utf-8" src="http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9937&amp;XNform=zhuna"></script>
<script type="text/javascript" async="" src=""></script><script src="http://public.kezhan.znimg.com/??common/js/jquery-1.8.2.js" type="text/javascript"></script>
<script type="text/javascript" src="http://tp1.znimg.com/javascript/thickbox-global.js"></script>
<script type="text/javascript" src="http://tp1.znimg.com/javascript/thickbox.js"></script>
<script type="text/javascript" id="seajsnode" src="http://js2.znimg.com/j/??sea.js,g/core/plugin-flush.js,g/core/plugin-shim.js,g/plug/cookies.js"></script>
<script type="text/javascript" src="http://js2.znimg.com/j/u/user_index.js?20140606"></script>

<!-- <script>document.domain = 'zhuna.cn';</script> -->
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/zh_cn.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="lang"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/chat.in.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="chatManage"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/mqtt31.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="MQTT"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/mqtt.chat.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="Connection"></script>
</head>
	<body>
	<!-- <div id="nTalk_post_hiddenElement" style="left: -10px; top: -10px; visibility: hidden; display: none; width: 1px; height: 1px;">
	</div> -->
<jsp:include page="top.jsp"></jsp:include>   

<!--代码开始-->
<div class="userbody"> 
  <!--
  <div id="breadCrumb">
    <div id="breadCrumb1"> <a href="http://www.zhuna.cn/">首页</a> <span>/</span> <a href="/user/">我的会员中心 </a><span>/</span> <em>会员中心首页 </em> </div>
  </div>
  -->
  <div class="hw_breadcrumb clear">
        <div id="breadCrumb">
            <div id="breadCrumb1">
                <a href="http://www.zhuna.cn/">首页</a>
                <span>/</span>
                <a href="/user/">我的会员中心</a>
                <span>/</span>
                <h1>会员中心首页</h1>
           </div>
       </div> 

    </div> 
  <!--主题内容代码开始-->
  <div class="usermain">
    <div class="personbox">
      <div class="persontop">
        <dl>
          <dt>
            <img src="http://tp1.znimg.com/v5/user/default_head.jpg" width="100" height="100">          
          <p><a href="/user/modhead.html">修改头像</a></p>
          </dt>
          <dd>
            <ul>
              <li> 上午好 , <span>150****5862</span> </li>
               <li> 手机：150****5862 </li>
             
              <li>&nbsp;</li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="personmid">
        <div class="mid_d">
          <dl>
            <dt>
              <h3>个人资料</h3>
            </dt>
            <dd> <img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="bai_20">
				<!-- <p>完善个人资料
              <br>得<i>5</i>元返现奖励</p>    -->          
              <span class="ney_note"> <a href="/user/modinfo.html">去完善</a> </span>
		 </dd>
          </dl>
        </div>

      </div>
	 <!--  <div class="personnote">
        <a target="_blank" href="http://www.zhuna.cn/special/lifan/"><strong>使用返现券</strong>（不能与住哪网其他优惠活动同时使用）</a>
	  </div> -->
      <div class="personbottom">
        <ul>
          <li> <a href="#"><img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="pb_a">酒店订单</a> </li>
          <li> <a href="#"><img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="pb_b">度假优选</a> </li>
          <li> <a href="#"><img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="pb_c">短租订单</a> </li>
          <li> <a href="#"><img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="pb_f">客栈订单</a> </li>
          <li> <a href="#"><img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="pb_d">国际酒店</a> </li>
          <li> <a id="bottom_suggest" href="javascript:;" onclick="openservice();"><img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="pb_e">意见反馈</a> </li>
        </ul>
      </div>
    </div>
    <div class="usertips">
      <div class="usertop"> 
          
        <strong>最近消息</strong> 
      </div>
      <div class="boxbase tipsbox">
	          <p>您还没有新消息</p>
	        </div>
    </div>
    <div class="ordertips">
      <div class="usertop"> <strong>最近订单</strong> </div>
      <div class="boxbase ordernum">
		        <ul>
          <li>
			<a class="sngle" onclick="return confirm('您确认要取消订单吗？一旦取消无法恢复');"="" href="http://www.zhuna.cn/user/canceled.asp?f=245317115&amp;u=685d56d106a92387">取消订单</a>            
			<p class="ordernote_a "></p>
            <p class="ordernote_b"><a href="/user/order/info.html?f=245317115&amp;keepThis=true&amp;TB_iframe=true&amp;height=510&amp;width=580" class="thickbox">上海中祥大酒店</a></p>
            <p class="ordernote_c">高级单人房</p>
            <p class="ordernote_d">2017-08-21到2017-08-22</p>
            <p class="ordernote_e"><a href="/user/order/info.html?f=245317115&amp;keepThis=true&amp;TB_iframe=true&amp;height=510&amp;width=580" class="thickbox">处理中</a></p>
          </li>
        </ul>
    </div>
      
  <div class="boxbase ordernum" style="display: none">
		        <div class="no_order">
          <h3><a href="http://www.zhuna.cn/" target="_blank" class="f_right">开始</a>从这里开始您的第一个订单吧</h3>
          <p>您还没有订单</p>
        </div>
		      </div>
    </div>
    <!-- <div class="userbanner"> <a target="_blank" href="http://zt.zhuna.cn/fanxian/">
    <img src="http://tp1.znimg.com/v5/user/ad.gif" width="773" height="90"></a> </div> -->
  </div>
 
<script type="text/javascript">
  function openservice(){
    $(".suggest").click();
  }
</script>

<!--侧边栏代码开始-->
<jsp:include page="left.jsp"></jsp:include> 
  <!--侧边栏代码结束--> 
</div>

<script>
	$("#order_usernav dl dt").click(function(){
		var dl_class = $(this).parent('dl').attr('class');
		if(dl_class == 'cur'){
			$(this).parent('dl').removeClass();
		}else{
			$("#order_usernav dl").removeClass('cur');
			$(this).parent('dl').attr('class','cur');
		}
	});
</script>
<!--主题内容代码结束--> 
<!--代码结束-->
 <jsp:include page="foot.jsp"></jsp:include>
 
<!-- 左侧悬浮结束  -->

<script>//document.domain = 'zhuna.cn';</script>
<script type="text/javascript">
var header_index_url = 'http://www.zhuna.cn/';
var header_static_url = 'http://public.kezhan.znimg.com/';
</script>

<script type="text/javascript" src="http://public.kezhan.znimg.com/js/jquery-plugin/ui/minified/jquery.cookie-min.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/common/js/ued-core.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/common/js/ued-main.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/www/default/js/dialog_login.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/www/default/js/header.js"></script><div class="w_placemain" id="city_input_searchtext" style="z-index: 100000; border: 1px solid rgb(232, 232, 232); display: none; width: 447px;"></div>
<script type="text/javascript" src="http://public.kezhan.znimg.com/www/default/js/ntalker.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/www/default/js/footer.js"></script>
<script language="JavaScript" type="text/javascript">  seajs.use(['z/src/hot_link.js']);  </script>

<!--- zhuna.cn 登录有关 end -->

<!-- <div class="floatbox" style="bottom: 70px; position: fixed; left: 1336px;" id="bottom_float"><ul><li class="suggest float4" p="4" t="0" title="反馈" style="display: none;"><a class="cursor">反馈</a></li>    
<li p="6" t="0" w="w" style="display: none;" title="留言" class="weibo float6"><a class="cursor">留言</a></li>    
<li p="7" t="0" style="display: none;" class="gotop float7" title="返回顶部"><a class="cursor">返回顶部</a></li></ul>
<div class="quickmark" style="display: none;"> <img src="http://public.kezhan.znimg.com/www/default/images/weixin_pic.jpg"><dl>        
<dt>您的随身酒店预订专家</dt>        
<dd>扫一扫，加我微信好友哦！</dd>    
</dl>    
</div> -->
</body>
</html>
