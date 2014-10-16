var user = function User(_steamId, _personaName, _realName, _avatar) {
    this.steamId = _steamId;
    this.personaName = _personaName;
    this.realName = _realName;
    this.avatar = _avatar;
    this.recentlyPlayedGames;
    this.ownedGames;
    this.steamLevel;
    this.badges;
}

module.exports = user;