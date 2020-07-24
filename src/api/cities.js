const API_KEY = '75b6a754a9mshdbe28bd93b21c09p1ee0abjsn032d45005478';

export const getCitySuggestions = async (str) => {
  const response = await fetch(`https://spott.p.rapidapi.com/places/autocomplete?q=${str}&limit=10`, {
    'method': 'GET',
    'headers': {
      'x-rapidapi-host': 'spott.p.rapidapi.com',
      'x-rapidapi-key': API_KEY
    }
  })

  return response.json();
}
