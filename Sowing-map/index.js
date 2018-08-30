/*
* @Author: sznews
* @Date:   2018-08-20 11:22:31
* @Last Modified by:   sznews
* @Last Modified time: 2018-08-29 11:25:18
*/
//封装getElementById()函数
function ById(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}

//设置轮播图间歇时间
var main=ById('main');
var timer=null;
var index=0;
//轮播图全部图片
var pics=ById('banner').getElementsByTagName('div');
//右下角的点
var dots=ById('dots').getElementsByTagName('span');
//计算一共有多少图片
var len=pics.length;
//前一张，有一张按钮
var prev=ById('prev');
var next=ById('next');
//划过清除定时器，离开继续
function slideImg(){
	main.onmouseover=function(){
		//划过清除定时器
		if(timer) clearInterval(timer);
	}
	//离开继续
	main.onmouseout=function(){
		timer=setInterval(function(){
			index++;
			if(index>=len){
				index=0;
			}
			//切换图片
			changeImg();
		},3000);
	}
	//自动在main上执行onmouseout事件
	//不用在先触发onmouseover,再触发onmouseout事件了
	main.onmouseout();
	//遍历所有圆点，并绑定点击事件切换图片
	for(var d=0;d<len;d++){
		//每一个dots添加一个id属性，作为当前span的索引
		dots[d].id=d;
		dots[d].onclick=function(){
			//根据dots的id属性改变index索引的值
			index=this.id;
			//执行图片轮播
			changeImg();	
		}
	}
	//点击前一张后一张切换图片
	next.onclick=function(){
		index++;
		if(index>=len){index=0;}
		console.log(index);
		changeImg();
	}
	prev.onclick=function(){
		index--;
		if(index<0){index=len-1;}
		console.log(index);
		changeImg();
	}
}
slideImg();
function changeImg(){
	//遍历清除display=block,清除dots的class
	for(var i=0;i<len;i++){
		pics[i].style.display='none';
		dots[i].className="";
	}
	//显示哪张图片就把该图片display修改成block，添加dotsactive作为class
	pics[index].style.display='block';
	dots[index].className='dotactived';
}
