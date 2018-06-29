$(function() {

	//2018여름 성수기 회원예약접수 배너 클릭시
    $('.banner-summer a').on('click', function(){
        popupOn($('#popSummer'));
    });
    
    //회원카드 공지, 상담신청, 회원예약접수 팝업 닫기
    $('.btn-pop-close, #popConsultEnd .a-btn').on('click', function(){
        if( $(this).parents('div').hasClass('popup-com') ){
            var popCloseWrap = $(this).parents('.popup-com');
            popupOff(popCloseWrap);
        }else{
            //공지
            popupOff($('.pop-notice'));
        }
    });

});

/* 팝업 오픈  */
function popupOn(openitem){
    openitem.show();
    $('html').css({'overflow': 'hidden', 'height': '100%'});
    
    openitem.on('scroll touchmove mousewheel', function(event) { 
        event.preventDefault();     
        event.stopPropagation();     
        return false; 
    });
}

/* 팝업 고정해제 */
function popupOff(closeitem){
    closeitem.hide();
    
    if( closeitem.hasClass('popup-cal') ){
        
    }else{
        $('html').css({'overflow': 'auto', 'height': '100%'});

        closeitem.off('scroll touchmove mousewheel');
    }
    
}