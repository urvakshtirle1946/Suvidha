import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default nextConfig;
