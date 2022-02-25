package com.example.travelbuddybackend.model;

import com.example.travelbuddybackend.constants.Messages;
import com.example.travelbuddybackend.model.enums.RoomType;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

@Entity
@Table(name="cruise")
public class Cruise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="cruise_line")
    private String cruiseLine;

    @Column(name="ship_name")
    private String shipName;

    @Column(name="cost", precision=10, scale=2)
    private double cost;

    @Column(name="currency")
    private Currency currency;

    @Column(name="cabin_number")
    private String cabinNumber;

    @Column(name="cabin_type")
    private RoomType cabinType;

    @Column(name="start_date")
    private LocalDate startDate;

    @Column(name="end_date")
    private LocalDate endDate;

    @Column(name="departure_city")
    private String departureCity;

    @Column(name="departure_state")
    private String departureState;

    @Column(name="departure_country")
    private String departureCountry;

    @Column(name="destination_city")
    private String destinationCity;

    @Column(name="destination_state")
    private String destinationState;

    @Column(name="destination_country")
    private String destinationCountry;

    @Column(name="round_trip")
    private boolean roundTrip;

    @ManyToOne(optional = false)
    private Trip trip;

    public Cruise() {
    }

    public Cruise(Builder builder) {
        this.id = builder.id;
        this.cruiseLine = builder.cruiseLine;
        this.shipName = builder.shipName;
        this.cost = builder.cost;
        this.currency = builder.currency;
        this.cabinNumber = builder.cabinNumber;
        this.cabinType = builder.cabinType;
        this.startDate = builder.startDate;
        this.endDate = builder.endDate;
        this.departureCity = builder.departureCity;
        this.departureState = builder.departureState;
        this.departureCountry = builder.departureCountry;
        this.destinationCity = builder.destinationCity;
        this.destinationState = builder.destinationState;
        this.destinationCountry = builder.destinationCountry;
        this.roundTrip = builder.roundTrip;
        this.trip = builder.trip;
    }

    public long getId() {
        return id;
    }

    public String getCruiseLine() {
        return cruiseLine;
    }

    public String getShipName() {
        return shipName;
    }

    public double getCost() {
        return cost;
    }

    public Currency getCurrency() {
        return currency;
    }

    public String getCabinNumber() {
        return cabinNumber;
    }

    public RoomType getCabinType() {
        return cabinType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public String getDepartureState() {
        return departureState;
    }

    public String getDepartureCountry() {
        return departureCountry;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public String getDestinationState() {
        return destinationState;
    }

    public String getDestinationCountry() {
        return destinationCountry;
    }

    public boolean isRoundTrip() {
        return roundTrip;
    }

    public Trip getTrip() {
        return trip;
    }

    @Override
    public String toString() {
        return "Cruise: " +
                "id=" + id +
                ", cruiseLine='" + cruiseLine + '\'' +
                ", shipName='" + shipName + '\'' +
                ", cost=" + cost +
                ", currency=" + currency +
                ", cabinNumber='" + cabinNumber + '\'' +
                ", cabinType=" + cabinType +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", departureCity='" + departureCity + '\'' +
                ", departureState='" + departureState + '\'' +
                ", departureCountry='" + departureCountry + '\'' +
                ", destinationCity='" + destinationCity + '\'' +
                ", destinationState='" + destinationState + '\'' +
                ", destinationCountry='" + destinationCountry + '\'' +
                ", roundTrip=" + roundTrip +
                ", trip=" + trip;
    }

    public static class Builder {
        private long id;
        private String cruiseLine;
        private String shipName;
        private double cost;
        private Currency currency;
        private String cabinNumber;
        private RoomType cabinType;
        private LocalDate startDate;
        private LocalDate endDate;
        private String departureCity;
        private String departureState;
        private String departureCountry;
        private String destinationCity;
        private String destinationState;
        private String destinationCountry;
        private boolean roundTrip;
        private Trip trip;

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setCruiseLine(String cruiseLine) {
            this.cruiseLine = cruiseLine;
            return this;
        }

        public Builder setShipName(String shipName) {
            this.shipName = shipName;
            return this;
        }

        public Builder setCost(double cost) {
            this.cost = cost;
            return this;
        }

        public Builder setCurrency(Currency currency) {
            this.currency = currency;
            return this;
        }

        public Builder setCabinNumber(String cabinNumber) {
            this.cabinNumber = cabinNumber;
            return this;
        }

        public Builder setCabinType(RoomType cabinType) {
            this.cabinType = cabinType;
            return this;
        }

        public Builder setStartDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }

        public Builder setEndDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }

        public Builder setDepartureCity(String departureCity) {
            this.departureCity = departureCity;
            return this;
        }

        public Builder setDepartureState(String departureState) {
            this.departureState = departureState;
            return this;
        }

        public Builder setDepartureCountry(String departureCountry) {
            this.departureCountry = departureCountry;
            return this;
        }

        public Builder setDestinationCity(String destinationCity) {
            this.destinationCity = destinationCity;
            return this;
        }

        public Builder setDestinationState(String destinationState) {
            this.destinationState = destinationState;
            return this;
        }

        public Builder setDestinationCountry(String destinationCountry) {
            this.destinationCountry = destinationCountry;
            return this;
        }

        public Builder setRoundTrip(boolean roundTrip) {
            this.roundTrip = roundTrip;
            return this;
        }

        public Builder setTrip(Trip trip) {
            this.trip = trip;
            return this;
        }

        // build method to deal with outer class
        // to return outer instance
        public Cruise build() {
            this.validate();
            return new Cruise(this);
        }

        public void validate() throws IllegalStateException {
            List<String> msgs = new ArrayList<>();
            if (cruiseLine == null) {
                msgs.add(Messages.VALIDATION.NULL_CRUISE_LINE);
            }
            if (cabinType == null) {
                msgs.add(Messages.VALIDATION.NULL_CABIN_TYPE);
            }
            if (cabinNumber == null) {
                msgs.add(Messages.VALIDATION.NULL_CABIN_NUMBER);
            }
            if (departureCity == null) {
                msgs.add(Messages.VALIDATION.NULL_DEPARTURE_CITY);
            }
            if (shipName == null) {
                msgs.add(Messages.VALIDATION.NULL_SHIP_NAME);
            }
            if (currency == null) {
                msgs.add(Messages.VALIDATION.NULL_CURRENCY);
            }
            if (startDate == null) {
                msgs.add(Messages.VALIDATION.NULL_START_DATE);
            } else if (startDate.isAfter(endDate)) {
                msgs.add(Messages.VALIDATION.INVALID_START_DATE);
            }
            if (endDate == null) {
                msgs.add(Messages.VALIDATION.NULL_END_DATE);
            } else if (endDate.isBefore(startDate)) {
                msgs.add(Messages.VALIDATION.INVALID_END_DATE);
            }
            if (trip == null) {
                msgs.add(Messages.VALIDATION.NULL_TRIP);
            }
            if (msgs.size() > 0) {
                throw new IllegalStateException(msgs.toString());
            }
        }
    }
}
