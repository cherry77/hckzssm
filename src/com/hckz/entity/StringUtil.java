package com.hckz.entity;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class StringUtil {

	//日期格式转换方法
	public static String getStringTime(){
		Date date=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmssSSSS");//设置时间格式
		return sdf.format(date);//返回格式化后的时间
	}
	
	//订单号生成方法
	public static String createOrderId(){
		Random random=new Random();
		StringBuffer sb=new StringBuffer();//定义字符串对象
		sb.append(getStringTime());//向字符串对象中添加当前系统时间
		for (int i = 0; i < 3; i++) {//随机生成三位数
			sb.append(random.nextInt(9));//将随机生成的数字添加到字符串对象中
			
		}
		return sb.toString();
		
	}

	
}
