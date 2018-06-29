var member = {
	type : function(e) {
		if(e == 'person') {
			$('#person').show();
			$('#company').hide();
		} else {
			$('#person').hide();
			$('#company').show();
		}
	},

	search: function() {
		type = $('input:radio[name="type"]:checked').val();

		if(type == "person") {
			if(!$('input[name="name"]').val()) {
				alert("이름을 입력해주세요.");
				$('input[name="name"]').focus();
				return;
			}

			if(!$('input[name="ssn1"]').val()) {
				alert("주민번호를 입력해주세요.");
				$('input[name="ssn1"]').focus();
				return;
			}

			if($('input[name="ssn1"]').val().length != 6) {
				alert("주민번호 앞 6자리를 입력해주세요.");
				$('input[name="ssn1"]').focus();
				return;
			}

			if(!$('input[name="ssn2"]').val()) {
				alert("주민번호를 입력해주세요.");
				$('input[name="ssn2"]').focus();
				return;
			}

			if($('input[name="ssn2"]').val().length != 3) {
				alert("주민번호 뒤 3자리를 입력해주세요.");
				$('input[name="ssn2"]').focus();
				return;
			}
		} else {
			if(!$('input[name="cname"]').val()) {
				alert("사업자명을 입력해주세요.");
				$('input[name="cname"]').focus();
				return;
			}

			if(!$('input[name="cssn1"]').val()) {
				alert("사업자번호를 입력해주세요.");
				$('input[name="cssn1"]').focus();
				return;
			}

			if($('input[name="cssn1"]').val().length != 3) {
				alert("사업자번호 3자리를 입력해주세요.");
				$('input[name="cssn1"]').focus();
				return;
			}

			if(!$('input[name="cssn2"]').val()) {
				alert("사업자번호를 입력해주세요.");
				$('input[name="cssn2"]').focus();
				return;
			}

			if($('input[name="cssn2"]').val().length != 2) {
				alert("사업자번호 2자리를 입력해주세요.");
				$('input[name="cssn2"]').focus();
				return;
			}

			if(!$('input[name="cssn3"]').val()) {
				alert("사업자번호를 입력해주세요.");
				$('input[name="cssn3"]').focus();
				return;
			}

			if($('input[name="cssn3"]').val().length != 5) {
				alert("사업자번호 5자리를 입력해주세요.");
				$('input[name="cssn3"]').focus();
				return;
			}
		}

		
		$('#iform').submit();
	},

	user: function() {
		if(!$('#userid').val()) {
			alert('아이디를 입력해주세요.');
			$('#userid').focus();
			return;
		}

		$.ajax({
			url: 'state.php',
			type: 'post',
			data: 'mode=user&a=' + $('#userid').val(),
			success: function(e) {
				if(e == 1) {
					alert('조회하신 아이디는 이미 사용중입니다.');
					$('#userid').val('').focus();
				} else { 
					alert('조회하신 아이디는 사용가능합니다.');
					$('#passwd').focus();
					$('#userid_chk').val('Y');
				}
			}
		});
	},

	auth: function(e) {

		var mobile = $('#tel1').val() + $('#tel2').val() + $('#tel3').val();
	
		if(e == 'send') {
			if(!$('#tel1').val()) {
				alert("휴대폰번호를 입력해주세요.");
				$('#tel1').focus();
				return;
			}

			if($('#tel1').val().length != 3) {
				alert("휴대폰번호를 확인해주세요.");
				$('#tel1').focus();
				return;
			}

			if(!$('#tel2').val()) {
				alert("휴대폰번호를 입력해주세요.");
				$('#tel2').focus();
				return;
			}

			if($('#tel2').val().length < 3) {
				alert("휴대폰번호를 확인해주세요.");
				$('#tel2').focus();
				return;
			}

			if(!$('#tel3').val()) {
				alert("휴대폰번호를 입력해주세요.");
				$('#tel3').focus();
				return;
			}

			if($('#tel3').val().length != 4) {
				alert("휴대폰번호를 입력해주세요.");
				$('#tel3').focus();
				return;
			}

			if($('#mobile_chk').hasClass('loading') == true) {
				alert('문자발송 진행중입니다.');
			} else { 
				$.ajax({
					url: 'state.php',
					type: 'post',
					data: 'mode=send&mobile=' + mobile,
					success: function(e) {
						if(e == 1) {
							alert('인증문자를 발송하였습니다.');
							$('#mobile_chk').show().focus();
							$('#mobile_txt').html('<a href=\'javascript:member.auth("confirm");\' class="btn btn_type04" id="mobile_txt">인증확인</a>');
						} else { 
							alert('발송실패하였습니다. 다시 시도해주세요.');
						}
					},
					beforeSend: function() {
						$('#mobile_chk').addClass('loading');
					},
					
					complete: function() {
						$('#mobile_chk').removeClass('loading');
					}
				});
			}
		} else {
			if(!$('#mobile_chk').val()) {
				alert('인증번호를 입력해주세요.');
				$('#mobile_chk').focus();
				return;
			}

			$.ajax({
				url: 'state.php',
				type: 'post',
				data: 'mode=auth&verify=' + $("#mobile_chk").val() + '&mobile=' + mobile,
				success: function(e) {
					if(e == 1) {
						alert('인증이 완료되었습니다.');
						$('#mobile_final').val('Y');
						$('#mobile_txt').html('<a href="#" class="btn btn_type04" id="mobile_txt">인증완료</a>');
						$('#tel1').attr('readonly', true);
						$('#tel2').attr('readonly', true);
						$('#tel3').attr('readonly', true);
					} else { 
						alert('인증번호가 일치하지 않습니다.');
						setTimeout(function(){ $('#mobile_chk').focus(); }, 1);
					}
				}
			});
		}
	},

	join: function() {
		if(!$('#userid').val()) {
			alert('아이디를 입력해주세요.');
			setTimeout(function(){ $('#userid').focus(); }, 1);
			return;
		}

		if($('#userid_chk').val() == 'N') {
			alert("아이디 중복확인을 해주세요.");
			setTimeout(function(){ $('#userid').focus(); }, 1);
			return;
		}
		
		if(!$('#passwd').val() || !$("#passwdchk").val()) {
			if($('#passwd').val()) {
				alert('비밀번호를 입력해주세요');
				setTimeout(function(){ $('#passwd').focus(); }, 1);
			} else { 
				alert('비밀번호를 한번더 입력해주세요');
				setTimeout(function(){ $('#passwdchk').focus(); }, 1);
			}
			return;
		}

		if($('#passwd').val() != $('#passwdchk').val()) {
			alert('비밀번호가 일치하지 않습니다.');
			setTimeout(function(){ $('#passwdchk').focus(); }, 1);
			return;
		}

		var title = ($('input[name="type"]').val() == "person") ? "이름" : "사업자명";

		if(!$('#username').val()) {
			alert(title + '을 입력해주세요.');
			setTimeout(function(){ $('#username').focus(); }, 1);
			return;
		}

		if(!$('#tel1').val()) {
			alert("휴대폰번호를 입력해주세요.");
			$('#tel1').focus();
			return;
		}

		if($('#tel1').val().length != 3) {
			alert("휴대폰번호를 확인해주세요.");
			$('#tel1').focus();
			return;
		}

		if(!$('#tel2').val()) {
			alert("휴대폰번호를 입력해주세요.");
			$('#tel2').focus();
			return;
		}

		if($('#tel2').val().length < 3) {
			alert("휴대폰번호를 확인해주세요.");
			$('#tel2').focus();
			return;
		}

		if(!$('#tel3').val()) {
			alert("휴대폰번호를 입력해주세요.");
			$('#tel3').focus();
			return;
		}

		if($('#tel3').val().length != 4) {
			alert("휴대폰번호를 입력해주세요.");
			$('#tel3').focus();
			return;
		}

		if($('#mobile_final').val() == 'N') {
			alert('휴대폰 인증확인을 해주세요.');
			setTimeout(function(){ $('#mobile_chk').focus(); }, 1);
			return;
		}
		
		if(!$('input[name="pcode"]').val() || !$('input[name="addr_road"]').val()) {
			alert("주소를 검색주세요.");
			return;
		}

		if($('#chk01').is(':checked') == false){
			alert('이용약관에 동의해주세요.');
			return;
		} 

		if($('#chk02').is(':checked') == false){
			alert('개인정보 수집 및 이용약관에 동의해주세요.');
			return;
		} 

		$.ajax({
			url: "state.php",
			type: "post",
			data: $("#iform").serialize(),
			success: function(e) {
				alert('가입되었습니다.');
				location.href='/';
			}
		});
	}
}


function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}    
}