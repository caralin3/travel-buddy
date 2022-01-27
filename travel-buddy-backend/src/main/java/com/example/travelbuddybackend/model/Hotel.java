package com.example.travelbuddybackend.model;

import com.example.travelbuddybackend.constants.Messages;
import com.example.travelbuddybackend.model.type.RoomType;
import com.example.travelbuddybackend.model.type.State;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

@Entity
@Table(name="hotel")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Enumerated(EnumType.ORDINAL)
    @Column(name="room_type")
    private RoomType roomType;

    @Column(name="room_count")
    private int roomCount;

    @Column(name="check_in_date")
    private LocalDate checkInDate;

    @Column(name="check_out_date")
    private LocalDate checkOutDate;

    @Column(name="cost", precision=10, scale=2)
    private double cost;

    @Column(name="currency")
    private Currency currency;

    @Column(name="address_line_1")
    private String addressLine1;

    @Column(name="address_line_2")
    private String addressLine2;

    @Column(name="city")
    private String city;

    @Column(name="state")
    private String state;

    @Column(name="country")
    private String country;

    @Column(name="postal_code")
    private String postalCode;

    @ManyToOne(optional = false)
    private Trip trip;

    public Hotel() {
    }

    public Hotel(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.description = builder.description;
        this.roomType = builder.roomType;
        this.roomCount = builder.roomCount;
        this.checkInDate = builder.checkInDate;
        this.checkOutDate = builder.checkOutDate;
        this.cost = builder.cost;
        this.currency = builder.currency;
        this.addressLine1 = builder.addressLine1;
        this.addressLine2 = builder.addressLine2;
        this.city = builder.city;
        this.state = builder.state;
        this.country = builder.country;
        this.postalCode = builder.postalCode;
        this.trip = builder.trip;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public double getCost() {
        return cost;
    }

    public Currency getCurrency() {
        return currency;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
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

    public String getPostalCode() {
        return postalCode;
    }

    public Trip getTrip() {
        return trip;
    }

    @Override
    public String toString() {
        return "Hotel{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", roomType=" + roomType +
                ", roomCount=" + roomCount +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", cost=" + cost +
                ", currency=" + currency +
                ", addressLine1='" + addressLine1 + '\'' +
                ", addressLine2='" + addressLine2 + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", trip=" + trip.getId();
    }

    public static class Builder {
        private long id;
        private String name;
        private String description;
        private RoomType roomType;
        private int roomCount;
        private LocalDate checkInDate;
        private LocalDate checkOutDate;
        private double cost;
        private Currency currency;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String country;
        private String postalCode;
        private Trip trip;

        public Builder() {
        }

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setRoomType(RoomType roomType) {
            this.roomType = roomType;
            return this;
        }

        public Builder setRoomCount(int roomCount) {
            this.roomCount = roomCount;
            return this;
        }

        public Builder setCheckInDate(LocalDate checkInDate) {
            this.checkInDate = checkInDate;
            return this;
        }

        public Builder setCheckOutDate(LocalDate checkOutDate) {
            this.checkOutDate = checkOutDate;
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

        public Builder setAddressLine1(String addressLine1) {
            this.addressLine1 = addressLine1;
            return this;
        }

        public Builder setAddressLine2(String addressLine2) {
            this.addressLine2 = addressLine2;
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

        public Builder setPostalCode(String postalCode) {
            this.postalCode = postalCode;
            return this;
        }

        public Builder setTrip(Trip trip) {
            this.trip = trip;
            return this;
        }

        // build method to deal with outer class
        // to return outer instance
        public Hotel build() {
            this.validate();
            return new Hotel(this);
        }

        public void validate() throws IllegalStateException {
            List<String> msgs = new ArrayList<>();
            if (name == null) {
                msgs.add(Messages.VALIDATION.NULL_NAME);
            }
            if (currency == null) {
                msgs.add(Messages.VALIDATION.NULL_CURRENCY);
            }
            if (checkInDate == null) {
                msgs.add(Messages.VALIDATION.NULL_CHECK_IN_DATE);
            } else if (checkInDate.isAfter(checkOutDate)) {
                msgs.add(Messages.VALIDATION.INVALID_CHECK_IN_DATE);
            }
            if (checkOutDate == null) {
                msgs.add(Messages.VALIDATION.NULL_CHECK_OUT_DATE);
            } else if (checkOutDate.isBefore(checkInDate)) {
                msgs.add(Messages.VALIDATION.INVALID_CHECK_OUT_DATE);
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
