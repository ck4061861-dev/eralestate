import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import route from './Routes/userAuth.Routes.js';
import adminRoute from './Routes/adminAuth.route.js';
import propertyRoute from './Routes/property.routes.js';
import unitRoute from './Routes/unit.routes.js';
import inquiryRoute from './Routes/inquiry.routes.js';
import contractRoute from './Routes/contract.routes.js';
import bookingRoute from './Routes/booking.routes.js';
import maintenanceRoute from './Routes/maintenance.routes.js';
import paymentRoute from './Routes/payment.routes.js';
import agentRoute from './Routes/agent.routes.js';
import ownerRoute from './Routes/owner.routes.js';
import staffRoute from './Routes/staff.routes.js';
import customerRoute from './Routes/customer.routes.js';
import roleRoute from './Routes/role.routes.js';
import blogRoute from './Routes/blog.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use(cookieParser());

const corsOptions = {
  origin: ['https://real-estate-website-six-jade.vercel.app'], // Allow requests from these origins
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images from /uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Mount auth + property + unit routes
app.use('/api/auth', route);
app.use('/api/auth', adminRoute);
app.use('/api/properties', propertyRoute);
app.use('/api/units', unitRoute);
app.use('/api/inquiries', inquiryRoute);
app.use('/api/contracts', contractRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/maintenance', maintenanceRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/agents', agentRoute);
app.use('/api/owners', ownerRoute);
app.use('/api/staff', staffRoute);
app.use('/api/customers', customerRoute);
app.use('/api/roles', roleRoute);
app.use('/api/blogs', blogRoute);

// Health route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;