import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTrips, type Trip } from "../api/tripApi";
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
  },
});

export const fetchTripsAsync = createAsyncThunk("trip/fetchTrips", async () => {
  const trips = await fetchTrips();
  return trips;
});

export default tripSlice.reducer;
