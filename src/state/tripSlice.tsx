import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteTrip,
  fetchTrips,
  postTrip,
  type Trip,
  type CreateTripRequest,
} from "../api/tripApi";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

const initialState: TripState = {
  trips: [],
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTripsAsync.fulfilled,
      (state, action: PayloadAction<Trip[]>) => {
        state.trips = action.payload;
        state.loading = false;
        state.error = null;
      },
    );
    builder.addCase(fetchTripsAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTripsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch trips";
    });
    builder.addCase(
      postTripAsync.fulfilled,
      (state, action: PayloadAction<Trip>) => {
        state.trips.push(action.payload);
        state.loading = false;
        state.error = null;
      },
    );
    builder.addCase(
      deleteTripAsync.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.trips = state.trips.filter((trip) => trip.id !== action.payload);
        state.loading = false;
        state.error = null;
      },
    );
  },
});

export const fetchTripsAsync = createAsyncThunk("trip/fetchTrips", async () => {
  const trips = await fetchTrips();
  return trips;
});

export const postTripAsync = createAsyncThunk(
  "trip/postTrip",
  async (trip: CreateTripRequest) => {
    const newTrip = await postTrip(trip);
    return newTrip;
  },
);

export const deleteTripAsync = createAsyncThunk(
  "trip/deleteTrip",
  async (id: string) => {
    await deleteTrip(id);
    return id;
  },
);

export default tripSlice.reducer;
