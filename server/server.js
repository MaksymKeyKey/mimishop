const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

const secret = 'jwt_secret';

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://seksikoleg5:se4HivNRYKdydnzc@cluster0.pdc2rrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

const itemProductSchema = new mongoose.Schema({
    id: String,
    img: String,
    cost: String,
    name: String,
    species: String,
    category: String,
    subcategory: String,
    colors: [{ color: String, image: String }],
    colorImages: { type: mongoose.Schema.Types.Mixed },
    width: String,
    height: String,
    countryOfManufacture: String,
    materials: String,
    reviews: [{ username: String, rating: Number, text: String }]
});

const filterSchema = new mongoose.Schema({
    id: String,
    name: String,
    category: String,
    subfilters: [{
        id: String,
        filterName: String,
        name: String,
    }],
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});


const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ item: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemProduct' }, quantity: Number, name: String, cost: Number }],
    totalCost: Number,
    status: { type: String, default: 'Pending' }
});

const ItemProduct = mongoose.model('ItemProduct', itemProductSchema);
const Filter = mongoose.model('Filter', filterSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

app.get('/api/itemProducts', async (req, res) => {
    try {
        const items = await ItemProduct.find();
        res.json(items);

    } catch (error) {
        console.error('Error fetching item products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/itemProducts', async (req, res) => {
    try {
        const newItem = await ItemProduct.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/itemProducts/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const updatedItemData = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const updatedItem = await ItemProduct.findByIdAndUpdate(id, updatedItemData, { new: true });
        console.log(updatedItem)
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item product not found' });
        }

        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating item product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/itemProducts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await ItemProduct.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item product not found' });
        }
        res.json(deletedItem);
    } catch (error) {
        console.error('Error deleting item product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Новый маршрут для получения отзывов
app.get('/api/itemProducts/:id/reviews', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const item = await ItemProduct.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'Item product not found' });
        }
        res.json(item.reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/itemProducts/:id/reviews', async (req, res) => {
    const { id } = req.params;
    const { username, rating, text } = req.body;

    // Проверка наличия всех необходимых полей
    if (!username || !rating || !text) {
        return res.status(400).json({ error: 'Missing required fields: username, rating, and text' });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const item = await ItemProduct.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'Item product not found' });
        }

        const newReview = { username, rating, text };
        item.reviews.push(newReview);
        await item.save();

        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/filters', async (req, res) => {
    try {
        const filters = await Filter.find();
        res.json(filters);
    } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/filters', async (req, res) => {
    try {
        const newFilter = new Filter(req.body);
        const savedFilter = await newFilter.save();
        res.status(201).json(savedFilter);
    } catch (error) {
        console.error('Error saving filter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/filters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFilter = await Filter.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFilter) {
            return res.status(404).json({ error: 'Filter not found' });
        }
        res.json(updatedFilter);
    } catch (error) {
        console.error('Error updating filter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/filters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFilter = await Filter.findByIdAndDelete(id);
        if (!deletedFilter) {
            return res.status(404).json({ error: 'Filter not found' });
        }
        res.json(deletedFilter);
    } catch (error) {
        console.error('Error deleting filter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
});

app.post('/api/register', async (req, res) => {
    const { username, email, phone, password } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, phone, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

app.get('/api/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('orders');
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/orders', auth, async (req, res) => {
    const { items, totalCost } = req.body;

    try {
        const newOrder = new Order({
            userId: req.user.userId,
            items,
            totalCost
        });

        await newOrder.save();
        await User.findByIdAndUpdate(req.user.userId, { $push: { orders: newOrder._id } });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
