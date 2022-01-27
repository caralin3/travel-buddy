package com.example.travelbuddybackend.model;

import com.example.travelbuddybackend.constants.Messages;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

@Entity
@Table(name="activity")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name="title")
    private String title;

    @Column(name="company")
    private String company;

    @Column(name="description")
    private String description;

    @Column(name="start_date")
    private LocalDateTime startDate;

    @Column(name="end_date")
    private LocalDateTime endDate;

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
    
    @ManyToOne
    private Port port;

    @ManyToOne
    private Cruise cruise;

    public Activity() {
    }

    public Activity(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.company = builder.company;
        this.description = builder.description;
        this.startDate = builder.startDate;
        this.endDate = builder.endDate;
        this.cost = builder.cost;
        this.currency = builder.currency;
        this.addressLine1 = builder.addressLine1;
        this.addressLine2 = builder.addressLine2;
        this.city = builder.city;
        this.state = builder.state;
        this.country = builder.country;
        this.postalCode = builder.postalCode;
        this.trip = builder.trip;
        this.port = builder.port;
        this.cruise = builder.cruise;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCompany() {
        return company;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
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

    public Port getPort() {
        return port;
    }

    public Cruise getCruise() {
        return cruise;
    }

    @Override
    public String toString() {
        return "Activity: " +
                "id=" + id +
                ", title='" + title + '\'' +
                ", company='" + company + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", cost=" + cost +
                ", currency=" + currency +
                ", addressLine1='" + addressLine1 + '\'' +
                ", addressLine2='" + addressLine2 + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", trip=" + trip.getId() +
                ", port=" + port.getId() +
                ", cruise=" + cruise.getId();
    }

    public static class Builder {
        private long id;
        private String title;
        private String company;
        private String description;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private double cost;
        private Currency currency;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String country;
        private String postalCode;
        private Trip trip;
        private Port port;
        private Cruise cruise;

        public Builder() {
        }

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setCompany(String company) {
            this.company = company;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setStartDate(LocalDateTime startDate) {
            this.startDate = startDate;
            return this;
        }

        public Builder setEndDate(LocalDateTime endDate) {
            this.endDate = endDate;
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

        public Builder setPort(Port port) {
            this.port = port;
            return this;
        }

        public Builder setCruise(Cruise cruise) {
            this.cruise = cruise;
            return this;
        }

        // build method to deal with outer class
        // to return outer instance
        public Activity build() {
            this.validate();
            return new Activity(this);
        }

        private void validate() throws IllegalStateException {
            List<String> msgs = new ArrayList<>();
            if (title == null) {
                msgs.add(Messages.VALIDATION.NULL_TITLE);
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
