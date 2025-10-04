// 장르 객체 타입
interface Genre {
  id: number;
  name: string;
}

// 제작사 객체 타입
interface ProductionCompany {
  id: number;
  logo_path: string | null; // 로고가 없을 수 있으므로 null 허용
  name: string;
  origin_country: string;
}

// 제작 국가 객체 타입
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// 사용 언어 객체 타입
interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// 영화 상세 정보 전체 타입
export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object; // 컬렉션 정보가 객체일 수 있음
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string; // 날짜지만 문자열 형태로 받음
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
/**
 * 배우(Cast) 한 명에 대한 타입 정의
 */
export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // 프로필 사진이 없는 경우 null일 수 있음
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

/**
 * 제작진(Crew) 한 명에 대한 타입 정의
 */
export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // 프로필 사진이 없는 경우 null일 수 있음
  credit_id: string;
  department: string;
  job: string;
}

/**
 * 영화 크레딧 API 응답의 전체 타입 정의
 */
export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}
