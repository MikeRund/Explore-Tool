import axios from "axios";

export interface Trip {
  id: string;
  title: string;
  description: string;
  date: string;
  itineraryItems: string[];
  packingList: string[];
  image?: string;
}
export type CreateTripRequest = Omit<Trip, "id">;

const API_BASE_URL = "http://localhost:3000/trips";

const fetchTrips = async (): Promise<Trip[]> => {
  const response = await axios.get<Trip[]>(API_BASE_URL);
  return response.data;
};

const getTrip = async (id: string): Promise<Trip> => {
  const response = await axios.get<Trip>(`${API_BASE_URL}/${id}`);
  return response.data;
};

const postTrip = async (trip: CreateTripRequest): Promise<Trip> => {
  const response = await axios.post<Trip>(API_BASE_URL, trip);
  return response.data;
};

const updateTrip = async (id: string, trip: Trip): Promise<Trip> => {
  const response = await axios.put<Trip>(`${API_BASE_URL}/${id}`, trip);
  return response.data;
};

const deleteTrip = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
export { fetchTrips, getTrip, postTrip, updateTrip, deleteTrip };
