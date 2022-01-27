package com.example.travelbuddybackend.model;

import com.example.travelbuddybackend.constants.Messages;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name="uniqueLink")
    private String uniqueLink;

    @ManyToOne(optional = false)
    private User user;

    public Trip() {
    }

    public Trip(Builder builder) {
        this.id = builder.id;
        this.description = builder.description;
        this.endDate = builder.endDate;
        this.startDate = builder.startDate;
        this.title = builder.title;
        this.uniqueLink = builder.uniqueLink;
        this.user = builder.user;
    }

    public long getId() {
        return id;
    }

    
    public String getDescription() {
        return description;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public String getTitle() {
        return title;
    }

    public String getUniqueLink() {
        return uniqueLink;
    }

    public User getUser() {
        return user;
    }

    @Override
    public String toString() {
        return "Trip: " +
                "id=" + id +
                ", description='" + description + '\'' +
                ", endDate=" + endDate +
                ", startDate=" + startDate +
                ", title='" + title + '\'' +
                ", uniqueLink='" + uniqueLink + '\'' +
                ", user=" + user.getFirstName() + 
                user.getLastName();
    }
    
    public static class Builder {
        private long id;
        private String description;
        private LocalDate endDate;
        private LocalDate startDate;
        private String title;
        private String uniqueLink;
        private User user;
        
        public Builder() {
        }

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setEndDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }

        public Builder setStartDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setUniqueLink(String uniqueLink) {
            this.uniqueLink = uniqueLink;
            return this;
        }

        public Builder setUser(User user) {
            this.user = user;
            return this;
        }

        // build method to deal with outer class
        // to return outer instance
        public Trip build() {
            this.validate();
            return new Trip(this);
        }

        private void validate() throws IllegalStateException {
            List<String> msgs = new ArrayList<>();
            if (user == null) {
                msgs.add(Messages.VALIDATION.NULL_USER);
            }
            if (title == null) {
                msgs.add(Messages.VALIDATION.NULL_TITLE);
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
            if (msgs.size() > 0) {
                throw new IllegalStateException(msgs.toString());
            }
        }
    }
}
