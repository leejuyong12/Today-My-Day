package com.example.back.config;


import com.fasterxml.classmate.TypeResolver;
import com.google.common.base.Predicate;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;

import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.awt.print.Pageable;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private String TITLE = "Team Ginnyus";
    private String DESC = "랜덤 단어 SNS";
    private String LICENSE = "Team Ginnyus";
    private String VERSION = "1.0";

    TypeResolver typeResolver = new TypeResolver();

    @Bean
    public Docket restApi() {
        Docket d = new Docket(DocumentationType.SWAGGER_2)
                .alternateTypeRules(AlternateTypeRules.newRule(typeResolver.resolve(Pageable.class), typeResolver.resolve(Page.class)))
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.example.back.controller"))
                .paths(postPaths())
                .build();

        return d;
    }

    @Data
    @ApiModel
    static class Page {
        @ApiModelProperty(value = "페이지 번호(0..N)")
        private Integer page;

        @ApiModelProperty(value = "페이지 크기", allowableValues="range[0, 100]")
        private Integer size;

        @ApiModelProperty(value = "정렬(사용법: 컬럼명,ASC|DESC)")
        private List<String> sort;
    }


    private Predicate<String> postPaths(){

        Predicate<String> path = PathSelectors.any();
        return path;
    }

    private ApiInfo apiInfo() {
        ApiInfo info = new ApiInfoBuilder()
                .title(TITLE)
                .description(DESC)
                .version(VERSION)
                .license(LICENSE)
                .build();

        return info;
    }
}
