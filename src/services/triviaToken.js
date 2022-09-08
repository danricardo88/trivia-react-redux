const fetchToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await request.json();
  return response;
};

export default fetchToken;
