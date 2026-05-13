const prisma = require('../config/db');

const createNews = async (req, res) => {
    try {
        const { title, content, category, area, lat, lng } = req.body;
        const news = await prisma.news.create({
            data: {
                title,
                content,
                category,
                area,
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                authorId: req.user.id
            }
        });
        res.status(201).json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getNews = async (req, res) => {
    try {
        const { category, area, status } = req.query;
        let where = { status: status || 'Approved' };
        if (category) where.category = category;
        if (area) where.area = area;

        const news = await prisma.news.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { author: { select: { name: true, isVerified: true } } }
        });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const approveNews = async (req, res) => {
    try {
        const news = await prisma.news.update({
            where: { id: parseInt(req.params.id) },
            data: { status: 'Approved' }
        });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrending = async (req, res) => {
    try {
        const news = await prisma.news.findMany({
            where: { status: 'Approved' },
            orderBy: { views: 'desc' },
            take: 5
        });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createNews, getNews, approveNews, getTrending };
