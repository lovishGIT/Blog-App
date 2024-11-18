import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import blogRoutes from './src/routes/blog.routes.js';

const app = express();

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: 'Welcome to the Blog API!',
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

export default app;
