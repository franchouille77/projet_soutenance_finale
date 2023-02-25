package ajc.soutenancefinale.serverapimeteoprojetfinal.servicies;

import java.util.List;

import org.springframework.stereotype.Service;

import ajc.soutenancefinale.serverapimeteoprojetfinal.models.Temperature;
import ajc.soutenancefinale.serverapimeteoprojetfinal.repositories.TemperatureRepository;

@Service
public class TemperatureService implements TemperatureServiceInterface {

	private TemperatureRepository temperatureRepository;

	public TemperatureService(TemperatureRepository temperatureRepository) {
		this.temperatureRepository = temperatureRepository;
	}

	@Override
	public List<Temperature> getAllTemperatures() {
		return temperatureRepository.findAll();
	}

	@Override
	public Temperature getTemperatureById(Long id) {
		return temperatureRepository.findById(id).get();
	}

	@Override
	public Temperature addTemperature(Temperature temperature) {
		return temperatureRepository.save(temperature);
	}

}
