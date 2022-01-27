package com.example.travelbuddybackend.model;

import com.example.travelbuddybackend.constants.Messages;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="port")
public class Port {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="day")
    private int day;

    @Column(name="description")
    private String description;

    @Column(name="arrival")
    private LocalDateTime arrival;

    @Column(name="departure")
    private LocalDateTime departure;

    @Column(name="city")
    private String city;

    @Column(name="state")
    private String state;

    @Column(name="country")
    private String country;

    @ManyToOne(optional = false)
    private Cruise cruise;

    public Port() {
    }

    public Port(Builder builder) {
        this.id = builder.id;
        this.day = builder.day;
        this.description = builder.description;
        this.arrival = builder.arrival;
        this.departure = builder.departure;
        this.city = builder.city;
        this.state = builder.state;
        this.country = builder.country;
        this.cruise = builder.cruise;
    }

    public long getId() {
        return id;
    }

    public int getDay() {
        return day;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getArrival() {
        return arrival;
    }

    public LocalDateTime getDeparture() {
        return departure;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getCountry() {
        return country;
    }

    public Cruise getCruise() {
        return cruise;
    }

    @Override
    public String toString() {
        return "Port: " +
                "id=" + id +
                ", day=" + day +
                ", description='" + description + '\'' +
                ", arrival=" + arrival +
                ", departure=" + departure +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", cruise=" + cruise.getId();
    }

    public static class Builder {
        private long id;
        private int day;
        private String description;
        private LocalDateTime arrival;
        private LocalDateTime departure;
        private String city;
        private String state;
        private String country;
        private Cruise cruise;

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setDay(int day) {
            this.day = day;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setArrival(LocalDateTime arrival) {
            this.arrival = arrival;
            return this;
        }

        public Builder setDeparture(LocalDateTime departure) {
            this.departure = departure;
            return this;
        }

        public Builder setCity(String city) {
            this.city = city;
            return this;
        }

        public Builder setState(String state) {
            this.state = state;
            return this;
        }

        public Builder setCountry(String country) {
            this.country = country;
            return this;
        }

        public Builder setCruise(Cruise cruise) {
            this.cruise = cruise;
            return this;
        }

        // build method to deal with outer class
        // to return outer instance
        public Port build() {
            this.validate();
            return new Port(this);
        }

        public void validate() throws IllegalStateException {
            List<String> msgs = new ArrayList<>();
            if (cruise == null) {
                msgs.add(Messages.VALIDATION.NULL_CRUISE);
            }
            if (day == 0) {
                msgs.add(Messages.VALIDATION.NULL_DAY);
            }
            if (city == null) {
                msgs.add(Messages.VALIDATION.NULL_CITY);
            }
            if (arrival == null) {
                msgs.add(Messages.VALIDATION.NULL_ARRIVAL);
            } else if (arrival.isAfter(departure)) {
                msgs.add(Messages.VALIDATION.INVALID_ARRIVAL);
            }
            if (departure == null) {
                msgs.add(Messages.VALIDATION.NULL_DEPARTURE);
            } else if (departure.isBefore(arrival)) {
                msgs.add(Messages.VALIDATION.INVALID_DEPARTURE);
            }
            if (msgs.size() > 0) {
                throw new IllegalStateException(msgs.toString());
            }
        }
    }
}
