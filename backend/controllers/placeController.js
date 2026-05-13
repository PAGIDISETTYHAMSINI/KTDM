const prisma = require('../config/db');

const createPlace = async (req, res) => {
    try {
        const place = await prisma.place.create({
            data: {
                ...req.body,
                lat: parseFloat(req.body.lat),
                lng: parseFloat(req.body.lng)
            }
        });
        res.status(201).json(place);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPlaces = async (req, res) => {
    try {
        const { category } = req.query;
        let where = {};
        if (category) where.category = category;
        const places = await prisma.place.findMany({ where });
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPlaceById = async (req, res) => {
    try {
        const place = await prisma.place.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { reviews: { include: { user: { select: { name: true } } } } }
        });
        res.json(place);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating),
                comment,
                userId: req.user.id,
                placeId: parseInt(req.params.id)
            }
        });
        
        // Update average rating (simplified)
        const allReviews = await prisma.review.findMany({ where: { placeId: parseInt(req.params.id) } });
        const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
        
        await prisma.place.update({
            where: { id: parseInt(req.params.id) },
            data: { rating: avgRating }
        });
        
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createPlace, getPlaces, getPlaceById, addReview };
