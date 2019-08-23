$(function(){
	
	//最顶部
	
	//鼠标移入显示，移出隐藏
	function mouseoverout(obj1,obj2){
		obj1.mouseover(function(){
			$(obj2).css('display','block');
		});
		obj1.mouseout(function(){
			$(obj2).css('display','none');
		});
	};
	
	var oCity = $('.head_top .left');
	mouseoverout(oCity,$('.city'));
	mouseoverout($('.my_jd_mouse'),$('.my_jd'));
	mouseoverout($('.mobel_jd_mouse'),$('.mobel_jd'));
	mouseoverout($('.guanzhu_jd_mouse'),$('.guanzhu_jd'));
	mouseoverout($('.car'),$('.car_list'));
	
	//导航导航
	navFN();
	function navFN(){
		var aLiNav = document.getElementsByClassName('nav')[0].getElementsByTagName('li');
		var aLiMenu = document.getElementsByClassName('pop_menu');
		var timer = null;
		var oldNav = 0;
		
		for(var i=0;i<aLiNav.length;i++){
			aLiNav[i].index = i;
			aLiMenu[i].index = i;
			aLiNav[i].onmouseover = function(){
				clearInterval(timer);
				aLiMenu[oldNav].style.display = 'none';
				aLiMenu[this.index].style.display = 'block';
				oldNav = this.index;
			};
			aLiNav[i].onmouseout = function(){
				var _index = this.index;
				timer = setTimeout(function(){
					aLiMenu[_index].style.display = 'none';
				},100)
			};
			
			aLiMenu[i].onmouseover = function(){
				clearInterval(timer);
			};
			aLiMenu[i].onmouseout = function(){
				var _index = this.index;
				timer = setTimeout(function(){
					aLiMenu[_index].style.display = 'none';
				},100)
				
			};
		}
	};
	
	
	//每一层中间切换 只写了一个，title的active状态没有调整好

	var aFloorTl = document.getElementsByClassName('public_floor_title');
	var aRightM = document.getElementsByClassName('public_right');
	
		
			
		var aLi = aFloorTl[0].getElementsByTagName('li');
		var aList = aRightM[0].getElementsByClassName('list_tab');
		listtab();
		
		function listtab(){
			
			
			aLi[0].onmouseover = function(){
				aList[0].className = 'list1 list_tab active';
				aLi[0].className = 'active';
				for(var l=1;l<aLi.length;l++){
					aList[l].className = 'list2 list_tab';
					aLi[l].className = '';
				}
				
			};
			for(var j=1;j<aLi.length;j++){
				
				aLi[j].index = j;
				aLi[j].onmouseover = function(){
					aLi[0].className = '';
					aList[0].className = 'list1 list_tab';
					for(var k=1;k<aLi.length;k++){
						aList[k].className = 'list2 list_tab';
						aLi[k].className = '';
					}
					
					aList[this.index].className = 'list2 list_tab active';
					aLi[this.index].className = 'active';
					
				};
			}
			
		};
		
	

	
	//图片轮播
	picTab();
	function picTab(){
		var aLiPic = $('.pic_scroll .picture_list li')
		var NumList = $('.pic_scroll .numlist li')
		var oNext = $('.pic_scroll .next')
		var oPrev = $('.pic_scroll .prev')
		//var aLiPic = document.getElementsByClassName('pic_list')[0].getElementsByTagName('li');
		var Num = 0;
		var oldNum = 0;
		var timer = null;
		//aLiPic.eq(Num).animate({opacity:1});
		
		//初始化
		aLiPic.eq(Num).css('opacity',1);
		
		//Num控制一张图片显示,上一张隐藏
		function picTabOpacity(){
			aLiPic.eq(oldNum).animate({opacity:0});
			aLiPic.eq(Num).animate({opacity:1});
			NumList.eq(oldNum).removeClass('active');
			NumList.eq(Num).addClass('active');
			oldNum = Num;
			
		}
		//点击下面的小按钮
		NumList.click(function(){
			Num = $(this).index();
			if(Num == oldNum){return;}
			picTabOpacity();
		});
		
		oNext.click(function(){
			Num++;
			if(Num == aLiPic.length){
				Num = 0;
			}
			picTabOpacity();
		});
		oPrev.click(function(){
			Num--;
			if(Num == -1){
				Num = aLiPic.length-1;
			}
			picTabOpacity();
		});
		timeTab();
		function timeTab(){
			timer = setInterval(function(){
				Num++;
				if(Num == aLiPic.length){
					Num = 0;
				}
				picTabOpacity();
			},3000);
		};
		
		$('.pic_scroll').mouseover(function(){
			clearInterval(timer);
		});
		
		$('.pic_scroll').mouseout(function(){
			timeTab();
		});
		
	};	
		
	//图片无缝滚动
	hotScroll();
	function hotScroll(){
		var aLiPic = $('.hot_pic_scroll .pic_list li');
		var oUlPic = $('.hot_pic_scroll .pic_list'); 
		var oPrev = $('.hot_pic_scroll .prev');
		var oNext = $('.hot_pic_scroll .next'); 
		
		var Num = 0;
		var timer = null;
		var maxNum = Math.ceil(aLiPic.length/4);
		
		var w = 1000;
		
		function picTabOpacity(){
			oUlPic.animate({left:-w*Num});
		}
		
		oPrev.click(function(){
			Num++;
			if(Num == maxNum){
				Num = 0;
			}
			picTabOpacity();
		});
		oNext.click(function(){
			Num--;
			if(Num == -1){
				Num = maxNum-1;
			}
			picTabOpacity();
		});
		timeTab();
		function timeTab(){
			timer = setInterval(function(){
				Num++;
				if(Num == maxNum){
					Num = 0;
				}
				picTabOpacity();
			},4000);
		};
		
		$('.hot_pic_scroll').mouseover(function(){
			clearInterval(timer);
		});
		
		$('.hot_pic_scroll').mouseout(function(){
			timeTab();
		});
			
	};
	var scrollObj1 = $('.floor_scroll1')
	picScroll(scrollObj1);
	
	//floor无缝滚动
	function picScroll(obj){
		
		var aLiPic = obj.find('.picture_list li')
		var oUlPic = obj.find('.picture_list')
		var NumList = obj.find('.numlist li')
		var oNext = obj.find('.next')
		var oPrev = obj.find('.prev');
		var Num = 0;
		var oldNum = 0;
		var timer = null;
		var w = aLiPic.eq(1).width()+1;
		var onOff = true;
		
		floorScrollPublic();
		function floorScrollPublic(){
			oUlPic.css('width',w*aLiPic.length);
			oUlPic.css('left',0);
			
			function picTabOpacityNEXT(){;
				oUlPic.animate({left:-w*Num},function(){
					
					if(parseInt(oUlPic.css('left')) == -w*aLiPic.length/2){
						oUlPic.css('left','0');
					}
					onOff = true;
				});
				NumList.eq(oldNum%4).removeClass('active');
				NumList.eq(Num%4).addClass('active');
				oldNum = Num;
			}
			
			function picTabOpacityPREV(){;
				oUlPic.animate({left:-w*Num},function(){
					
					if(parseInt(oUlPic.css('left')) == -w*(aLiPic.length/2-1)){
						oUlPic.css('left',-w*(aLiPic.length-1));
					}
					onOff = true;
				});
				NumList.eq(oldNum%4).removeClass('active');
				NumList.eq(Num%4).addClass('active');
				oldNum = Num;
			}
			
			NumList.click(function(){
				if(Num>aLiPic.length/2-1){
					Num = $(this).index() + aLiPic.length/2;
				}else{
					Num = $(this).index();
				}
				NumList.eq(oldNum%4).removeClass('active');
				NumList.eq(Num%4).addClass('active');
				oldNum = Num;
				oUlPic.animate({left:-w*Num})
			});
			
			oNext.click(function(){
				if(!onOff){return;}
				onOff = false;
				
				if(Num==aLiPic.length-1){
					Num = aLiPic.length/2-1;
					oUlPic.css('left',-w*(aLiPic.length/2-1) );
				}
				Num++;
				picTabOpacityNEXT();
				if(Num == aLiPic.length/2){
					Num = 0;
				}
			});
			oPrev.click(function(){
				if(!onOff){return;}
				onOff = false;
				
				if(Num==0){
					Num = aLiPic.length/2;
					oUlPic.css('left',-w*(aLiPic.length/2));
				}
				Num--;
				picTabOpacityPREV();
				if(Num == aLiPic.length/2-1){
					Num = aLiPic.length-1;
				}
				
			});
			timeTab();
			function timeTab(){
				timer = setInterval(function(){
					if(Num==aLiPic.length-1){
						Num = aLiPic.length/2-1;
						oUlPic.css('left',-w*(aLiPic.length/2-1) );
					}
					Num++;
					picTabOpacityNEXT();
					if(Num == aLiPic.length/2){
						Num = 0;
					}
				},3000);
			};
			
			
			
			obj.mouseover(function(){
				clearInterval(timer);
			});
			
			obj.mouseout(function(){
				timeTab();
			});
		
		};
	};
	
	
	
	var scrollObj3 = $('.floor_scroll3')
	picScroll(scrollObj3);
	
	var scrollObj5 = $('.floor_scroll5')
	picScroll(scrollObj5);
	
	
	//floor2滚动
	
	var scrollObj4 = $('.floor_scroll4');
	picScrollfloor(scrollObj4);
	
	var scrollObj2 = $('.floor_scroll2');
	
	picScrollfloor(scrollObj2);
	function picScrollfloor(obj){
		
		var aLiPic = obj.find('.picture_list1 li')
		var oUlPic = obj.find('.picture_list')
		var NumList = obj.find('.numlist li')
		var oNext = obj.find('.next')
		var oPrev = obj.find('.prev');
		var Num = 0;
		var oldNum = 0;
		var timer = null;
		var w = aLiPic.eq(1).width()+1;
		var onOff = true;
		
		oUlPic.css('width',w*aLiPic.length);
		oUlPic.css('left',0);
		
		function picTabOpacityNEXT(){;
			oUlPic.animate({left:-w*Num},function(){
				
				if(parseInt(oUlPic.css('left')) == -w*aLiPic.length/2){
					oUlPic.css('left','0');
				}
				onOff = true;
			});
			NumList.eq(oldNum%4).removeClass('active');
			NumList.eq(Num%4).addClass('active');
			oldNum = Num;
		}
		
		function picTabOpacityPREV(){;
			oUlPic.animate({left:-w*Num},function(){
				
				if(parseInt(oUlPic.css('left')) == -w*(aLiPic.length/2-1)){
					oUlPic.css('left',-w*(aLiPic.length-1));
				}
				onOff = true;
			});
			NumList.eq(oldNum%4).removeClass('active');
			NumList.eq(Num%4).addClass('active');
			oldNum = Num;
		}
		
		NumList.click(function(){
			if(Num>aLiPic.length/2-1){
				Num = $(this).index() + aLiPic.length/2;
			}else{
				Num = $(this).index();
			}
			NumList.eq(oldNum%4).removeClass('active');
			NumList.eq(Num%4).addClass('active');
			oldNum = Num;
			oUlPic.animate({left:-w*Num})
		});
		
		oNext.click(function(){
			if(!onOff){return;}
			onOff = false;
			
			if(Num==aLiPic.length-1){
				Num = aLiPic.length/2-1;
				oUlPic.css('left',-w*(aLiPic.length/2-1) );
			}
			Num++;
			picTabOpacityNEXT();
			if(Num == aLiPic.length/2){
				Num = 0;
			}
		});
		oPrev.click(function(){
			if(!onOff){return;}
			onOff = false;
			
			if(Num==0){
				Num = aLiPic.length/2;
				oUlPic.css('left',-w*(aLiPic.length/2));
			}
			Num--;
			picTabOpacityPREV();
			if(Num == aLiPic.length/2-1){
				Num = aLiPic.length-1;
			}
			
		});
		timeTab();
		function timeTab(){
			timer = setInterval(function(){
				if(Num==aLiPic.length-1){
					Num = aLiPic.length/2-1;
					oUlPic.css('left',-w*(aLiPic.length/2-1) );
				}
				Num++;
				picTabOpacityNEXT();
				if(Num == aLiPic.length/2){
					Num = 0;
				}
			},3000);
		};
		
		
		
		obj.mouseover(function(){
			clearInterval(timer);
		});
		
		obj.mouseout(function(){
			timeTab();
		});
		
		
	};
	
	//猜你喜欢下划线移动
	lineMove();
	function lineMove(){
		var oLine = $('.love .line i');
		var ohuangyipi = $('.love .title a');
		
		ohuangyipi.mouseover(function(){
			
			oLine.css('opacity','0');
			oLine.css('left','-365px');
			
			oLine.animate({opacity:1,left:845},600);
			//oLine.animate({left:845},1000);
			
		});
	};
	
	
	
	//图片移入滑动的光斑
	
	function linear(linear,linear_mouse){
		var timer = null;
		linear_mouse.mouseover(function(){
				
			var iLeft = -300;
			
			//var oLinear = document.getElementsByClassName('linear')[0];
			//$('.linear').css('backgroundPosition','300px 0');
			clearInterval(timer);
			timer = setInterval(function(){
					
				iLeft+=7;
				if(iLeft == 553){
					iLeft = -300;
					clearInterval(timer);
				}
				//oLinear.style.backgroundPositoin = 
				linear.css('backgroundPosition',iLeft +'px 0' );
			},6);
		});
	};
	
	//没用for循环 each不太会用，timer传递this对象
	var linear1 = $('.linear1');
	var linear_mouse1 = $('.linear_mouse1');
	linear(linear1,linear_mouse1);
 
	var linear2 = $('.linear2');
	var linear_mouse2 = $('.linear_mouse2');
	linear(linear2,linear_mouse2);
	
	var linear3 = $('.linear3');
	var linear_mouse3 = $('.linear_mouse3');
	linear(linear3,linear_mouse3);
	
	var linear4 = $('.linear4');
	var linear_mouse4 = $('.linear_mouse4');
	linear(linear4,linear_mouse4);
	
	var linear5 = $('.linear5');
	var linear_mouse5 = $('.linear_mouse5');
	linear(linear5,linear_mouse5);
	
	
	//左侧固定导航
	elevator();
	function elevator(){
		var oElevator = $('#elevator');
		var T = document.documentElement.clientHeight;
		var W = document.documentElement.clientWidth; 
		//确定位置
		oElevator.css('top',(T-oElevator.height())/2); 
		oElevator.css('opacity',0); 
		
		if(W<1300){
			oElevator.css('left','-300px');
		}else{
			var oElevatorWidth = (W-1210)/2-30;
			oElevator.css('left',oElevatorWidth+'px');
		}
		
		//窗口改变控制位置
		$(window).on('resize',function(){
			W = document.documentElement.clientWidth; 
			T = document.documentElement.clientHeight;
			oElevator.css('top',(T-oElevator.height())/2);
			if(W<1250){
				oElevator.css('left','-300px');
			}else{
				var oElevatorWidth = (W-1210)/2-30;
				oElevator.animate({left:oElevatorWidth},100);
			}
		});
		
		var TopFloor = $('#floor').offset().top;
		var TopFloor1 = $('.floor1').eq(0).offset().top;
		var TopFloor2 = $('.floor2').offset().top;
		var TopFloor3 = $('.floor3').offset().top;
		var TopFloor4 = $('.floor4').offset().top;
		var TopFloor5 = $('.floor5').offset().top;
		var floorNum = 0;
		
		floorNumFn()
		
		//鼠标滚动动
		onMouseWheel();
		function onMouseWheel(ev){
			var ev = ev || event;
			
			var Topscroll = $(document).scrollTop();
			
			
			
			
			
			console.log(TopFloor1+'||'+TopFloor2 + '||' +TopFloor3+'||'+TopFloor4+'||'+TopFloor5);
			
			if(Topscroll>TopFloor-T-20){
				oElevator.animate({opacity:1},10);
			}else{
				oElevator.animate({opacity:0},10);
			}
			
			if(Topscroll>TopFloor5-T){
				floorNum = 4;
			}else if(Topscroll>TopFloor4-T){
				floorNum = 3;
			}else if(Topscroll>TopFloor3-T){
				floorNum = 2;
			}else if(Topscroll>TopFloor2-T){
				floorNum = 1;
			}else if(Topscroll>TopFloor1-T){
				floorNum = 0;
			}
			console.log(floorNum);
			floorNumFn()
		};
		//绑定鼠标滚动事件
		myAddEvent(document, 'mousewheel', onMouseWheel);
		myAddEvent(document, 'DOMMouseScroll', onMouseWheel);
	
	
		//floorNum控制oElevator的变化
		function floorNumFn(){
			oElevator.find('li').each(function(index, element) {
				$(this).removeClass('active');
			});
			oElevator.find('li').eq(floorNum).addClass('active');
				
		};
		
		
		//oElevator点击控制document变化
		var aLifloor = oElevator.find('li');
		
		aLifloor.click(function(){
			
			floorNum = $(this).index();
			floorNumFn();
			
			switch(floorNum){
				case 0:
				$('html, body').animate({scrollTop:TopFloor1});
				break;
				case 1:
				$('html, body').animate({scrollTop:TopFloor2});
				break;
				case 2:
				$('html, body').animate({scrollTop:TopFloor3});
				break;
				case 3:
				$('html, body').animate({scrollTop:TopFloor4});
				break;
				case 4:
				$('html, body').animate({scrollTop:TopFloor5});
				break;
			}
		});
		
	
	};
	
	//点击反击顶部
	$('.return_top').click(function(){
		
		$('html,body').animate({scrollTop:0});
		
		
	});
	
	
	//右侧固定部分
	
	
	var T = document.documentElement.clientHeight;
	
	//确定按钮位置
	$('#toolbars').css('height',T);
	$(window).on('resize',function(){
		T = document.documentElement.clientHeight;
		$('#toolbars').css('height',T);
		$('.toolbars_tab').css('top',(T-$('.toolbars_tab').height())/2);
	});
	$('.toolbars_tab').css('top',(T-$('.toolbars_tab').height())/2);
	
	
	//点击关闭
	$('.close').mouseover(function(){
		$('.close').addClass('close_active');
	});
	$('.close').mouseout(function(){
		$('.close').removeClass('close_active');
	});
	
	
	$('.close').click(function(){
		$('#toolbars').animate({right:-270});
		
		$('.toolbars_tab').find('span').each(function(){
			$(this).css('backgroundColor','#7a6e6e');
			this.iFixed = false;
		})
	});
	
	//鼠标移入变红
	var timer = null;
	$('#toolbars').find('span').mouseover(function(){
		
		clearTimeout(timer);
		$(this).prev().css('background','#c81623');
		$(this).css('backgroundColor','#c81623');
		if(!this.iFixed){
			this.iFixed = false;
		}
		
		var thisObj = $(this);
		//过一会显示出来
		timer = setTimeout(function(){
			thisObj.prev().animate({right:35});
			
		},500);
		
	});
	
	//点击展开
	$('.toolbars_tab').find('span').click(function(){
		
		clearTimeout(timer);	//点击太快时，需要在没出来之前清除定时器
		$('#toolbars').animate({right:0});
		
		$('.toolbars_tab').find('span').each(function(){
			$(this).css('backgroundColor','#7a6e6e');
			this.iFixed = false;
		});
		$(this).css('backgroundColor','#c81623');
		this.iFixed = true;
		
	});
	
	//鼠标移出
	$('#toolbars').find('span').mouseout(function(){
		
		clearTimeout(timer);	//鼠标移出太快，需要在没出来之前清除定时器
		$(this).prev().animate({right:-71});
		$(this).prev().css('background','');
		
		if(this.iFixed){
			$(this).css('backgroundColor','#c81623');
		}else{
			$(this).css('backgroundColor','#7a6e6e');
		}
		
	});
});

function myAddEvent(obj, sEvent, fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+sEvent, fn);
	}else{
		obj.addEventListener(sEvent, fn, false);
	}
}
