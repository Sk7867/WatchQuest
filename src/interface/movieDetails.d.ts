interface IMovieCreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  credit_id: string;
  department: string;
  job: string;
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface IMovieCredits {
  directors?: ICrewInfo[];
  writers?: ICrewInfo[];
  cast?: ICrewInfo[];
}

interface ICrewInfo {
  name: string;
  profile_path?: string | null;
}
