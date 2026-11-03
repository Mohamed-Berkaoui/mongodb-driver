# Exercise: Movie App (Express + MongoDB driver)

Build it the way you built the todo app. It has two pages and no update or delete.

## Goal
- **Page 1, `/`:** shows all movies.
- **Page 2, `/addmovie`:** has a form to add a movie.

## Starting data
Use this JSON array in your code. You'll insert it into the database yourself.

```json
[
  { "title": "Inception", "year": 2010, "genre": "Sci-Fi", "rating": 8.8 },
  { "title": "The Godfather", "year": 1972, "genre": "Crime", "rating": 9.2 },
  { "title": "Parasite", "year": 2019, "genre": "Thriller", "rating": 8.5 },
  { "title": "Spirited Away", "year": 2001, "genre": "Animation", "rating": 8.6 },
  { "title": "The Dark Knight", "year": 2008, "genre": "Action", "rating": 9.0 }
]
```

## Steps

**1. Setup**
- Copy the todo project structure: `server.js`, a `views/` folder, and a `styles/` folder.
- Use the same packages: `express`, `mongodb`, `ejs`.
- Choose your own database name (`movieapp`, for example) and collection name (`movies`).
- Take the connection string from an environment variable or a placeholder. Never paste a real password into code you commit.

**2. Create the db and collection (seeding)**
- MongoDB creates the database and collection the first time you insert into them.
- When the server starts, after `client.connect()` succeeds, check whether the collection is empty.
  - Hint: `countDocuments()`.
- If it's empty, insert your array in one call.
  - Hint: `insertMany`.
- Restart the server twice. Check in Atlas that the movies were inserted only once.

**3. Index page `/`**
- Write a `GET /` route that reads all movies, like your todo route did.
- Render `index.ejs` and pass the movies to it.
- In the view, loop over the movies and show title, year, genre and rating.
- Add a link to the add page.
- Show a message such as "No movies yet" when the list is empty.

**4. Add page `/addmovie`**
- Write a `GET /addmovie` route that renders `addmovie.ejs`.
- The view holds a form with `method="POST"`, `action="/addmovie"`, and one input for each field (title, year, genre, rating).
- The `name` attributes of the inputs must match what you read in `req.body`.
- Add a link back to the index.

**5. Handle the form**
- Write a `POST /addmovie` route.
- Don't forget the `express.urlencoded` middleware.
- Build the movie object from `req.body`.
  - Careful: form values arrive as strings. Convert year and rating to numbers before saving.
- Insert it, then redirect to `/`.

**6. Small validation (bonus)**
- Refuse an empty title.
- Refuse a rating outside 0–10.
- Re-render the form with an error message instead of inserting.

**7. Styling (bonus)**
- Reuse your static `styles` setup and make the movie list look like cards.

## Check yourself
- [ ] A fresh start fills the db with 5 movies. A second start doesn't add duplicates.
- [ ] `/` lists the movies.
- [ ] Submitting the form adds a movie, and it shows up after the redirect.
- [ ] A movie added with year `2020` is stored as a number, not a string. Check this in Atlas.

## Questions to answer in your own words
1. Why did you not have to "create" the database manually?
2. What would happen if you seeded without the empty check?
3. Why do we redirect after a POST instead of rendering the page directly?
