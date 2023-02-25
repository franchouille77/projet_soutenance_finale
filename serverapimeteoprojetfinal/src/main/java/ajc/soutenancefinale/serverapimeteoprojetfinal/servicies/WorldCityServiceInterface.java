package ajc.soutenancefinale.serverapimeteoprojetfinal.servicies;

import java.util.List;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.WorldCity;

public interface WorldCityServiceInterface {

    public List<WorldCity> getAllWorldCities();

    public WorldCity addWorldCity(WorldCity worldCity);

    public WorldCity getWorldCityByNameAndCountryAndCoords(String cityName, String country, Float lat, Float lng);

}
