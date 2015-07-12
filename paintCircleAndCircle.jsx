
/* 旋转方法 */
function test2(){
	var ge = 4;
	PaintStart(20, 30, 960, 960);
	intoColorFromFrontColor("sdsdf");
	for (var i = 0; i < 12; i++) {
		copyLayer();
		selectAll();
		turnL(30);
	}
}

/**
 * 突然想到 以下写法有些坑啊 正确的做法是 只画一个方向的 
 * 然后复制图层 旋转，如此 绝对完美，并减少计算量啊
 */
function test1(){
	var ge = 4;
	for (var i = 0; i < 360; i=i+30) {
		PaintStart(20, i, 960, 960);
	}  
	intoColorFromFrontColor("sdsdf");
}
 
 

/* 拷贝当前图层 */
function copyLayer(){
	var idDplc = charIDToTypeID( "Dplc" );
    var desc193 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref67 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref67.putEnumerated( idLyr, idOrdn, idTrgt );
    desc193.putReference( idnull, ref67 );
    var idNm = charIDToTypeID( "Nm  " );
    desc193.putString( idNm, """new001""" );
    var idVrsn = charIDToTypeID( "Vrsn" );
    desc193.putInteger( idVrsn, 5 );
	executeAction( idDplc, desc193, DialogModes.NO );
}

/* 当前图层全选 */
function selectAll(){
	var idsetd = charIDToTypeID( "setd" );
    var desc281 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref145 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref145.putProperty( idChnl, idfsel );
    desc281.putReference( idnull, ref145 );
    var idT = charIDToTypeID( "T   " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idAl = charIDToTypeID( "Al  " );
    desc281.putEnumerated( idT, idOrdn, idAl );
	executeAction( idsetd, desc281, DialogModes.NO );
}

/* 按角度旋转选定区域 */
function turnL(jiaodu){
	// =======================================================
var idslct = charIDToTypeID( "slct" );
    var desc194 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref68 = new ActionReference();
        var idmarqueeEllipTool = stringIDToTypeID( "marqueeEllipTool" );
        ref68.putClass( idmarqueeEllipTool );
    desc194.putReference( idnull, ref68 );
    var iddontRecord = stringIDToTypeID( "dontRecord" );
    desc194.putBoolean( iddontRecord, true );
    var idforceNotify = stringIDToTypeID( "forceNotify" );
    desc194.putBoolean( idforceNotify, true );
executeAction( idslct, desc194, DialogModes.NO );

// =======================================================
var idTrnf = charIDToTypeID( "Trnf" );
    var desc195 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref69 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref69.putEnumerated( idLyr, idOrdn, idTrgt );
    desc195.putReference( idnull, ref69 );
    var idFTcs = charIDToTypeID( "FTcs" );
    var idQCSt = charIDToTypeID( "QCSt" );
    var idQcsa = charIDToTypeID( "Qcsa" );
    desc195.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );
        var desc196 = new ActionDescriptor();
        var idHrzn = charIDToTypeID( "Hrzn" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc196.putUnitDouble( idHrzn, idPxl, 0 );
        var idVrtc = charIDToTypeID( "Vrtc" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc196.putUnitDouble( idVrtc, idPxl, 0 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc195.putObject( idOfst, idOfst, desc196 );
    var idAngl = charIDToTypeID( "Angl" );
    var idAng = charIDToTypeID( "#Ang" );
    desc195.putUnitDouble( idAngl, idAng, jiaodu );
    var idIntr = charIDToTypeID( "Intr" );
    var idIntp = charIDToTypeID( "Intp" );
    var idBcbc = charIDToTypeID( "Bcbc" );
    desc195.putEnumerated( idIntr, idIntp, idBcbc );
executeAction( idTrnf, desc195, DialogModes.NO );
}

/**
 * 填充选区 需要说明的时，当前活动文档必须有选区，否则会填充整个图层
 * where FrgC 前景色填充
 * where BckC 背景色填充
 */
function intoColorFromFrontColor(where){
	// 默认设置前景色
	if(where != "FrgC" && where != "BckC"){
		where = "FrgC"; 
	}
	var idFl = charIDToTypeID( "Fl  " );
    var desc56 = new ActionDescriptor();
    var idUsng = charIDToTypeID( "Usng" );
    var idFlCn = charIDToTypeID( "FlCn" );
    var idFrgC = charIDToTypeID( where );
    desc56.putEnumerated( idUsng, idFlCn, idFrgC );
    var idOpct = charIDToTypeID( "Opct" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc56.putUnitDouble( idOpct, idPrc, 100.000000 );
    var idMd = charIDToTypeID( "Md  " );
    var idBlnM = charIDToTypeID( "BlnM" );
    var idNrml = charIDToTypeID( "Nrml" );
    desc56.putEnumerated( idMd, idBlnM, idNrml );
	executeAction( idFl, desc56, DialogModes.NO );
}

/**
 * 画圆
 * num 个数
 */
function PaintStart(num, jiaodu, width, height){
	var numR = parseInt(num);
	var jiaoduR = parseFloat(jiaodu);
	if(isNaN(numR) || numR == 0 || isNaN(jiaoduR) || jiaoduR > 360 || jiaoduR < 0){
		return 0;
	}
	
	var jiaoduNum = jiaoduJiaoZheng(jiaoduR);// 用来计算偏移量的角度

	var cl =  0.017453293; // 角度弧度转换常量 

	var bei = 1.5; //各圆之间的半斤倍数

	for (var j = 1; j < num; j++) {
		// 十字方向单独处理
		if(jiaoduR == 0 || jiaoduR == 180 || jiaoduR == 90 || jiaoduR == 270 || jiaoduR == 360){
			var banjing = Banjing(j, bei);
			if(jiaoduR == 0 || jiaoduR == 180 || jiaoduR == 360){
				var locationx = 0;
				var locationy = banjing/2;
				for (var k = 1; k < j+1; k++) {
					locationx += (Banjing(k, bei));
				}
				if(jiaoduR == 0){
					var left = width/2 - locationx-banjing/2;
					var top = height/2 -locationy;
					if(left > 0-banjing && top > 0){
						paintCircle(left, top, banjing);
					}
					
				}
				if(jiaoduR == 180){
					var left = width/2+locationx - banjing/2;
					var top = height/2-locationy;
					if(left < width && top>0){
						paintCircle(left, top, banjing);
					}
				}
			}
			if(jiaoduR == 90 || jiaoduR == 270){
				var locationy = 0;
				for (var k = 1; k < j+1; k++) {
					locationy += (4+Banjing(k, bei));
				}
				//locationy = locationy;
				var locationx = banjing/2;
				if(jiaoduR == 90){
					var left = width/2 - locationx;
					var top = height/2 - locationy - banjing/2;
					if(left > 0  && top > 0-banjing){
						paintCircle(left, top, banjing);
					}
				}
				if(jiaoduR == 270){
					var left = width/2 - locationx;
					var top = height/2 + locationy-banjing/2;
					if(left > 0 && top < height){
						paintCircle(left, top, banjing);
					}
				}
			}
		} 
		else {

			var locationx = LocationX(j, jiaoduNum, cl, bei);
			var locationy = LocationY(j, jiaoduNum, cl, bei);			
			if(jiaoduR > 0 && jiaoduR < 90){
				var banjing = Banjing(j, bei); // 圆的半径
				var left = width/2 - locationx;
				var top = height/2 - locationy-banjing/2;

				if(left > 0 && top > 0){
					paintCircle(left, top, banjing);
				}
			} 
			else if(jiaoduR > 90 && jiaoduR < 180){
				var banjing = Banjing(j, bei); // 圆的半径
				var left = width/2 + locationx - banjing;
				var top  = height/2 - locationy - banjing/2;
				if(left < width && top > 0 && left>0){
					// var banjing = Banjing(j, bei); // 圆的半径
					paintCircle(left, top, banjing);
				}
			}
			else if(jiaoduR > 180 && jiaoduR < 270){
				var banjing = Banjing(j, bei); // 圆的半径
				var left = width/2 + locationx - banjing;
				var top = height/2 + locationy - banjing/2;
				if(left<width && top<height && top>0 && left>0){
					
					paintCircle(left, top, banjing);
				}
			}
			else if(jiaoduR > 270 && jiaoduR < 360){
				var banjing = Banjing(j, bei); // 圆的半径
				var left = width/2 - locationx;
				var top = height/2 + locationy - banjing/2;
				if(left > 0 && top < height && top>0 && left>0){
					
					paintCircle(left, top, banjing);
				}
			}
		}
	}
}

/**
 * 画圆
 * left    x轴坐标
 * top     y轴坐标
 * banjing 半径
 */
function paintCircle(left, top, banjing){
	paintCircleEx(left, top, banjing, banjing);
}

/**
 * 画椭圆
 * left    x轴坐标
 * top     y轴坐标
 * width   宽度
 * height  高度
 */
function paintCircleEx(left, top, width, height){
	var bottom = top+height;
	var right = left + width;

	var idAddT = charIDToTypeID( "AddT" );
    var desc201 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref40 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref40.putProperty( idChnl, idfsel );
    desc201.putReference( idnull, ref40 );
    var idT = charIDToTypeID( "T   " );
        var desc202 = new ActionDescriptor();
        var idTop = charIDToTypeID( "Top " );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc202.putUnitDouble( idTop, idPxl, top );
        var idLeft = charIDToTypeID( "Left" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc202.putUnitDouble( idLeft, idPxl, left );
        var idBtom = charIDToTypeID( "Btom" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc202.putUnitDouble( idBtom, idPxl, bottom );
        var idRght = charIDToTypeID( "Rght" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc202.putUnitDouble( idRght, idPxl, right );
    var idElps = charIDToTypeID( "Elps" );
    desc201.putObject( idT, idElps, desc202 );
    var idAntA = charIDToTypeID( "AntA" );
    desc201.putBoolean( idAntA, true );
	executeAction( idAddT, desc201, DialogModes.NO );
}

/**
 * 计算偏移量角度 
 */
function jiaoduJiaoZheng(jparam){
	if(jparam < 90){
		return jparam;  
	} 
	else if(jparam > 90 && jparam < 180){
		return 180-jparam;
	}
	else if(jparam > 180 && jparam < 270){
		return 90-(jparam-180);
	}
	else if(jparam > 270 && jparam < 360){
		return 360-jparam;
	}
	else{
		return 0;
	}
}

/**
 * 获取Y轴的偏移量
 * i 第几个圆
 */
function LocationY(i, jiaodu, cl, bei){
	var xiebian = XieBian(i, bei);
	return xiebian*Math.sin(jiaodu*cl);
}

/**
 * 获取x轴偏移量
 * i 第几个圆
 *
 */
function LocationX(i, jiaodu, cl, bei){
	var jiaoTemp = (90-jiaodu)*cl;
	var banjingNow = Banjing(i, bei);
	var xiebianNow = XieBian(i, bei);
	var xtemp = xiebianNow*Math.sin(jiaoTemp)+banjingNow/2;
	return xtemp;
}

/**
 * 获取斜边
 * y 第几个圆
 * bei 相邻圆之间半径倍数
 */
function XieBian(y, bei){
	var ge = 1.5;
	if(y-1 > 0){
		var xsub1 = XieBian(y-1, bei);
		return Banjing(y, bei)+ge+xsub1;
	} else {
		return 2;
	}
}

/*  
 * 获取半径 (( ╯□╰ )已经搞成直径了)
 * bei 倍数 1.5
 * i 第几个圆 
 */
function Banjing(z, bei){
	if(z-1>0){
		return bei*Banjing(z-1, bei);
	} else {
		return 4;
	}
}