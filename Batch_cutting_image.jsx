/*///////////////////////////////////////////////////////
*
*
*     Photoshop批量裁切图片脚本
*     22:02 2013/6/2 by 马磊雷
*     Sina:     http://weibo.com/u/3148693702
*     Email:    coleflowersma@gmail.com
*     Twitter:  https://twitter.com/coleflowers3
*
*     使用方法：直接拖动到Photoshop窗口
*
*
*
*////////////////////////////////////////////////////////

var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;

//定义ScriptUI
var windowContent='dialog { \
		text: "按比例批量裁切图片_@甘肅隴南小馬", \
		orientation: "column", \
		alignChildren: "left" ,\
		folder: Group { orientation: "column" , alignChildren: "left" ,\
	            openA: Group { orientation: "row" , alignChildren: "left" , \
	                openfolder: EditText { text: "文件夹C:\" , preferredSize: [260,22] } , \
	                yy: Button { text: "图片来自" } , \
	            } , \
	            saveA: Group { orientation: "row" , alignChildren: "left" , \
	                savefolder: EditText { text: "文件夹C:\" , preferredSize: [260,22] } , \
	                yy: Button { text: "保存图片" } , \
	            } \
	    } , \
	    x: Checkbox { text: "--以指定四边边距的方式裁切>>>>>>>>>>>>>>>>>>>>" } , \
		copy: Panel { text: "指定四边裁切" , orientation: "column" , alignChildren: "left" , \
	        zuobiao:Group { text: "坐标", orientation: "column", alignChildren: "left", \
	            shili: Group { orientation: "column" , alignChildren: "left" , \
	                tips: StaticText { text: "以下填入四个数字分别表示四边裁掉的值:" } , \
	                tips: StaticText { text: "　　如果都大于1，表示实际裁掉像素值" }, \
	                tips: StaticText { text: "　　如果都小于1，表示四边裁掉对应高度或长度的比例" }, \
	            }, \
	            valuea: Group { orientation: "row" , alignChildren: "left" , \
	                topText: EditText { text: "top" , preferredSize: [50,20] } , \
	                rightText: EditText { text: "right" , preferredSize: [50,20] } , \
	                bottomText: EditText { text: "bottom" , preferredSize: [50,20] } , \
	                leftText: EditText { text: "left" , preferredSize: [50,20] } , \
	                check: Button { text: "数值校验" } \
	            } \
	        } , \
	    } , \
	    y: Checkbox { text: "--以指定起始点和要裁切的长度宽度方式裁切>>>>>>>>>>>" } , \
	    point: Panel { text: "指定点和长宽裁切" , orientation: "column" , \
	    	p: Group { orientation: "row" , alignChildren: "left" , \
	    		pointx: EditText { text: "pointx" , preferredSize: [70,22] } , \
	    		pointy: EditText { text: "pointy" , preferredSize: [70,22] } , \
	    		widths: EditText { text: "width" , preferredSize: [70,22] } , \
	    		heights: EditText { text: "height" , preferredSize: [70,22] } , \
	    	} \
		} \
        sumbit: Group { orientation: "row" , alignment: "center" ,\
            Ok: Button { text: "确定" } ,\
            Cancle: Button { text: "取消" } ,\
        } , \
        more: Group { orientation: "row" , alignment: "center" ,\
            Return: Button { text: "重置" } ,\
            About: Button { text: "关于" } ,\
        } \
}';
wind=new Window(windowContent);
wind.copy.zuobiao.shili.enabled=false;

//预备


//初步检测数据是否合理，对于四个值均大于1时，只提醒不判断
wind.copy.zuobiao.valuea.check.onClick = function() {
	//获取输入的值到一个数组，数组中值分别为：上右下左
	var aArea=Array(Number(wind.copy.zuobiao.valuea.topText.text),
			 Number(wind.copy.zuobiao.valuea.rightText.text),
			 Number(wind.copy.zuobiao.valuea.bottomText.text),
			 Number(wind.copy.zuobiao.valuea.leftText.text));
	var checkkey=checkA(aArea);

	if(checkkey==4){
		alert("合格，此时输入的实际裁切的像素值，请确保上下相加不大于图片的高度，左右相加不大于图片的宽度");
	}else if(checkkey==0){
		alert("合格，此时输入为裁掉的比例值。");
	}else{
		alert("不合格，请不要输入单位并确保当，都小于1或者都大于1");
	}

}
//要处理图片所在文件夹
wind.folder.openA.yy.onClick = function() {
	wind.folder.openA.openfolder.text=openFolderToStr();
}

//定义要保存的文件夹
wind.folder.saveA.yy.onClick = function() {
	wind.folder.saveA.savefolder.text=openFolderToStr();
}

wind.sumbit.Cancle.onClick= function() {
	app.preferences.rulerUnits = startRulerUnits;
	app.preferences.typeUnits = startTypeUnits;
	this.parent.parent.close();
}
wind.more.Return.onClick=function(){}
wind.more.About.onClick=function(){
	alert(wind.folder.openA.openfolder.text);
}


//功能实现

//功能选择
wind.x.onClick=function(){
	wind.point.enabled=false;
	wind.copy.enabled=true;
	wind.y.value=false;
}
wind.y.onClick=function(){
	wind.copy.enabled=false;
	wind.point.enabled=true;
	wind.x.value=false;
}
   
wind.sumbit.Ok.onClick=function(){
    
    	//打开文件夹
	var openfrom=wind.folder.openA.openfolder.text;
	var saveto=wind.folder.saveA.savefolder.text;
    



    //打开文件夹
    var openFolder = Folder(openfrom+"\\");
    var fileList = openFolder.getFiles(); //获取openfrom文件夹下所有文件

	for (var i=0; i<fileList.length; i++){
		if (fileList[i] instanceof File && fileList[i].hidden == false){ //不处理隐藏文件
			open(fileList[i]); 
			var docRef = app.activeDocument; 

			//函数
			var area=control(docRef);

			var selectArea=selectBy(area[0],area[1],area[2],area[3]);

		    var img=docRef.selection;
		    img.select(selectArea);
		    img.copy();
		    img.clear();

		    //新建画布，黏贴
		    var dd=app.documents.add(area[2],area[3],80,docRef.name);
		    app.activeDocument.paste();
			
			//调用保存函数保存，          
		    save(app.activeDocument,saveto); 
		}
		//关闭循环处理完毕的图片
    	docRef.close(SaveOptions.DONOTSAVECHANGES);
	}

	wind.close();
}

//定义控制点的函数
function control(doc){
	var rArr=new Array();
	//定义起始点，和长宽
	var selectwidth;
    var selectheight;
    var startx,starty;
    var aa,bb,cc,dd;
    var key;

    //获取参数
    if( wind.x && wind.copy.enabled ){
    	var arr=Array(Number(wind.copy.zuobiao.valuea.topText.text),
    	                   Number(wind.copy.zuobiao.valuea.rightText.text),
    	                   Number(wind.copy.zuobiao.valuea.bottomText.text),
    	                   Number(wind.copy.zuobiao.valuea.leftText.text));
    	key=checkA(arr);

    	//定义四个边要切的值
		aa=arr[0];//上
		bb=arr[1];//右
		cc=arr[2];//下
		dd=arr[3];//左
	}else if( wind.y && wind.point.enabled ){
		key = 5;
		var Q = wind.point.p;
		//定义四边要切的值
		aa=Q.pointy.text;//上
		bb=doc.width-Q.pointx.text-Q.widths.text;//右
		cc=doc.height-Q.pointy.text-Q.heights.text;//下
		dd=Q.pointx.text;//左
	}else{
		alert("有未知的错误，请联系作者");
	}


      	//要复制的宽度，高度，以及起始点            
	if(key==0){
	  	selectwidth=doc.width*(1-bb-dd);
	  	selectheight=doc.height*(1-aa-cc);
	  	startx=doc.width*dd;
	  	starty=doc.height*aa;
	}else if(key==4 || key=5){
	  	selectwidth=doc.width-bb-dd;
	  	selectheight=doc.height-aa-cc;
	  	startx=dd;
	  	starty=aa;
	}

	rArr[2]=selectwidth;
	rArr[3]=selectheight;
	rArr[0]=startx;
	rArr[1]=starty;

	return rArr;
}

//定义左上的点，以及要复制的宽度，高度
function selectBy(startx,starty,width,height){
  var a=Array(Array(startx,starty),Array(startx+width,starty),
              Array(startx+width,starty+height),Array(startx,starty+height));
  return a;
}


//定义保存函数，参数为图像和要存放的文件夹路径
function save(docRef,savefolder) {	//储存函数

    var saveOptions;
    docRef.flatten() ;//合并图层，以储存jpg							
    docRef.changeMode(ChangeMode.RGB); // 更改为rgb模式，避免其它模式无法储存
    docRef.bitsPerChannel = BitsPerChannelType.EIGHT;
    saveOptions = new JPEGSaveOptions();
    var typeName="jpg"; //定义后缀

    //保存地址
    var saveFolder =savefolder+"/";

    if (docRef.name.lastIndexOf('.')==-1){  //根据原文件名有否后缀，判断是否去掉后缀
		var oldname=docRef.name;
	}else{
		var oldname=docRef.name.substring(0,docRef.name.lastIndexOf('.'));
	}
				
    docRef.saveAs(new File(saveFolder +oldname+ "."+ typeName),saveOptions, true,Extension.LOWERCASE);	//设定输出文件名称			
    docRef.close(SaveOptions.DONOTSAVECHANGES); //关闭当前文档	
}

//自定义一个数组的map()函数，功能是把参数数组Arr的每一个值分别传给参数函数func()返回另一个数组
function map(Arr,func){
	var axc=Array();
	for(var l=0;l<Arr.length;l++){
		axc[l]=func(Arr[l]);
	}
	return axc;
}
//定义一个函数单开文件夹，并返回绝对路径给参数
function openFolderToStr() {

	defaultFolder = "~";

	var selFolder = Folder.selectDialog("选择待处理文件所在文件夹",/*默认位置*/ defaultFolder);
	if ( selFolder != null ) {
		return selFolder.fsName;//获得完整的文件夹路径
	}
}

//判断参数数组是否都是大于等于1,返回0、1、2、3、4、……数组长度
//当返回0时代表，数组每一项均小于1
//当返回数组长度时代表，数组每一项均大于或者等于1
function checkA(Arrr) {
	var keynum=0;
	var newww=map(Arrr,function(x){if(x>=1){return 1;}else{return 0;}});
	for(var k=0;k<newww.length;k++){
		keynum+=newww[k];
	}
	return keynum;
}

//实现窗口
wind.center();
wind.show();
