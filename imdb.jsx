// IMDb data fetching service
const imdbDatabase = {
    "inception": {
      title: "Inception",
      year: "2010",
      rating: 8.8,
      summary: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    "parasite": {
      title: "Parasite",
      year: "2019",
      rating: 8.6,
      summary: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
    },
    "the shawshank redemption": {
      title: "The Shawshank Redemption",
      year: "1994",
      rating: 9.3,
      summary: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    "the dark knight": {
      title: "The Dark Knight",
      year: "2008",
      rating: 9.0,
      summary: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    "pulp fiction": {
      title: "Pulp Fiction",
      year: "1994",
      rating: 8.9,
      summary: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    "schindler's list": {
      title: "Schindler's List",
      year: "1993",
      rating: 9.0,
      summary: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis."
    },
    "goodfellas": {
      title: "Goodfellas",
      year: "1990",
      rating: 8.7,
      summary: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate."
    },
    "fight club": {
      title: "Fight Club",
      year: "1999",
      rating: 8.8,
      summary: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more."
    },
    "forrest gump": {
      title: "Forrest Gump",
      year: "1994",
      rating: 8.8,
      summary: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
    },
    "the matrix": {
      title: "The Matrix",
      year: "1999",
      rating: 8.7,
      summary: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free from the system."
    }
  };
  
  async function fetchIMDbData(title) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const normalizedTitle = title.toLowerCase();
    return imdbDatabase[normalizedTitle] || null;
  }