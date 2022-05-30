package com.example.back.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {


    // 204 NO_CONTENT : 내용 없음
    DATA_NOT_FOUND(HttpStatus.NO_CONTENT, "데이터를 찾을 수 없습니다"),

    // 400 BAD_REQUEST : 잘못된 요청
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    // 403 FOBIDDEN : 권한 없음
    FORBIDDEN_AUTH(HttpStatus.FORBIDDEN, "권한이 없습니다."),

    // 404 NOT_FOUND : 리소스를 찾을 수 없음
    PAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "정보를 찾을 수 없습니다."),

    // 405 METHOD_NOT_ALLOWED : 허용되지 않은 메서드 호출
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 메서드입니다."),

    // 500 INTERNAL_SERVER_ERROR: 내부 서버 오류
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버에서 오류가 발생하였습니다."),

    INVALID_PASSWORD_ERROR(HttpStatus.NOT_ACCEPTABLE, "잘못된 비밀번호 형식입니다");

    private final HttpStatus status;
    private final String message;

}
