package com.example.travelbuddybackend.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Currency;

@Entity
@Table(name="trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="description")
    private String description;

    @Column(name="end_date")
    private LocalDate endDate;

    @Column(name="start_date")
    private LocalDate startDate;

    @Column(name="title")
    private String title;

    @Column(name="currency")
    private Currency currency;

    @Column(name="total_cost", precision=10, scale=2)
    private double totalCost;

    @Column(name="uniqueLink")
    private String uniqueLink;

    @ManyToOne(optional = false)
    private User user;

    public Trip() {

    }

    public Trip(
            long id,
            String title,
            LocalDate startDate,
            LocalDate endDate,
            Currency currency,
            double totalCost,
            String description,
            String uniqueLink,
            User user
    ) {
        super();
        this.currency = currency;
        this.id = id;
        this.description = description;
        this.endDate = endDate;
        this.startDate = startDate;
        this.title = title;
        this.totalCost = totalCost;
        this.uniqueLink = uniqueLink;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public String getUniqueLink() {
        return uniqueLink;
    }

    public void setUniqueLink(String uniqueLink) {
        this.uniqueLink = uniqueLink;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
