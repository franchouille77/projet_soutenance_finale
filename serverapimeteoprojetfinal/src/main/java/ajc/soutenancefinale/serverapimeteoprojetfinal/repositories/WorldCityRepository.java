package ajc.soutenancefinale.serverapimeteoprojetfinal.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.WorldCity;

@Repository
public interface WorldCityRepository extends JpaRepository<WorldCity, Long> {

    //SELECT city, country, lat, lng, ( 6371 * acos( cos( radians(lat) ) * cos( radians( 48.8534 ) ) * cos( radians( 2.3488 ) - radians(lng) ) + sin( radians(lat) ) * sin( radians( 48.8534 ) ) ) ) AS distance FROM worldcities WHERE city = 'Paris' AND country = 'France' HAVING distance < 10 ORDER BY distance;

    //SELECT c FROM WorldCities c
    //WHERE c.city = :city AND c.country = :country AND
    //(6371 * FUNCTION('acos', FUNCTION('cos', FUNCTION('radians', c.lat)) *
    //FUNCTION('cos', FUNCTION('radians', :latitude)) *
    //FUNCTION('cos', FUNCTION('radians', :longitude) - FUNCTION('radians', c.lng)) +
    //FUNCTION('sin', FUNCTION('radians', c.lat)) * FUNCTION('sin', FUNCTION('radians', :latitude)))) < 10
    //ORDER BY distance;

    //select w1_0.id,w1_0.city,w1_0.city_ascii,w1_0.country,w1_0.iso2,w1_0.lat,w1_0.lng from worldcities w1_0 where w1_0.city='Paris' and w1_0.country='France' and (acos(((sin(48.8534)*sin(w1_0.lat))+((cos(48.8534)*cos(w1_0.lat))*cos((2.3488-w1_0.lng)))))*6371)<=25;

    // @Query("SELECT wc FROM WorldCity wc WHERE wc.nom = :city AND wc.pays = :country AND FUNCTION('acos', FUNCTION('sin', :lat) * FUNCTION('sin', wc.lat) + FUNCTION('cos', :lat) * FUNCTION('cos', wc.lat) * FUNCTION('cos', :lng - wc.lng)) * 6371 <= 25")

    //SELECT c1.city, c1.country, c1.lat, c1.lng, c2.city AS same_name_city, c2.country AS same_name_city_country, c2.lat AS same_name_city_lat, c2.lng AS same_name_city_lng FROM worldcities c1 LEFT JOIN worldcities c2 ON c1.city = c2.city AND c1.id <> c2.id WHERE (6371 * ACOS(COS(RADIANS(c1.lat)) * COS(RADIANS(c1.lng)) * COS(RADIANS(c2.lat)) * COS(RADIANS(c2.lng)) + COS(RADIANS(c1.lat)) * SIN(RADIANS(c1.lng)) * COS(RADIANS(c2.lat)) * SIN(RADIANS(c2.lng)) + SIN(RADIANS(c1.lat)) * SIN(RADIANS(c2.lat)))) <= 25 ORDER BY c1.city;

    @Query("SELECT wc FROM WorldCity wc WHERE wc.city = :city AND wc.country = :country AND FUNCTION('acos', FUNCTION('sin', :lat) * FUNCTION('sin', wc.lat) + FUNCTION('cos', :lat) * FUNCTION('cos', wc.lat) * FUNCTION('cos', :lng - wc.lng)) * 6371 <= 25")
    WorldCity findWorldCityByCityAndCountryAndCoords(String city, String country, Float lat, Float lng);

    default WorldCity saveNewCity(WorldCity worldCity) {
        WorldCity existingCity = findWorldCityByCityAndCountryAndCoords(worldCity.getCity(), worldCity.getCountry(), worldCity.getLat(), worldCity.getLng());

        if (existingCity == null) {
            WorldCity newCity = new WorldCity(worldCity.getCity(), worldCity.getCity_ascii(), worldCity.getLat(), worldCity.getLng(), worldCity.getCountry(), worldCity.getIso2());
            return save(newCity);
        } else return null;
    }

}
