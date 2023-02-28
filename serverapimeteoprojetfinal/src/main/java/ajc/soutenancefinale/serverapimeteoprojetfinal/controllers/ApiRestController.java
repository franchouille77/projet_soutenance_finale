package ajc.soutenancefinale.serverapimeteoprojetfinal.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.Temperature;
import ajc.soutenancefinale.serverapimeteoprojetfinal.models.WorldCity;
import ajc.soutenancefinale.serverapimeteoprojetfinal.servicies.TemperatureService;
import ajc.soutenancefinale.serverapimeteoprojetfinal.servicies.WorldCityService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class ApiRestController {

    private TemperatureService temperatureService;
    private WorldCityService worldCityService;

    public ApiRestController(TemperatureService temperatureService, WorldCityService worldCityService) {
        this.temperatureService = temperatureService;
        this.worldCityService = worldCityService;
    }

    @GetMapping("/getAllTemperatures")
    public List<Temperature> getAllTemperatures() {
        return temperatureService.getAllTemperatures();
    }

    /*
     * @GetMapping("/getTemperature") public Temperature getTemperature() { return
     * temperatureService.getTemperature(); }
     */

    @PostMapping("/addTemperature")
    public Temperature addWorldCity(@RequestBody Temperature temperature) {
        if (temperature.getWorldCity().getId() == null)
            return new Temperature();
        temperature.setTimestamp(new Date());
        return this.temperatureService.addTemperature(temperature);
    }

    @GetMapping("/deleteTemperatureById")
    public void deleteTemperature(@RequestParam Long id) {
        this.temperatureService.deleteTemperatureById(id);
    }

    @GetMapping("/getAllWorldCities")
    public List<WorldCity> getAllWorldCities() {
        return worldCityService.getAllWorldCities();
    }

    @PostMapping("/getWorldCityByNameAndCountryAndCoords")
    public WorldCity getWorldCityByNameAndCountryAndCoords(@RequestBody WorldCity worldCity) {
        System.out.println(worldCity);
            return worldCityService.getWorldCityByNameAndCountryAndCoords(worldCity.getCity(), worldCity.getCountry(), worldCity.getLat(), worldCity.getLng());
    }

    @PostMapping("/addWorldCity")
    public WorldCity addWorldCity(@RequestBody WorldCity worldCity) {
        return this.worldCityService.addWorldCity(worldCity);
    }
}
