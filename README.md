# JourneyNotes 🌴

JourneyNotes is a modern web application designed to help users organize, document, and share their travel journeys. Written in TypeScript and built with Next.js and powered by Supabase for secure and scalable data management, JourneyNotes offers an easy way to keep track of your travel experiences.


## Using JourneyNotes

JourneyNotes is currently deployed for use at the following domain:

https://journey-notes-v2.vercel.app


## Running JourneyNotes Locally

### Installation and Setup

1. Clone the repository: `git clone https://github.com/sebbyolive/journey-notes-v2.git` and navigate to the folder: `cd journey-notes-v2`.
2. Install dependencies: `npm install`.


### Supabase Setup

JourneyNotes requires a Supabase database for certain features. Ensure you have a Supabase project set up and create the required table:

1. **`journeys` Table**
   - **Description**: Stores user journey details.
   - **Columns**:
  - `id` (UUID, primary key, auto-generated): Unique identifier for each journey.
  - `created_at` (timestamp): Timestamp of when the journey was created.
  - `user_id` (UUID, foreign key): References the user who created the journey.
  - `city_name` (text): The name of the city visited.
  - `country` (text): The name of the country visited.
  - `emoji` (text): An emoji representing the country (e.g., flag).
  - `latitude` (float8): Latitude coordinate of the location.
  - `longitude` (float8): Longitude coordinate of the location.
  - `date_visited` (date): The date when the location was visited.
  - `notes` (text): Additional notes or descriptions about the journey.
    
2. Set up RLS to ensure only users can Read, Insert, and Delete their own journeys!
   
3. Create `.env.local` / `.env.production` files in the root directory with the required environment variables:
   - Example:
     - `NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here`


### Running the Development Server

To start the development server, run `npm run dev`.


### Using Docker (Optional)

To run the app using Docker (Port 3000):

1. Pull the Docker image: `docker pull ghcr.io/sebbyolive/journey-notes-v2:latest`.
2. Run the container: `docker run -p 3000:3000 --env-file .env.local journey-notes-v2:latest`.


### Building for Production

1. Generate a production build: `npm run build`.
2. Start the production server: `npm start`.


## Acknowledgements

JourneyNotes uses the following open-source tools and APIs:

- [Leaflet](https://leafletjs.com/) and [React-Leaflet](https://react-leaflet.js.org/) for the interactive map.
- [Nominatim](https://nominatim.org/) for reverse geocoding.

Thank you to the devs of those great projects!
