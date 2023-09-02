// Listen for api call update
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name === 'fetchPlayerCount') {
    const { gameId } = msg;
    const apiURL = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${gameId}`;

    fetch(apiURL)
      .then((res) => {
        if (res.status !== 200) {
          response({ count: 'Error', isError: true });
          return;
        }
        res
          .json()
          .then((data) =>
            response({ count: data.response.player_count, isError: false }),
          );
      })
      .catch((e) => response({ count: 'Error', isError: true }));
  }

  return true;
});
