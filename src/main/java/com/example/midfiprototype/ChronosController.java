package com.example.midfiprototype;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ChronosController {

    @RequestMapping(value = "")
    public String viewIndex() {
        return "index";
    }

    @RequestMapping(value = "/index")
    public String viewIndex1() {
        return "index";
    }

    @RequestMapping(value = "/timeform")
    public String retrieveFindByTime() {
        return "findByTime";
    }

    @RequestMapping(value = "/locform")
    public String openFindByLocation() {
        return "findByLocation";
    }

    @RequestMapping(value="/vote")
    public String openVoting() {
        return "voting";
    }

    @PostMapping(value="/map")
    public String retrieveMap(){
        return "mapFragment";
    }

    @PostMapping(value = "/success")
    public String retrieveSucess(){
        return "invSent";
    }

    @GetMapping(value= "/searchResult")
    public String retrieveSearchResult(){
        return "keywordSearchResult";
    }

    @GetMapping(value= "/details")
    public String details() {
        return "details";
    }

}
