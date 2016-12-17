/* @flow */

export type FilterObject = {
  key: string,
  value: string,
  icon?: string
};

export type GenreObject = {
  id: number,
  name: string,
  icon?: string
};

export type InstrumentObject = {
  id: number,
  name: string,
  icon?: string
};

export type ArtistObject = {
  id: number,
  lastName: string,
  firstName?: string,
  icon?: string
};

export type SongObject = {
  id: number,
  title: string,
  artist: number,
  instrument: Array<number>,
  genre: Array<number>,
  difficulty?: number,
  progress?: number

};

export type SongsStateObject = {
  collection:         Array<SongObject>,
  fetching:           boolean,
  visibleSongs:       Array<number>,
  filters:            Array<FilterObject>,
  currentSong:        number,
  currentInstruments: Array<number>,
  currentGenres:      Array<number>,
  genres:             Array<GenreObject>,
  instruments:        Array<InstrumentObject>,
  artists:            Array<ArtistObject>
};
