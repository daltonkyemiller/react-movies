type CastDetails = {
    actors: Array<string>;
    director: string;
    prodCompany: string;
}

export interface Movie {
    title: string;
    desc: string;
    poster: string;
    castDetails?: CastDetails;
}