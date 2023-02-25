package ajc.soutenancefinale.serverapimeteoprojetfinal.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "worldcities")
public class WorldCity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String city;
	private String city_ascii;
	private Float lat;
	private Float lng;
	private String country;
	private String iso2;

	public WorldCity(String city, String city_ascii, Float lat, Float lng, String country, String iso2) {
		this.city = city;
		this.city_ascii = city_ascii;
		this.lat = lat;
		this.lng = lng;
		this.country = country;
		this.iso2 = iso2;
	}

	public WorldCity() {
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCity_ascii() {
		return city_ascii;
	}

	public void setCity_ascii(String city_ascii) {
		this.city_ascii = city_ascii;
	}

	public Float getLat() {
		return lat;
	}

	public void setLat(Float lat) {
		this.lat = lat;
	}

	public Float getLng() {
		return lng;
	}

	public void setLng(Float lng) {
		this.lng = lng;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getIso2() {
		return iso2;
	}

	public void setIso2(String iso2) {
		this.iso2 = iso2;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "WorldCity [id=" + id + ", city=" + city + ", city_ascii=" + city_ascii + ", lat=" + lat + ", lon=" + lng
				+ ", country=" + country + ", iso2=" + iso2 + "]";
	}

}
