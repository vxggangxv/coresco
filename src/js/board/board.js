$(function() {
  /* 드롭다운 */
  $(".dropdown .btn").on("click", function() {
    $(this).next().slideToggle("fast");
  });
  //공지사항 리스트 페이지번호
  $("#pagenation li a").on("click", function() {
    var idx = $(this).closest("li").index();
    var lastIdx = $(this).closest("ul").find("li").length;
        lastIdx -- ;
    console.log(lastIdx);
    if( idx != 0 && idx !=1 && idx != lastIdx && idx != lastIdx-1){
      $("#pagenation li").removeClass("on");
      $(this).closest("li").addClass("on");
    }
    event.preventDefault();
  });
  //글쓰기 분류 선택
  $("#fwi-category #dropdown-menu li a").on("click", function(event) {
    var thTxt = $(this).text();
    var thHtml = thTxt + "<span class='pull-right'>▼</span>";
    $("#fwi-category").find(".btn").html(thHtml);
    $("#fwi-category").find("ul").slideToggle("fast");
    $("#fwi-category .btn").addClass("on");
    $("input[name='category']").val(thTxt);
    event.preventDefault();
  });
  //파일박스 꾸미기
  var fileTarget = $('.filebox .upload-hidden'); 
  fileTarget.on('change', function(){ // 값이 변경되면 
    if(window.FileReader){ // modern browser 
      var filename = $(this)[0].files[0].name; 
    } else { // old IE 
      var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
    } 
    // 추출한 파일명 삽입 
    $(this).siblings('.upload-name').val(filename);
    $(this).siblings('.upload-name').css("color","#666");
  });
  
  //글쓰기 수정 삭제 클릭시 비밀번호 박스 생성
  $(".update-btn,.delete-btn").on("click", function() {
    $("#faq-pw").toggleClass("on");
    event.preventDefault();
  });
  /*취소 누를씨 비밀번호 박스 사라짐*/
  $("#faq-pw .cancle-btn").on("click", function() {
    $(this).closest("#faq-pw").toggleClass("on");
	$("#faq-pw .cancle-btn").val("");
    return false;
  });
  

  //검색 분류 선택
  $(".dropdown.wbtn li a").on("click", function() {
    var thTxt = $(this).text();
    var thHtml = thTxt + "<span class='pull-right'>▼</span>";
    $(".dropdown.wbtn").find(".btn").html(thHtml);
    $(".dropdown.wbtn").find("ul").slideToggle("fast");
    $(".dropdown.wbtn .btn").addClass("on");
	  $("input[name='field']").val(thTxt);
    event.preventDefault();
  });
  
  
});