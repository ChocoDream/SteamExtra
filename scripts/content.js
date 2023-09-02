const gamesParentElement = document.querySelector('.carousel_items');

// Return null if game not found
if (gamesParentElement) {
  const games = gamesParentElement.childNodes;

  games.forEach((game) => {
    const gameId = game.getAttribute('data-ds-appid');
    const capsule = game.firstChild;
    const extraInfo = document.createElement('div');

    const gameIdElement = document.createElement('p');
    gameIdElement.textContent = `🔍 ${gameId}`;

    const styling = {
      position: 'absolute',
      backgroundColor: 'rgb(10 10 10)',
      display: 'flex',
      zIndex: 2,
      bottom: '5px',
      left: '3px',
      fontSize: '12px',
      padding: '3px',
      boxShadow: '0 0 1px #030247',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    };
    Object.assign(extraInfo.style, styling);
    const playerCountElement = document.createElement('p');
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${gameId}`,
    )
      .then((response) => response.json())
      .then(({ response }) => {
        const playerCount = response.player_count || 0;
        playerCountElement.textContent = `👥 ${playerCount}`;
        extraInfo.appendChild(playerCountElement);
        extraInfo.appendChild(gameIdElement);
      })
      .catch((e) => {
        console.error(e);
        playerCountElement.textContent = '🚫 No Data';
        extraInfo.appendChild(playerCountElement);
        extraInfo.appendChild(gameIdElement);
      });

    capsule.insertAdjacentElement('afterend', extraInfo);
  });
}
