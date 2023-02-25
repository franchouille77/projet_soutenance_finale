package ajc.soutenancefinale.serverapimeteoprojetfinal.servicies;

import java.util.List;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.Temperature;

public interface TemperatureServiceInterface {

	public List<Temperature> getAllTemperatures();

	public Temperature getTemperatureById(Long id);

	public Temperature addTemperature(Temperature temperature);

}
