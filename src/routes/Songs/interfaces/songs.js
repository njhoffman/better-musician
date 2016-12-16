/* @flow */

export type FilterObject = {
  key: string,
  value: string
};

export type GenreObject = {
  id: number,
  name: string
};

export type InstrumentObject = {
  id: number,
  name: string
};

export type SongObject = {
  id: number,
  title: string,
  artist: string,
  completed?: boolean,
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
  instruments:        Array<InstrumentObject>
};
