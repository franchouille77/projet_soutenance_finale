package ajc.soutenancefinale.serverapimeteoprojetfinal.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.WorldCity;

@Repository
public interface WorldCityRepository extends JpaRepository<WorldCity, Long> {
    //Haversine

    //SELECT c FROM WorldCities c WHERE c.city = :city AND c.country = :country AND (6371 * FUNCTION('acos', FUNCTION('cos', FUNCTION('radians', c.lat)) * FUNCTION('cos', FUNCTION('radians', :latitude)) * FUNCTION('cos', FUNCTION('radians', :longitude) - FUNCTION('radians', c.lng)) + FUNCTION('sin', FUNCTION('radians', c.lat)) * FUNCTION('sin', FUNCTION('radians', :latitude)))) < 10 ORDER BY distance;

    //select w1_0.id,w1_0.city,w1_0.city_ascii,w1_0.country,w1_0.iso2,w1_0.lat,w1_0.lng from worldcities w1_0 where w1_0.city='Paris' and w1_0.country='France' and (acos(((sin(48.8534)*sin(w1_0.lat))+((cos(48.8534)*cos(w1_0.lat))*cos((2.3488-w1_0.lng)))))*6371)<=25;

    //@Query("SELECT wc FROM WorldCity wc WHERE wc.country = :country AND wc.city = :city AND FUNCTION('acos', FUNCTION('sin', :lat) * FUNCTION('sin', wc.lat) + FUNCTION('cos', :lat) * FUNCTION('cos', wc.lat) * FUNCTION('cos', :lng - wc.lng)) * 6371 <= 25")

    //SELECT wc FROM WorldCity wc WHERE wc.country = :country AND wc.city = :city AND wc.lat BETWEEN (:lat - 0.225) AND (:lat + 0.225) AND wc.lng BETWEEN (:lng - 0.225) AND (:lng + 0.225)

    @Query("SELECT wc FROM WorldCity wc WHERE wc.country = :country AND wc.city = :city AND wc.lat BETWEEN (:lat - 0.225) AND (:lat + 0.225) AND wc.lng BETWEEN (:lng - 0.225) AND (:lng + 0.225)")
    WorldCity findWorldCityByCityAndCountryAndCoords(String city, String country, Float lat, Float lng);

    default WorldCity saveNewCity(WorldCity worldCity) {
        WorldCity existingCity = findWorldCityByCityAndCountryAndCoords(worldCity.getCity(), worldCity.getCountry(), worldCity.getLat(), worldCity.getLng());
        System.out.println(worldCity);
        System.out.println(existingCity);
        if (existingCity == null) {
            WorldCity newCity = new WorldCity(worldCity.getCity(), worldCity.getCity_ascii(), worldCity.getLat(), worldCity.getLng(), worldCity.getCountry(), worldCity.getIso2());
            return save(newCity);
        } else return null;
    }

}
