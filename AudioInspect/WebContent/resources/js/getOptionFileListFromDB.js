var initQueryForOriginal = "select sf.original_speech_file_id, sf.file_name, sf.recording_mode, sf.recording_quality, sf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
	+ "from original_speech_file sf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
	+ "where (sf.recording_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id)"
var initQueryForEdited = "select esf.edited_speech_file_id, esf.file_name, esf.editing_app_name, esf.recording_mode, esf.recording_quality, esf.file_type, sd.smart_device_model_name, sd.smart_device_model_number, osd.os_name, osd.os_version\n"
	+ "from edited_speech_file esf, recording_editing_device red, smart_device sd, os_for_smart_devices osd\n"
	+ "where esf.editing_device_id=red.recording_editing_device_id and red.smart_device_id = sd.smart_device_id and red.os_id = osd.os_id"
var selectmanufacturer = [];
var selectmanufacturer2 = [];
var selectEdit = "";
var selectEdit2 = [];
var selectOS = "";
var selectOS2 = "";
var search_file_name = "";
var search_file_name2 = "";
var search_model_name = "";
var search_model_name2 = "";
var search_model_number = "";
var search_model_number2 = "";
var select_recordmode = "";
var select_recordmode2 = "";
var select_recordQ = "";
var select_recordQ2 = "";
var record = "";
var record2 = "";
var select_Android = "";
var select_Android2 = "";
var select_Android3 = "";
var select_Android4 = "";
var select_iOS = "";
var select_iOS2 = "";
var OSArr = [];
var manuArr = [];
var resultarr = [];
var resultarr_2 = [];
var resultarr_3 = [];
var resultarr_4 = [];
var resultarr_5 = [];


function manuclick() {
	$(".result_list").empty();
	resultarr = [];
	resultarr_2 = [];
	resultarr_3 = [];
	resultarr_4 = [];
	resultarr_5 = [];
	// 선택된 목록 가져오기
	const query = 'input[type="checkbox"]:checked';
	const selectedEls = document.querySelectorAll(query);
	// 선택된 목록에서 value 찾기
	let result = "";
	let result2 = '';
	let result3 = '';
	let result4 = '';
	//selectedEls.forEach{}내부에 있어야 체크박스 선택, 선택 취소가 원활하게 확인됨
	//그래서 forEach문 내부에서 다중 선택 가능 배열을 넣었음
	selectedEls.forEach((el) => {
		result = el.name + '';
		resultarr.push(result);
		result2 = el.className + '';
		resultarr_2.push(result2)
		result3 = el.className + '';
		//디바이스 제조사 설정은 다중 선택이 가능하므로 따로 배열 생성
		if (result3 == "manufacturerlist") {
			resultarr_3.push(" and sf.recording_app_manufacturer='" + result + "'")
			resultarr_4.push(" and sf.recording_app_manufacturer='" + result + "'")
		}
		//편집 소프트웨어 설정은 다중 선택이 가능하므로 따로 배열 생성
		result4 = el.className + '';
		if (result4 == "editlist2") {
			resultarr_5.push(" and esf.editing_app_name like'%" + result + "%'")
		}
	});
	for (var i = 0; i < resultarr.length; i++) {
		//manufacturerlist = 디바이스 제조사 설정
		if (resultarr_2[i] == "manufacturerlist") {
			if (resultarr[i] == "manuAll") {
				//전체 선택 클릭한 경우 나머지 디바이스 제조사 설정 체크 취소
				$("input[id = 'nonck']").prop("checked", false);
			} else {
				//전체 선택 이외의 디바이스 제조사 설정 클릭시 전체 선택 체크 취소
				if (resultarr[i] == "manuAll") {
					resultarr.splice(0)
				}
				$("input[name = 'manuAll']").prop("checked", false);
				//디바이스 제조사 설정 클릭시 query문 배열 내부에 추가
				selectmanufacturer[i] = resultarr_3[i]
				selectmanufacturer2[i] = resultarr_4[i]
			}
		}
		//편집/원본 여부 선택
		if (resultarr_2[i] == "editlist") {
			if (resultarr[i] == "selectAll") {
				//전체 클릭시 나머지 체크 취소
				$("input[id = 'editnonck']").prop("checked", false);
			}
			if (resultarr[i] == "selectorigin") {
				//원본만 보기 클릭시 전체 선택, 편집본만 보기 선택 취소
				$("input[name='selectAll']").prop("checked", false);
				$("input[name='edit']").prop("checked", false);
				//원본만 보기 클릭하므로 편집 소프트웨어 선택 사항들 선택 취소
				const checkbox5 = $(".editlist2");
				for (var j = 0; j < checkbox5.length; j++) {
					checkbox5[j].checked = false;
				}
			}
			if (resultarr[i] == "edit") {
				//편집만 보기 선택시 전체 보기 선택, 원본만 보기 선택 취소
				$("input[name='selectAll']").prop("checked", false);
				$("input[name='selectorigin']").prop("checked", false);
			}
		}
		//편집 소프트웨어 설정
		if (resultarr_2[i] == "editlist2") {
			if (resultarr[i] == "selectedit") {
				//편집 소프트웨어 설정 내부의 전체보기 선택
				//editlist의 전체 보기, 원본만 보기 선택 취소
				$("input[name='selectAll']").prop("checked", false);
				$("input[name='selectorigin']").prop("checked", false);
				$("input[id = 'sweditnonck']").prop("checked", false);
			}
			else {
				//편집 소프트웨어 선택
				//eidtlist의 전체 보기, 원본만 보기 선택 취소
				$("input[name='edit']").prop("checked", true);
				$("input[name='selectAll']").prop("checked", false);
				$("input[name='selectorigin']").prop("checked", false);
				$(".result_list").empty();
				$("input[name='selectedit']").prop("checked", false);
			}
		}
		//OS 설정
		if (resultarr_2[i] == "OSlist") {
			if (resultarr[i] == "OSAll") {
				//전체 보기 선택시 OS 버전 선택, 직접 입력 선택 취소
				if ($(".input_OS").is(":checked") == true) {
					$("input[class='input_OS']").prop("checked", false);
				}
				if ($(".select_OS").is(":checked") == true) {
					$("input[class='select_OS']").prop("checked", false);
				}
				$("input[id='OSnonck']").prop("checked", false);
			} else {
				//전체 보기 이외에 Android, iOS 선택시 전체 보기 선택 취소
				$("input[name='OSAll']").prop("checked", false);
				//Android, iOS 선택시 query생성
				//resultarr[i]의 값이 Android이거나 iOS임
				selectOS = " and osd.os_name='" + resultarr[i] + "'";
				selectOS2 = " and osd.os_name='" + resultarr[i] + "'";
			}
		}
		//검색 키워드 설정
		if (resultarr_2[i] == "text_search") {
			//파일 이름으로 검색
			if (resultarr[i] == "file_name") {
				//파일 이름으로 검색 선택시 녹음 모델명, 녹음 모델 넘버 선택 취소
				$("input[name='record_device']").prop("checked", false);
				$("input[name='record_device_num']").prop("checked", false);
				//$(".search_text").val()이 사용자가 입력하는 값
				var search = $(".search_text").val();
				search_file_name = " and sf.file_name like'%" + search + "%'";
				search_file_name2 = " and esf.file_name like'%" + search + "%'";
				//파일 이름, 녹음 모델명, 모델 넘버를 한 칸으로 검색하므로 파일 이름 검색시 이전에 검색했던 내용 삭제
				search_model_name = "";
				search_model_name2 = "";
				search_model_number = "";
				search_model_number2 = "";

			}
			//녹음 모델명으로 검색
			if (resultarr[i] == "record_device") {
				//녹음 모델명 검색 선택시 파일 이름, 녹음 모델 넘버 선택 취소
				$("input[name='file_name']").prop("checked", false);
				$("input[name='record_device_num']").prop("checked", false);
				//$(".search_text").val()이 사용자가 입력하는 값
				var search2 = $(".search_text").val();
				search_model_name = " and sd.smart_device_model_name like'%" + search2 + "%'";
				search_model_name2 = " and sd.smart_device_model_name like'%" + search2 + "%'";
				//파일 이름, 녹음 모델명, 모델 넘버를 한 칸으로 검색하므로 파일 이름 검색시 이전에 검색했던 내용 삭제
				search_file_name = "";
				search_file_name2 = "";
				search_model_number = "";
				search_model_number2 = "";

			}
			//녹음 모델 넘버로 검색
			if (resultarr[i] == "record_device_num") {
				//녹음 모델 넘버로 검색 선택시 파일 이름, 녹음 모델명 선택 취소
				$("input[name='file_name']").prop("checked", false);
				$("input[name='record_device']").prop("checked", false);
				//$(".search_text").val()이 사용자가 입력하는 값
				var search3 = $(".search_text").val();
				search_model_number = " and sd.smart_device_model_number like'%" + search3 + "%'";
				search_model_number2 = " and sd.smart_device_model_number like'%" + search3 + "%'";
				//파일 이름, 녹음 모델명, 모델 넘버를 한 칸으로 검색하므로 파일 이름 검색시 이전에 검색했던 내용 삭제
				search_file_name = "";
				search_file_name2 = "";
				search_model_name = "";
				search_model_name2 = "";
			}
		}
		
		var origin = [];
		var edited = [];
		if (resultarr_2[i].includes("edit")) {
			if (resultarr[i].includes("All")) {
				$(".result_list").empty();
				origin[0] = initQueryForOriginal;
				edited[0] = initQueryForEdited;
				getFileListFromDB(origin[0])
				getFileListFromDB(edited[0])
			}
			else if (resultarr[i].includes("origin")) {
				$(".result_list").empty();
				if (selectmanufacturer.length > 0) {
					for (var n = 0; n < selectmanufacturer.length; n++) {
						origin[n] = initQueryForOriginal + record + selectmanufacturer[n] + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
					}
				}
				else {
					origin[0] = initQueryForOriginal + record + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
				}
				edit = "";
			}
			else {
				$(".result_list").empty();
				if (selectmanufacturer2.length > 0) {
					for (var n = 1; n < selectmanufacturer2.length + 1; n++) {
						if (resultarr_5.length > 0) {
							for (var m = 1; m < resultarr_5.length + 1; m++) {
								edited[n * m] = edited[n - 1] + resultarr_5[m - 1]
							}
						}
						else {
							edited[n - 1] = initQueryForEdited + record2 + selectmanufacturer2[n - 1] + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
						}
					}
				}
				else {
					var EditedQ = initQueryForEdited + record2 + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
					if (resultarr_5.length > 0) {
						for (var m = 0; m < resultarr_5.length; m++) {
							edited[m] = EditedQ + resultarr_5[m]
						}
					}
				}
				origin = ""
			}
		}
		else {
			if (resultarr[i].includes("origin")) {
				$(".result_list").empty();
				if (selectmanufacturer.length > 0) {
					for (var n = 0; n < selectmanufacturer.length; n++) {
						origin[n] = initQueryForOriginal + record + selectmanufacturer[n] + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
					}
				}
				else {
					origin[0] = initQueryForOriginal + record + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
				}
				edit = "";
			}
			else {
				$(".result_list").empty();
				if (selectmanufacturer.length > 0) {
					for (var n = 0; n < selectmanufacturer.length; n++) {
						origin[n] = initQueryForOriginal + record + selectmanufacturer[n] + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
					}
				}
				else {
					origin[0] = initQueryForOriginal + record + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
				}
				if (selectmanufacturer2.length > 0) {
					for (var n = 1; n < selectmanufacturer2.length + 1; n++) {
						if (resultarr_5.length > 0) {
							for (var m = 1; m < resultarr_5.length + 1; m++) {
								edited[n * m] = edited[n - 1] + resultarr_5[m - 1]
							}
						}
						else {
							edited[n - 1] = initQueryForEdited + record2 + selectmanufacturer2[n - 1] + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
						}
					}
				}
				else {
					var EditedQ = initQueryForEdited + record2 + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
					if (resultarr_5.length > 0) {
						for (var m = 0; m < resultarr_5.length; m++) {
							edited[m] = EditedQ + resultarr_5[m]
						}
					}
				}
				//origin = "";
				//origin = initQueryForOriginal + record + selectmanufacturer + selectEdit2 + selectOS + search_file_name + search_model_name + search_model_number + select_Android + select_Android3 + select_iOS;
				//edited = initQueryForEdited + record2 + selectmanufacturer2 + selectEdit2 + selectOS2 + search_file_name2 + search_model_name2 + search_model_number2 + select_Android2 + select_Android4 + select_iOS2;
			}
		}
	}
	for (var i = 0; i < origin.length; i++) {
		getFileListFromDB(origin[i]);
	}
	for (var j = 0; j < edited.length; j++) {
		getFileListFromDB(edited[j]);
	}
}

//OS 설정 내부에서 OS 버전 선택
function OS_number() {
	//OS 버전 선택 드롭 다운 선택지에서 한 가지 선택시 OS 버전 선택 체크 박스 체크
	if ($(".select_OS").is(":checked") == false) {
		$("input[class='select_OS']").prop("checked", true);
	}
	//직접 입력, 전체 보기 체크 박스 체크 취소
	if ($(".input_OS").is(":checked") == true) {
		$("input[class='input_OS']").prop("checked", false);
	}
	if ($("input[name='OSAll']").is(":checked") == true) {
		$("input[name='OSAll']").prop("checked", false);
	}
	//$(".selectOS").val()는 OS 버전 선택에서 고른 선택 값
	var OS_version = $(".selectOS").val()
	//$("select[class = selectOS] option:selected").text()는 Android인지 iOS인지 구별
	var OS_And_iOS = $("select[class = selectOS] option:selected").text();
	//버전이 Android인 경우 OSlist의 Android 체크 
	if (OS_And_iOS.includes("Android")) {
		$("input[name = 'Android']").prop("checked", true);
		$("input[name = 'iOS']").prop("checked", false);
	}
	//버전이 iOS인 경우 OSlist의 iOS 체크
	else if (OS_And_iOS.includes("iOS")) {
		$("input[name = 'iOS']").prop("checked", true);
		$("input[name = 'Android']").prop("checked", false);
	}
	select_Android = " and osd.os_version like '%" + OS_version + "' ";
	select_Android2 = " and osd.os_version like '%" + OS_version + "'";
	//직접 입력으로 검색한 값 삭제
	select_Android3 = "";
	select_Android4 = "";
	//상단의 manuclick함수 호출
	manuclick();
}
//OS 설정 내부에서 직접 입력 선택 or 입력
function OS_number2() {
	//직접 입력 칸에 글자 검색시 직접 입력 선택 체크
	if ($(".input_OS").is(":checked") == false) {
		$("input[class='input_OS']").prop("checked", true);
	}
	//OS버전 선택, 전체 보기 선택 체크 취소
	if ($(".select_OS").is(":checked") == true) {
		$("input[class='select_OS']").prop("checked", false);
	}
	if ($("input[name='OSAll']").is(":checked") == true) {
		$("input[name='OSAll']").prop("checked", false);
	}
	//입력칸에 입력한 값
	var OS_version2 = $(".search").val();
	select_Android3 = " and osd.os_version like '%" + OS_version2 + "%'";
	select_Android4 = " and osd.os_version like '%" + OS_version2 + "%'";
	//OS버전 선택 값 삭제
	select_Android = "";
	select_Android2 = "";
	//manuclick 함수 호출
	manuclick();
}

//녹음 모드 선택
//녹음 모드 선택에서 전체 보기 선택
function recordclick() {
	const query = 'input[class="recordlist"]:checked';
	const selectedEls = document.querySelectorAll(query);
	let result = '';
	selectedEls.forEach((el) => {
		result = el.name + '';
	});
	if (result == "recordAll") {
		record = ""
		record2 = ""
	}
	manuclick()
}
//녹음 모드 선택
//녹음 모드 선택에서 녹음 모드, 녹음 퀄리티 선택
function recordmode() {
	//녹음 모드 선택에서 선택시 전체 보기 선택 취소
	if ($("input[class='recordlist']").is(":checked") == true) {
		$("input[class='recordlist']").prop("checked", false);
	}
	//녹음 모드 선택 값
	var mode = $(".recordmode").val();
	//녹음 퀄리티 선택 값
	var mode2 = $(".recordQ").val();
	$(".result_list").empty();
	//녹음 모드 중 전체 보기 선택시 녹음 모드 선택 값 삭제
	if (mode == "recordmode_All") {
		select_recordmode = "";
		select_recordmode2 = "";
	}
	//녹음 모드 query 생성
	else {
		select_recordmode = " and sf.recording_mode='" + mode + "'";
		select_recordmode2 = " and esf.recording_mode='" + mode + "'";
	}
	//녹음 퀄리티 중 전체 보기 선택시 녹음 퀄리티 선택 값 삭제
	if (mode2 == "recordQ_All") {
		select_recordQ = "";
		select_recordQ2 = "";
	} 
	//녹음 퀄리티 query 생성
	else {
		select_recordQ = " and sf.recording_quality='" + mode2 + "'";
		select_recordQ2 = " and esf.recording_quality='" + mode2 + "'";
	}
	//녹음 모드와 녹음 퀄리티 query 합치기
	record = select_recordmode + select_recordQ;
	record2 = select_recordmode2 + select_recordQ2;
	//manuclick 함수 호출
	manuclick()
}

//선택 초기화 클릭
function deleteclick() {
	$(".result_list").empty();
	// 초기화할 checkbox 선택
	//디바디스 제조사
	const checkbox = $(".manufacturerlist");
	//OS 설정
	const checkbox2 = $(".OSlist");
	//워본/퍈집 설정
	const checkbox3 = $(".editlist");
	//검색 키워드 설정
	const checkbox4 = $(".text_search")
	//편집 소프트웨어 설정
	const checkbox5 = $(".editlist2");
	// 체크박스 목록을 순회하며 checked 값을 초기화
	//한 선택 사항 내에 다중 선택이 될 수 있으므로 for문으로 해당 부분 체크 전체 삭제
	for (var i = 0; i < checkbox.length; i++) {
		checkbox[i].checked = false;
	}
	for (var i = 0; i < checkbox2.length; i++) {
		checkbox2[i].checked = false;
	}
	for (var i = 0; i < checkbox3.length; i++) {
		checkbox3[i].checked = false;
	}
	for (var i = 0; i < checkbox4.length; i++) {
		if (checkbox4[i].name == "file_name") {
			$("input[name='file_name']").prop("checked", true);
		}
		else {
			checkbox4[i].checked = false;
		}
	}
	for (var i = 0; i < checkbox5.length; i++) {
		checkbox5[i].checked = false;
	}
	$("input[class='select_OS']").prop("checked", false);
	$("input[class='input_OS']").prop("checked", false);
	//OS 버전 직접 입력 값 삭제
	$(".search").val("")
	//녹음 모드 전체보기로 변경
	$(".recordmode").val("recordmode_All")
	//녹음 퀄리티 전체보기로 변경
	$(".recordQ").val("recordQ_All")
	//검색 키워드 입력 값 삭제
	$(".search_text").val("")
	//배열, 저장된 값 초기 상황으로 되돌리기
	selectEdit = "";
	selectEdit2 = [];
	selectOS = "";
	selectOS2 = "";
	search_file_name = "";
	search_file_name2 = "";
	search_model_name = "";
	search_model_name2 = "";
	search_model_number = "";
	search_model_number2 = "";
	select_recordmode = "";
	select_recordmode2 = "";
	select_recordQ = "";
	select_recordQ2 = "";
	record = "";
	record2 = "";
	select_Android = "";
	select_Android2 = "";
	select_Android3 = "";
	select_Android4 = "";
	select_iOS = "";
	select_iOS2 = "";
	selectmanufacturer = [];
	selectmanufacturer2 = [];
	resultarr = [];
	resultarr_2 = [];
	resultarr_3 = [];
	resultarr_4 = [];
	//모달 창 처음 띄울 때와 같은 결과 부르기
	//전체 보기와 같은 결과 나옴
	getFileListFromDB(initQueryForOriginal)
	getFileListFromDB(initQueryForEdited)
}