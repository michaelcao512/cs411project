import {Request, Response, NextFunction} from "express";
import { fetchTwitterFeed, analyzeEmotions, convertEmotionsToGenres, fetchMovieRecommendations} from "./general.controller";

const fetchTwitterFeedMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body.twitterFeed = fetchTwitterFeed(req.params.id);
    if (req.body.twitterFeed === null) {
        return res.status(404).json({ message: 'Twitter feed not found' });
    }
    next();
};

const analyzeEmotionsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body.emotions = analyzeEmotions(req.body.twitterFeed, req.params.id);
    if (req.body.emotions === null) {
        return res.status(404).json({ message: 'Emotions not found' });
    }
    next();
};

const convertEmotionsToGenresMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body.genres = convertEmotionsToGenres(req.params.id);
    if (req.body.genres === null) {
        return res.status(404).json({ message: 'Genres not found' });
    }
    next();
};

const fetchMovieRecommendationsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body.movieRecommendations = fetchMovieRecommendations(req.params.id);
    if (req.body.movieRecommendations === null) {
        return res.status(404).json({ message: 'Movie recommendations not found' });
    }
    next();
};

const sendMovieRecommendationsMiddleware = (req: Request, res: Response) => {
    return res.status(200).json({ recommendations: req.body.movieRecommendations});
};

export { fetchTwitterFeedMiddleware, analyzeEmotionsMiddleware, convertEmotionsToGenresMiddleware, fetchMovieRecommendationsMiddleware, sendMovieRecommendationsMiddleware}