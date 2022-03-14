package com.example.travelbuddybackend.api.response;

import com.example.travelbuddybackend.api.model.UserDetails;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Schema(description = "Trip response.")
public class TripResponse {

    @Schema(description = "Id of trip")
    protected long id;
    
    @Schema(description = "Description of trip")
    protected String description;

    @Schema(description = "End date of trip")
    protected LocalDate endDate;

    @Schema(description = "Start date of trip")
    protected LocalDate startDate;

    @Schema(description = "Title of trip")
    protected String title;

    @Schema(description = "Unique shareable link of trip")
    protected String uniqueLink;

    @Schema(description = "Trip owner details")
    protected UserDetails user;

    public TripResponse() {
    }

    public TripResponse(ResponseBuilder builder) {
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

    public UserDetails getUser() {
        return user;
    }

    public static ResponseBuilder builder() {
        return new ResponseBuilder();
    }

    public static final class ResponseBuilder {
        private long id;
        private String description;
        private LocalDate endDate;
        private LocalDate startDate;
        private String title;
        private String uniqueLink;
        private UserDetails user;

        private ResponseBuilder() {
        }

        public ResponseBuilder setId(long id) {
            this.id = id;
            return this;
        }

        public ResponseBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public ResponseBuilder setEndDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }

        public ResponseBuilder setStartDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }

        public ResponseBuilder setTitle(String title) {
            this.title = title;
            return this;
        }

        public ResponseBuilder setUniqueLink(String uniqueLink) {
            this.uniqueLink = uniqueLink;
            return this;
        }

        public ResponseBuilder setUser(UserDetails user) {
            this.user = user;
            return this;
        }

        public TripResponse build() {
            return new TripResponse(this);
        }
    }
}
