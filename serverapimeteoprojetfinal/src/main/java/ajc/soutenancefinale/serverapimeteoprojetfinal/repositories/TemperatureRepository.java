package ajc.soutenancefinale.serverapimeteoprojetfinal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.Temperature;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature, Long> {

}
