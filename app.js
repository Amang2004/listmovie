// Data
const curatedMovies = [
  {
    type: 'movie',
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi/Action",
    rating: 5,
    imdbRating: 8.8,
    description: "A skilled thief who specializes in extracting information from people's minds during their dreams takes on the challenge of planting an idea instead. This mind-bending journey through layers of dreams explores the nature of reality and the power of ideas.",
    personalNote: "Christopher Nolan's masterpiece combines stunning visuals with intricate storytelling. The film's exploration of dreams within dreams creates a puzzle that rewards multiple viewings.",
    recommendedFor: "Fans of complex narratives, psychological thrillers, and visual spectacles.",
    streamingOn: ["Netflix", "Amazon Prime"],
    awards: ["4 Academy Awards", "AFI Movie of the Year"],
    quote: "You mustn't be afraid to dream a little bigger, darling.",
    isCurated: true
  },
  {
    type: 'movie',
    title: "Parasite",
    year: 2019,
    genre: "Drama/Thriller",
    rating: 5,
    imdbRating: 8.6,
    description: "A poor family schemes to become employed by a wealthy family, infiltrating their household by posing as unrelated, highly qualified individuals. The film masterfully blends comedy, drama, and social commentary into a unique cinematic experience.",
    personalNote: "Bong Joon-ho's direction creates a perfect balance of humor and tension, while delivering a powerful message about social inequality.",
    recommendedFor: "Viewers who appreciate sophisticated storytelling and social commentary.",
    streamingOn: ["Hulu", "Amazon Prime"],
    awards: ["4 Academy Awards including Best Picture", "Palme d'Or at Cannes"],
    quote: "You know what kind of plan never fails? No plan at all.",
    isCurated: true
  },
  {
    type: 'movie',
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: "Comedy/Drama",
    rating: 5,
    imdbRating: 8.1,
    description: "The adventures of a legendary hotel concierge and his trusted lobby boy in a fictional European country between the wars. Wes Anderson creates a whimsical yet poignant story about friendship, loyalty, and the end of an era.",
    personalNote: "The film's meticulous attention to detail, distinctive visual style, and perfect ensemble cast create an unforgettable viewing experience.",
    recommendedFor: "Anyone who loves quirky humor, visual storytelling, and charming characters.",
    streamingOn: ["HBO Max", "Disney+"],
    awards: ["4 Academy Awards", "Golden Globe for Best Motion Picture - Comedy"],
    quote: "You see, there are still faint glimmers of civilization left in this barbaric slaughterhouse that was once known as humanity.",
    isCurated: true
  }
];

const personalList = [
  {
    type: 'movie',
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 5,
    imdbRating: 9.3,
    description: "A banker, wrongly convicted of murder, forms a deep friendship while in prison and finds hope through acts of common decency. A powerful story about hope, friendship, and the human spirit that resonates with audiences of all backgrounds.",
    personalNote: "The film's message about hope and perseverance in the face of injustice is deeply moving. The performances by Morgan Freeman and Tim Robbins are unforgettable.",
    recommendedFor: "Anyone who appreciates character-driven stories and themes of redemption and friendship.",
    streamingOn: ["Netflix", "HBO Max"],
    awards: ["7 Academy Award nominations"],
    quote: "Get busy living, or get busy dying.",
    isCurated: false
  },
  {
    type: 'book',
    title: "1984",
    year: 1949,
    genre: "Dystopian Fiction",
    rating: 5,
    imdbRating: 0,
    description: "George Orwell's masterpiece about a totalitarian future society where critical thought is suppressed under a regime of surveillance and control. A haunting portrayal of a world where truth is manipulated and freedom is restricted.",
    personalNote: "The book's warnings about surveillance, manipulation of truth, and the power of language remain incredibly relevant today.",
    recommendedFor: "Readers interested in political fiction, social commentary, and thought-provoking narratives about human nature and society.",
    isCurated: false
  },
  {
    type: 'tv',
    title: "Breaking Bad",
    year: 2008,
    genre: "Crime Drama",
    rating: 5,
    imdbRating: 9.5,
    description: "A high school chemistry teacher diagnosed with cancer turns to manufacturing drugs to secure his family's financial future. The show explores themes of morality, pride, and the consequences of choices.",
    personalNote: "The character development and moral complexity make this show a masterpiece. Bryan Cranston's transformation as Walter White is phenomenal.",
    recommendedFor: "Viewers who enjoy complex character studies, moral ambiguity, and intense dramatic storytelling.",
    streamingOn: ["Netflix"],
    awards: ["16 Primetime Emmy Awards"],
    quote: "I am the one who knocks!",
    isCurated: false
  }
];

// State
let showCurated = true;
let currentFilter = 'all';
let selectedItem = null;
let movieList = [];

// DOM Elements
const mediaListElement = document.getElementById('mediaList');
const detailedReviewElement = document.getElementById('detailedReview');
const addMovieSection = document.getElementById('addMovieSection');
const movieListElement = document.getElementById('movieList');

// Functions
function handleListToggle(isCurated) {
  showCurated = isCurated;
  document.getElementById('curatedBtn').className = `px-4 py-2 rounded-lg transition-all ${isCurated ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`;
  document.getElementById('personalBtn').className = `px-4 py-2 rounded-lg transition-all ${!isCurated ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`;
  selectedItem = null;
  renderMedia();
  renderDetailedReview();
}

function toggleAddMovie() {
  addMovieSection.classList.toggle('hidden');
}

async function handleAddMovie(event) {
  event.preventDefault();
  const titleInput = document.getElementById('movieTitle');
  const yearInput = document.getElementById('movieYear');
  
  if (titleInput.value && yearInput.value) {
    const movie = {
      title: titleInput.value,
      year: yearInput.value,
      loading: true
    };
    
    movieList = [...movieList, movie];
    renderMovieList();
    
    titleInput.value = '';
    yearInput.value = '';

    // Fetch IMDb data
    const imdbData = await fetchIMDbData(movie.title);
    
    // Update movie with IMDb data
    movieList = movieList.map(m => 
      m.title === movie.title && m.year === movie.year
        ? { ...m, imdbData, loading: false }
        : m
    );
    renderMovieList();
  }
}

function handleRemoveMovie(index) {
  movieList = movieList.filter((_, i) => i !== index);
  renderMovieList();
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.className = `filter-btn px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
      btn.dataset.filter === filter ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
    }`;
  });
  renderMedia();
}

function getIcon(type) {
  switch (type) {
    case 'movie':
      return '<i data-lucide="film" class="w-5 h-5"></i>';
    case 'book':
      return '<i data-lucide="book" class="w-5 h-5"></i>';
    case 'tv':
      return '<i data-lucide="tv" class="w-5 h-5"></i>';
    default:
      return '<i data-lucide="info" class="w-5 h-5"></i>';
  }
}

function renderStars(rating) {
  return Array(rating).fill('<i data-lucide="star" class="w-5 h-5 text-yellow-400 fill-current"></i>').join('');
}

function renderMedia() {
  const media = showCurated ? curatedMovies : personalList;
  const filteredMedia = currentFilter === 'all' ? media : media.filter(item => item.type === currentFilter);
  
  mediaListElement.innerHTML = filteredMedia.map((item, index) => `
    <div
      onclick="selectItem(${index})"
      class="p-4 rounded-lg transition-all cursor-pointer ${
        selectedItem === item ? 'bg-blue-600 shadow-lg scale-102' : 'bg-gray-800 hover:bg-gray-700'
      }"
    >
      <div class="flex items-center gap-2 mb-2">
        ${getIcon(item.type)}
        <h3 class="text-lg font-semibold">${item.title}</h3>
      </div>
      <div class="flex items-center justify-between text-sm text-gray-300">
        <span>${item.year}</span>
        <div class="flex items-center gap-1 text-yellow-400">
          ${renderStars(item.rating)}
        </div>
      </div>
    </div>
  `).join('');
  
  lucide.createIcons();
}

function selectItem(index) {
  const media = showCurated ? curatedMovies : personalList;
  selectedItem = media[index];
  renderDetailedReview();
}

function renderDetailedReview() {
  if (!selectedItem) {
    detailedReviewElement.innerHTML = '<p class="text-gray-400">Select an item to view detailed information</p>';
    return;
  }

  detailedReviewElement.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-start justify-between">
        <div>
          <div class="flex items-center gap-2">
            ${getIcon(selectedItem.type)}
            <h3 class="text-2xl font-bold">${selectedItem.title}</h3>
          </div>
          <p class="text-gray-400">Released in ${selectedItem.year}</p>
        </div>
        <div class="flex flex-col items-end gap-2">
          <div class="flex items-center gap-1">
            ${renderStars(selectedItem.rating)}
          </div>
          ${selectedItem.imdbRating > 0 ? `
            <div class="text-sm text-gray-300">
              IMDb: ${selectedItem.imdbRating}/10
            </div>
          ` : ''}
        </div>
      </div>
      
      <div>
        <h4 class="text-lg font-semibold mb-2">Genre</h4>
        <p class="text-gray-300">${selectedItem.genre}</p>
      </div>

      <div>
        <h4 class="text-lg font-semibold mb-2">Description</h4>
        <p class="text-gray-300 leading-relaxed">${selectedItem.description}</p>
      </div>

      ${selectedItem.quote ? `
        <div>
          <h4 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <i data-lucide="quote" class="w-5 h-5 text-purple-400"></i>
            Memorable Quote
          </h4>
          <p class="text-gray-300 leading-relaxed italic">"${selectedItem.quote}"</p>
        </div>
      ` : ''}

      <div>
        <h4 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <i data-lucide="heart" class="w-5 h-5 text-red-400"></i>
          Personal Note
        </h4>
        <p class="text-gray-300 leading-relaxed">${selectedItem.personalNote}</p>
      </div>

      ${selectedItem.awards ? `
        <div>
          <h4 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <i data-lucide="trophy" class="w-5 h-5 text-yellow-400"></i>
            Awards
          </h4>
          <ul class="list-disc list-inside text-gray-300">
            ${selectedItem.awards.map(award => `<li>${award}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${selectedItem.streamingOn ? `
        <div>
          <h4 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <i data-lucide="play-circle" class="w-5 h-5 text-green-400"></i>
            Where to Watch
          </h4>
          <div class="flex gap-2 flex-wrap">
            ${selectedItem.streamingOn.map(platform => `
              <span class="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">
                ${platform}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div>
        <h4 class="text-lg font-semibold mb-2 flex items-center gap-2">
          <i data-lucide="users" class="w-5 h-5 text-blue-400"></i>
          Recommended For
        </h4>
        <p class="text-gray-300 leading-relaxed">${selectedItem.recommendedFor}</p>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

function renderMovieList() {
  if (movieList.length === 0) {
    movieListElement.innerHTML = '';
    return;
  }

  movieListElement.innerHTML = `
    <h3 class="text-lg font-semibold mb-3">Your Movie List:</h3>
    <div class="space-y-2">
      ${movieList.map((movie, index) => `
        <div class="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-semibold">${movie.title}</span>
              <span class="text-gray-400">(${movie.year})</span>
              ${movie.loading ? `
                <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-blue-400"></i>
              ` : ''}
            </div>
            ${movie.imdbData ? `
              <div class="mt-2 space-y-1">
                <div class="flex items-center gap-2 text-yellow-400">
                  <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                  <span>${movie.imdbData.rating}/10</span>
                </div>
                <p class="text-sm text-gray-300">${movie.imdbData.summary}</p>
              </div>
            ` : ''}
          </div>
          <button
            onclick="handleRemoveMovie(${index})"
            class="text-red-400 hover:text-red-300 transition-all ml-4"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
      `).join('')}
    </div>
  `;
  
  lucide.createIcons();
}

// Initial render
renderMedia();
renderDetailedReview();