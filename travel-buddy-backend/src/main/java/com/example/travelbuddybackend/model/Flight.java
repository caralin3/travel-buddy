package com.example.travelbuddybackend.model;

import com.example.travelbuddybackend.model.type.FlightClass;
import com.example.travelbuddybackend.model.type.FlightType;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Currency;

@Entity
@Table(name="flight")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="flight_number")
    private String flightNumber;

    @Column(name="airline")
    private String airline;

    @Column(name="airport_code")
    private String airportCode;

    @Column(name="terminal")
    private String terminal;

    @Column(name="gate")
    private String gate;

    @Column(name="seats")
    private String seats;

    @Column(name="scheduled_date")
    private LocalDateTime scheduledDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name="type")
    private FlightType type;

    @Enumerated(EnumType.ORDINAL)
    @Column(name="flight_class")
    private FlightClass flightClass;

    @Column(name="currency")
    private Currency currency;

    @Column(name="cost", precision=10, scale=2)
    private double cost;

    @ManyToOne(optional = false)
    private Trip trip;

    public Flight() {
    }

    public Flight(Builder builder) {
        this.id = builder.id;
        this.flightNumber = builder.flightNumber;
        this.airline = builder.airline;
        this.airportCode = builder.airportCode;
        this.scheduledDate = builder.scheduledDate;
        this.type = builder.type;
        this.flightClass = builder.flightClass;
        this.cost = builder.cost;
        this.currency = builder.currency;
        this.terminal = builder.terminal;
        this.gate = builder.gate;
        this.seats = builder.seats;
        this.trip = builder.trip;
    }
    public long getId() {
        return id;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public String getAirline() {
        return airline;
    }

    public String getAirportCode() {
        return airportCode;
    }

    public String getTerminal() {
        return terminal;
    }

    public String getGate() {
        return gate;
    }

    public String getSeats() {
        return seats;
    }

    public LocalDateTime getScheduledDate() {
        return scheduledDate;
    }

    public FlightType getType() {
        return type;
    }

    public FlightClass getFlightClass() {
        return flightClass;
    }

    public Currency getCurrency() {
        return currency;
    }

    public double getCost() {
        return cost;
    }

    public Trip getTrip() {
        return trip;
    }

    @Override
    public String toString() {
        return "Flight: " +
                "id=" + id +
                ", flightNumber='" + flightNumber + '\'' +
                ", airline='" + airline + '\'' +
                ", airportCode='" + airportCode + '\'' +
                ", terminal='" + terminal + '\'' +
                ", gate='" + gate + '\'' +
                ", seats='" + seats + '\'' +
                ", scheduledDate=" + scheduledDate +
                ", type=" + type +
                ", flightClass=" + flightClass +
                ", currency=" + currency +
                ", cost=" + cost +
                '}';
    }

    public static class Builder {
        private long id;
        private String flightNumber;
        private String airline;
        private String airportCode;
        private String terminal;
        private String gate;
        private String seats;
        private LocalDateTime scheduledDate;
        private FlightType type;
        private FlightClass flightClass;
        private Currency currency;
        private double cost;
        private Trip trip;

        public Builder() {
        }

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setFlightNumber(String flightNumber) {
            this.flightNumber = flightNumber;
            return this;
        }

        public Builder setAirline(String airline) {
            this.airline = airline;
            return this;
        }

        public Builder setAirportCode(String airportCode) {
            this.airportCode = airportCode;
            return this;
        }

        public Builder setTerminal(String terminal) {
            this.terminal = terminal;
            return this;
        }

        public Builder setGate(String gate) {
            this.gate = gate;
            return this;
        }


        public Builder setSeats(String seats) {
            this.seats = seats;
            return this;
        }

        public Builder setScheduledDate(LocalDateTime scheduledDate) {
            this.scheduledDate = scheduledDate;
            return this;
        }

        public Builder setType(FlightType type) {
            this.type = type;
            return this;
        }

        public Builder setFlightClass(FlightClass flightClass) {
            this.flightClass = flightClass;
            return this;
        }

        public Builder setCurrency(Currency currency) {
            this.currency = currency;
            return this;
        }

        public Builder setCost(double cost) {
            this.cost = cost;
            return this;
        }

        public Builder setTrip(Trip trip) {
            this.trip = trip;
            return this;
        }

        // build method to deal with outer class
        // to return outer instance
        public Flight build() {
            return new Flight(this);
        }
    }
}
