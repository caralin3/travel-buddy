package com.example.travelbuddybackend.api.request;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Schema(description = "The request body for creating a trip.")
public class CreateTripRequest {

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

    @Schema(description = "User id of the owner of the trip")
    protected long userId;

    public CreateTripRequest() {}

    public CreateTripRequest(CreateTripRequestBuilder builder) {
        this.description = builder.description;
        this.endDate = builder.endDate;
        this.startDate = builder.startDate;
        this.title = builder.title;
        this.uniqueLink = builder.uniqueLink;
        this.userId = builder.userId;
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

    public long getUserId() {
        return userId;
    }

    public static CreateTripRequestBuilder builder() {
        return new CreateTripRequestBuilder();
    }

    public static final class CreateTripRequestBuilder {
        private String description;
        private LocalDate endDate;
        private LocalDate startDate;
        private String title;
        private String uniqueLink;
        private long userId;

        public CreateTripRequestBuilder() {
        }

        public CreateTripRequestBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public CreateTripRequestBuilder setEndDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }

        public CreateTripRequestBuilder setStartDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }

        public CreateTripRequestBuilder setTitle(String title) {
            this.title = title;
            return this;
        }

        public CreateTripRequestBuilder setUniqueLink(String uniqueLink) {
            this.uniqueLink = uniqueLink;
            return this;
        }

        public CreateTripRequestBuilder setUserId(long userId) {
            this.userId = userId;
            return this;
        }

        public CreateTripRequest build() {
            return new CreateTripRequest(this);
        }
    }
}
