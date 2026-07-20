# Explore Tool - Architecture & Development Notes

## Purpose
This mini CRUD project was to have a play with the techstack:

- React
- Typescript
- Redux
- Jest

## Demo

https://github.com/user-attachments/assets/5ea28735-42c9-443d-a60a-c5d41f9ee5d6


## Local Setup

- cd .\src\api\mock-api\
- json-server --watch db.json --port 3000
- npm run dev

## Overview

Explore Tool is a React + TypeScript travel planning application that allows users to:

- View trips
- Create new trips
- Delete trips
- Update existing trips
- View individual trip pages
- Edit trip details
- Manage itinerary and packing list items

The application uses a modern frontend architecture:

- React for UI components
- TypeScript for type safety
- Redux Toolkit for global state management
- Redux Thunk (`createAsyncThunk`) for asynchronous API calls
- Axios for HTTP requests
- JSON Server as a temporary backend
- Jest for testing

---

# Project Architecture

## High-Level Flow

```
React Component
       |
       |
 dispatch(action)
       |
       |
Redux Async Thunk
       |
       |
API Layer (Axios)
       |
       |
Backend / JSON Server
       |
       |
Response
       |
       |
Reducer updates Redux Store
       |
       |
React re-renders from state
```

The application separates responsibilities:

```
src
|
├── api
|   └── tripApi.ts          # HTTP requests
|
├── components
|   ├── TripCard.tsx        # Trip preview card
|   ├── EditableField.tsx   # Reusable editable text
|   └── TodoComponent.tsx   # Itinerary/packing lists
|
├── pages
|   ├── HomePage.tsx
|   ├── TripPage.tsx
|   └── AddTripModal.tsx
|
├── state
|   ├── store.ts
|   └── tripSlice.ts
|
└── tests
    └── tripSlice.test.ts
```

---

# TypeScript Decisions

## Shared Types

Trip data is represented using a shared interface.

Example:

```typescript
export interface Trip {
  id: string;
  title: string;
  description: string;
  date: string;
  itineraryItems: TodoItem[];
  packingList: TodoItem[];
  image?: string;
}
```

Optional properties are used when values are not always available.

For example:

```typescript
image?: string;
```

because newly created trips may not immediately have an image.

---

## Create Request Types

A separate type was created for creating trips:

```typescript
export type CreateTripRequest = Omit<Trip, "id">;
```

Reason:

The frontend does not generate IDs.

The backend generates IDs when a POST request is made.

Example:

Frontend sends:

```json
{
  "title": "Surf Trip",
  "description": "A surfing adventure"
}
```

Backend responds:

```json
{
  "id": "abc123",
  "title": "Surf Trip",
  "description": "A surfing adventure"
}
```

This prevents accidentally sending fake IDs.

---

# API Layer

The API layer is responsible only for communication.

Example:

```typescript
const postTrip = async (trip: CreateTripRequest): Promise<Trip> => {
  const response = await axios.post(API_BASE_URL, trip);
  return response.data;
};
```

The API layer does not modify Redux state.

Its only responsibility:

```
Request -> Response
```

---

# Redux Store

Redux stores application-wide state.

Current state:

```typescript
interface TripState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}
```

Example:

```typescript
{
  trips: [
    {
      id: "123",
      title: "Morocco"
    }
  ],
  loading: false,
  error: null
}
```

---

# Redux Slice

Created using Redux Toolkit:

```typescript
createSlice();
```

A slice combines:

- State
- Reducers
- Actions

Example:

```typescript
const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
```

---

# Why Reducers Is Empty

Originally:

```typescript
reducers: {
}
```

seemed unusual.

However, the application uses API-driven updates.

Therefore, state changes are triggered by asynchronous requests.

These are handled using:

```typescript
extraReducers;
```

rather than manual reducers.

---

# Redux Async Thunks

Async thunks handle API calls.

Example:

```typescript
export const fetchTripsAsync = createAsyncThunk("trip/fetchTrips", async () => {
  const trips = await fetchTrips();
  return trips;
});
```

The thunk lifecycle:

```
dispatch(fetchTripsAsync())

        |
        v

pending

        |
        v

API request

        |
        v

fulfilled OR rejected
```

---

# Extra Reducers

Extra reducers listen for thunk results.

Example:

```typescript
builder.addCase(fetchTripsAsync.fulfilled, (state, action) => {
  state.trips = action.payload;
});
```

Meaning:

> When `fetchTripsAsync` succeeds, replace trips in Redux with the returned data.

---

# Fetch Trips

## Pending

```typescript
state.loading = true;
```

The UI can show a spinner.

---

## Fulfilled

```typescript
state.trips = action.payload;
state.loading = false;
```

The API response becomes Redux state.

---

## Rejected

```typescript
state.error = action.error.message;
```

The UI can display an error.

---

# CRUD Redux Behaviour

## Create Trip

Flow:

```
User submits modal

        |
        v

dispatch(postTripAsync)

        |
        v

POST request

        |
        v

Backend generates ID

        |
        v

fulfilled reducer

        |
        v

state.trips.push(newTrip)
```

Reducer:

```typescript
state.trips.push(action.payload);
```

---

## Delete Trip

Flow:

```
User clicks delete

        |
        v

dispatch(deleteTripAsync(id))

        |
        v

DELETE request

        |
        v

fulfilled

        |
        v

remove from Redux
```

Reducer:

```typescript
state.trips = state.trips.filter((trip) => trip.id !== action.payload);
```

---

## Update Trip

Reducer:

```typescript
const index = state.trips.findIndex((trip) => trip.id === action.payload.id);

state.trips[index] = action.payload;
```

Reason:

Find the existing object and replace it with the updated API response.

---

# Component State vs Redux State

Important design decision:

## Redux Owns Shared Server Data

Examples:

- Trips
- Trip details
- Saved itinerary items

## Local Component State Owns Temporary UI State

Examples:

- Is modal open?
- Is text field being edited?
- Current input value

---

# Controlled Components

Originally:

```
TripHeader
 |
 owns title state
```

Problem:

TripPage could not save changes.

Solution:

Lift state upward.

New pattern:

```
TripPage

owns:

editedTrip state


      |
      |

TripHeader

      |
      |

EditableField
```

The child receives:

```typescript
value;
onChange;
```

Example:

```typescript
<EditableField
  value={editedTrip.title}
  onChange={updateTitle}
/>
```

This keeps the source of truth in `TripPage`.

---

# Todo Component Design

Originally:

```
TodoComponent owns todos
```

Problem:

Parent cannot save changes.

Updated design:

```
TripPage
 |
 owns itinerary state
 |
 TodoComponent
```

TodoComponent receives:

```typescript
todos;
onChange;
```

This allows:

- Add item
- Remove item
- Toggle completion

while keeping changes inside the editable trip object.

---

# Testing Strategy

Jest was added with:

- Jest
- ts-jest
- Testing Library

Tests currently focus on Redux behaviour.

The main pattern:

```
Arrange

Create initial state


Act

Dispatch thunk


Assert

Check resulting state
```

Example:

```typescript
expect(nextState.trips).toHaveLength(1);
expect(nextState.loading).toBe(false);
expect(nextState.error).toBe(null);
```

---

# Recommended Future Tests

## 1. Redux Slice Tests

High priority.

Test:

- Fetch success
- Fetch failure
- Create trip
- Delete trip
- Update trip

---

## 2. Component Tests

Using React Testing Library.

Examples:

### Add Trip Modal

Test:

- User enters values
- Clicks submit
- Dispatch occurs

---

### Trip Card

Test:

- Correct title displays
- Delete button calls delete action

---

### Trip Page

Test:

- Loads trip
- Updates fields
- Save button dispatches update thunk

---

## 3. API Tests

Lower priority.

Mock Axios requests.

Example:

```
axios.post
returns fake response

expect(postTrip())
returns expected trip
```

---

# Future Improvements

## Persist Redux State

Currently:

```
Refresh page

Redux resets

Fetch again
```

Possible solutions:

- Fetch trip on page load
- Redux Persist
- React Query

---

## Backend

JSON Server is currently used for development.

Future stack:

- Spring Boot backend
- PostgreSQL database
- Authentication
- Cloud storage for images

---

# Key Lessons Learned

- Redux should store shared application data, not every piece of state.
- Async thunks connect API calls to Redux state changes.
- Reducers describe how state changes after events.
- Controlled components make complex forms easier to manage.
- Parent components should own state when multiple children need access.
- TypeScript prevents many runtime bugs before execution.
- Good architecture makes adding features easier.
