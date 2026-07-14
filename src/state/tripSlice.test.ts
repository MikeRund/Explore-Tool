import reducer, {
  fetchTripsAsync,
  postTripAsync,
  deleteTripAsync,
  updateTripAsync,
} from "./tripSlice";
import type { Trip, CreateTripRequest } from "../api/tripApi";

describe("tripSlice", () => {
  const moroccoTrip: Trip = {
    id: "1",
    title: "Morocco",
    description: "Trip to Morocco",
    date: "2024-01-01",
    itineraryItems: [],
    packingList: [],
    image: "/images/morocco.jpg",
  };

  const portugalTrip: Trip = {
    id: "2",
    title: "Portugal",
    description: "Surf Trip",
    date: "2024-02-01",
    itineraryItems: [],
    packingList: [],
    image: "/images/portugal.jpg",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      trips: [],
      loading: false,
      error: null,
    });
  });

  it("should handle fetchTripsAsync.pending", () => {
    const state = reducer(undefined, fetchTripsAsync.pending("", undefined));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle fetchTripsAsync.fulfilled", () => {
    const state = reducer(
      undefined,
      fetchTripsAsync.fulfilled([moroccoTrip, portugalTrip], "", undefined),
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.trips).toHaveLength(2);
    expect(state.trips).toEqual([moroccoTrip, portugalTrip]);
  });

  it("should handle fetchTripsAsync.rejected", () => {
    const state = reducer(
      undefined,
      fetchTripsAsync.rejected(new Error("Network Error"), "", undefined),
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network Error");
  });

  it("should handle postTripAsync.fulfilled", () => {
    const previousState = {
      trips: [moroccoTrip],
      loading: true,
      error: "Old error",
    };

    const request: CreateTripRequest = {
      title: portugalTrip.title,
      description: portugalTrip.description,
      date: portugalTrip.date,
      itineraryItems: [],
      packingList: [],
      image: portugalTrip.image,
    };

    const state = reducer(
      previousState,
      postTripAsync.fulfilled(portugalTrip, "", request),
    );

    expect(state.trips).toHaveLength(2);
    expect(state.trips[1]).toEqual(portugalTrip);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle deleteTripAsync.fulfilled", () => {
    const previousState = {
      trips: [moroccoTrip, portugalTrip],
      loading: true,
      error: "Old error",
    };

    const state = reducer(
      previousState,
      deleteTripAsync.fulfilled("2", "", "2"),
    );

    expect(state.trips).toHaveLength(1);
    expect(state.trips[0]).toEqual(moroccoTrip);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle updateTripAsync.fulfilled", () => {
    const previousState = {
      trips: [moroccoTrip, portugalTrip],
      loading: true,
      error: "Old error",
    };

    const updatedTrip: Trip = {
      ...portugalTrip,
      title: "Portugal Updated",
    };

    const state = reducer(
      previousState,
      updateTripAsync.fulfilled(updatedTrip, "", updatedTrip),
    );

    expect(state.trips).toHaveLength(2);
    expect(state.trips[0]).toEqual(moroccoTrip);
    expect(state.trips[1]).toEqual(updatedTrip);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
