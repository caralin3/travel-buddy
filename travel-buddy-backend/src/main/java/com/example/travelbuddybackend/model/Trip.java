package com.example.travelbuddybackend.model;

import javax.persistence.*;
import java.util.Currency;
import java.util.Date;

@Entity
@Table(name="trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="description")
    private String description;

    @Column(name="end_date")
    private Date endDate;

    @Column(name="start_date")
    private Date startDate;

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

    public Trip(long id, String description, Date endDate, Date startDate, String title, Currency currency, double totalCost, String uniqueLink) {
        super();
        this.currency = currency;
        this.id = id;
        this.description = description;
        this.endDate = endDate;
        this.startDate = startDate;
        this.title = title;
        this.totalCost = totalCost;
        this.uniqueLink = uniqueLink;
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

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
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
}
