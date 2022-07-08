type CastDetails = {
    actors: Array<string>;
    director: string;
    prodCompany: string;
};

export interface Movie {
    id: number;
    title: string;
    desc: string;
    poster: string;
    backdrop?: string;
    castDetails?: CastDetails;
}
