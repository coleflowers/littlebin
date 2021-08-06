/**
 * file        : appicons.jsx
 * description : icons尺寸批量生成 
 *               还是以前做编辑的时候看的javascript for photoshop 想不到如今做app也用到啦
 *               此脚本的作用以sizeArr中配置的数字保存选定的图片为正方形并以 ixi.png 的形式保存
 * author      : coleflowers
 * date        : 20150630
 */

/* 配置尺寸数组 */
var sizeArr = new Array(16, 32, 64, 128, 256, 512, 1024);

/* 配置目录 */ 
var savepath = "C:\\Users\\Administrator\\Desktop\\";
if (isMacOS()) {
	savepath = "/Users/"+ getUserName() +"/Desktop/";
}

/*
var defaultFolder = "~";
var saveFolder = Folder.selectDialog("选择要保存的文件夹", defaultFolder);
if(saveFolder!=null){
	var savepath = saveFolder.fsName+"\\"; 
} else {
	var savepath = "C:\\Users\\Administrator\\Desktop\\";
}
*/

/* 对数组进行排序 */
sizeArr.sort(NumDescSort);
function NumDescSort(a,b) {
    return b-a;
}

/* 选择文件 */
var files = app.openDialog();

/* 批量处理 */
for (var j = 0; j < files.length; j++) {
	resize2(files[j]);
} 

/* 修改尺寸 与 resize1 同 */
function resize2(file){
	var file = app.open(file);
	for(var i=0;i<sizeArr.length;i++){
		if(file.height < sizeArr[i]){
			alert('注意:图片尺寸'+file.height+'小于'+sizeArr[i]);
		}
		file.resizeImage(sizeArr[i], sizeArr[i]);
		if (isMacOS()) {
			file.saveAs(new File(savepath+sizeArr[i]+"x"+sizeArr[i]+".png"), PNGSaveOptions, true);
		} else {
			file.saveAs(new File(savepath+sizeArr[i]+"x"+sizeArr[i]+".png"), PNGSaveOptions);
		}
		
	}
	file.close(SaveOptions.DONOTSAVECHANGES);
}

/* 批量处理函数 */
function resize1(file){

	// alert(sizeArr.length);
	for (var i = 0; i < sizeArr.length; i++) {
		app.open(file);

		// =======================================================
		var idImgS = charIDToTypeID( "ImgS" );
		    var desc18 = new ActionDescriptor();
		    var idWdth = charIDToTypeID( "Wdth" );
		    var idPxl = charIDToTypeID( "#Pxl" );
		    desc18.putUnitDouble( idWdth, idPxl, sizeArr[i] );
		    var idscaleStyles = stringIDToTypeID( "scaleStyles" );
		    desc18.putBoolean( idscaleStyles, true );
		    var idCnsP = charIDToTypeID( "CnsP" );
		    desc18.putBoolean( idCnsP, true );
		    var idIntr = charIDToTypeID( "Intr" );
		    var idIntp = charIDToTypeID( "Intp" );
		    var idautomaticInterpolation = stringIDToTypeID( "automaticInterpolation" );
		    desc18.putEnumerated( idIntr, idIntp, idautomaticInterpolation );
		executeAction( idImgS, desc18, DialogModes.NO );

		// =======================================================
		var idsave = charIDToTypeID( "save" );
		    var desc19 = new ActionDescriptor();
		    var idAs = charIDToTypeID( "As  " );
		        var desc20 = new ActionDescriptor();
		        var idPGIT = charIDToTypeID( "PGIT" );
		        var idPGIT = charIDToTypeID( "PGIT" );
		        var idPGIN = charIDToTypeID( "PGIN" );
		        desc20.putEnumerated( idPGIT, idPGIT, idPGIN );
		        var idPNGf = charIDToTypeID( "PNGf" );
		        var idPNGf = charIDToTypeID( "PNGf" );
		        var idPGAd = charIDToTypeID( "PGAd" );
		        desc20.putEnumerated( idPNGf, idPNGf, idPGAd );
		        var idCmpr = charIDToTypeID( "Cmpr" );
		        desc20.putInteger( idCmpr, 9 );
		    var idPNGF = charIDToTypeID( "PNGF" );
		    desc19.putObject( idAs, idPNGF, desc20 );
		    var idIn = charIDToTypeID( "In  " );
		    desc19.putPath( idIn, new File( "C:\\Users\\Administrator\\Desktop\\test\\"+i+".png" ) );
		    var idDocI = charIDToTypeID( "DocI" );
		    desc19.putInteger( idDocI, 190 );
		    var idCpy = charIDToTypeID( "Cpy " );
		    desc19.putBoolean( idCpy, true );
		    var idsaveStage = stringIDToTypeID( "saveStage" );
		    var idsaveStageType = stringIDToTypeID( "saveStageType" );
		    var idsaveBegin = stringIDToTypeID( "saveBegin" );
		    desc19.putEnumerated( idsaveStage, idsaveStageType, idsaveBegin );
		executeAction( idsave, desc19, DialogModes.NO );

		// =======================================================
		var idCls = charIDToTypeID( "Cls " );
		    var desc23 = new ActionDescriptor();
		    var idSvng = charIDToTypeID( "Svng" );
		    var idYsN = charIDToTypeID( "YsN " );
		    var idN = charIDToTypeID( "N   " );
		    desc23.putEnumerated( idSvng, idYsN, idN );
		executeAction( idCls, desc23, DialogModes.NO );
	} 
}

// link : https://stackoverflow.com/questions/47476719/javascript-photoshop-how-to-get-machine-username
/**
 * Ascertains whether the Operating System is Macintosh.
 * @returns {Boolean} True if the OS is Macintosh, otherwise false.
 */
function isMacOS() {
  return ($.os.toLowerCase().indexOf('mac') >= 0);
}

/**
 * Obtains the computers name/username.
 * @returns {String} The name of the computers username.
 */
function getUserName() {
  return (isMacOS()) ? $.getenv("USER") : $.getenv("USERNAME");
}
