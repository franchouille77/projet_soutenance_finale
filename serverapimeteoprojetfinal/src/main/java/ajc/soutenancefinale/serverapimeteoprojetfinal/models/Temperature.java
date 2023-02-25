package ajc.soutenancefinale.serverapimeteoprojetfinal.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "temperatures")
public class Temperature {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Float value;
	@Temporal(TemporalType.TIME)
	private Date timestamp;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "city_id", referencedColumnName = "id")
	private WorldCity worldCity;

	public Temperature(Float value, Date timestamp, WorldCity worldCity) {
		this.value = value;
		this.timestamp = timestamp;
		this.worldCity = worldCity;
	}

	public Temperature() {
	}

	public Long getId() {
		return id;
	}

	public Float getValue() {
		return value;
	}

	public void setValue(Float value) {
		this.value = value;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public WorldCity getWorldCity() {
		return worldCity;
	}

	public void setWorldCity(WorldCity worldCity) {
		this.worldCity = worldCity;
	}

	@Override
	public String toString() {
		return "Temperature [id=" + id + ", value=" + value + ", timestamp=" + timestamp + ", worldCity=" + worldCity
				+ "]";
	}

}
