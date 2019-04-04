package ru.cds.coreuiapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    @RequestMapping(value="/", method = RequestMethod.GET)
    public ModelAndView getHomeView() {
        ModelAndView modelAndView = new ModelAndView("planning");
        return modelAndView;
    }


    @RequestMapping(value="/planning", method = RequestMethod.GET)
    public ModelAndView getHomeView() {
        ModelAndView modelAndView = new ModelAndView("planning");
        return modelAndView;
    }

    @RequestMapping(value="/login", method = RequestMethod.GET)
    public ModelAndView getLoginView() {
        ModelAndView modelAndView = new ModelAndView("login");
        return modelAndView;
    }

    @RequestMapping(value="/admin", method = RequestMethod.GET)
    public ModelAndView getAdminView() {
        ModelAndView modelAndView = new ModelAndView("admin");
        return modelAndView;
    }
    
    @RequestMapping(value="permission", method = RequestMethod.GET)
    public ModelAndView getPermissionView() {
        ModelAndView modelAndView = new ModelAndView("permission");
        return modelAndView;
    }
    
    @RequestMapping(value="role", method = RequestMethod.GET)
    public ModelAndView getRoleView() {
        ModelAndView modelAndView = new ModelAndView("role");
        return modelAndView;
    }
    
    @RequestMapping(value="driver", method = RequestMethod.GET)
    public ModelAndView getDriverView() {
        ModelAndView modelAndView = new ModelAndView("driver");
        return modelAndView;
    }

    @RequestMapping(value="/vehicle", method = RequestMethod.GET)
    public ModelAndView getVehicleView() {
        ModelAndView modelAndView = new ModelAndView("vehicle");
        return modelAndView;
    }
    
    @RequestMapping(value="/transport-company", method = RequestMethod.GET)
    public ModelAndView getTransportCompanyView() {
        ModelAndView modelAndView = new ModelAndView("transport-company");
        return modelAndView;
    }
}
