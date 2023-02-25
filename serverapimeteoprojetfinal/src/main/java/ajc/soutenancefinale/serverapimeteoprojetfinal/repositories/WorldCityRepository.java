package ajc.soutenancefinale.serverapimeteoprojetfinal.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.WorldCity;

@Repository
public interface WorldCityRepository extends JpaRepository<WorldCity, Long> {
    //
    // @Query("SELECT wc FROM WorldCity wc WHERE wc.nom = :city AND wc.pays = :country AND FUNCTION('acos', FUNCTION('sin', :lat) * FUNCTION('sin', wc.lat) + FUNCTION('cos', :lat) * FUNCTION('cos', wc.lat) * FUNCTION('cos', :lng - wc.lng)) * 6371 <= 25")

    @Query("SELECT wc FROM WorldCity wc WHERE wc.city = :city AND wc.country = :country AND FUNCTION('acos', FUNCTION('sin', :lat) * FUNCTION('sin', wc.lat) + FUNCTION('cos', :lat) * FUNCTION('cos', wc.lat) * FUNCTION('cos', :lng - wc.lng)) * 6371 <= 25")
    WorldCity findWorldCityByCityAndCountryAndCoords(String city, String country, Float lat, Float lng);

}
