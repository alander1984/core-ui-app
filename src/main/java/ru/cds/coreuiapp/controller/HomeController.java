package ru.cds.coreuiapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    @RequestMapping(value="/", method = RequestMethod.GET)
    public ModelAndView getHomeView() {
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @RequestMapping(value="/api", method = RequestMethod.GET)
    public ModelAndView getApiView() {
        ModelAndView modelAndView = new ModelAndView("api");
        return modelAndView;
    }

    @RequestMapping(value="/login", method = RequestMethod.GET)
    public ModelAndView getLoginView() {
        ModelAndView modelAndView = new ModelAndView("login");
        return modelAndView;
    }

}
