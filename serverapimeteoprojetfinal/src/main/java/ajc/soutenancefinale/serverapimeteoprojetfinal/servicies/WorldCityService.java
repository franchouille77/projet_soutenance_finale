package ajc.soutenancefinale.serverapimeteoprojetfinal.servicies;

import java.util.List;

import org.springframework.stereotype.Service;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.WorldCity;
import ajc.soutenancefinale.serverapimeteoprojetfinal.repositories.WorldCityRepository;


@Service
public class WorldCityService implements WorldCityServiceInterface {

    private WorldCityRepository worldCityRepository;

    public WorldCityService(WorldCityRepository worldCityRepository) {
        this.worldCityRepository = worldCityRepository;
    }

    public List<WorldCity> getAllWorldCities() {
        return this.worldCityRepository.findAll();
    }

    public WorldCity addWorldCity(WorldCity worldCity) {
        return this.worldCityRepository.saveNewCity(worldCity);
    }

    @Override
    public WorldCity getWorldCityByNameAndCountryAndCoords(String cityName, String country, Float lat, Float lng) {
        return this.worldCityRepository.findWorldCityByCityAndCountryAndCoords(cityName, country, lat, lng);
    }
}
