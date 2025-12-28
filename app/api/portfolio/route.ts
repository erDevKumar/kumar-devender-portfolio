import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { PortfolioData } from '@/types/portfolio';

const DATA_FILE = join(process.cwd(), 'data', 'portfolio.json');

// Helper to read portfolio data
function readPortfolioData(): PortfolioData {
  let jsonData: PortfolioData | null = null;
  
  try {
    if (existsSync(DATA_FILE)) {
      const fileContents = readFileSync(DATA_FILE, 'utf8');
      jsonData = JSON.parse(fileContents);
      
      // Check if JSON data is incomplete (has empty arrays) and fallback to TypeScript
      if (jsonData && (
        !jsonData.experience || jsonData.experience.length === 0 ||
        !jsonData.education || jsonData.education.length === 0 ||
        !jsonData.skills || jsonData.skills.length === 0 ||
        !jsonData.projects || jsonData.projects.length === 0 ||
        !jsonData.socialLinks || jsonData.socialLinks.length === 0
      )) {
        console.log('JSON file has empty arrays, falling back to TypeScript file');
        jsonData = null; // Force fallback
      }
    }
  } catch (error) {
    console.error('Error reading portfolio.json:', error);
  }
  
  // Fallback to TypeScript file if JSON doesn't exist or is incomplete
  if (!jsonData) {
    try {
      const { portfolioData } = require('@/data/portfolio');
      // If JSON file exists but was empty, initialize it with TypeScript data
      if (existsSync(DATA_FILE)) {
        try {
          writePortfolioData(portfolioData);
          console.log('Initialized portfolio.json with data from TypeScript file');
        } catch (writeError) {
          console.error('Failed to initialize portfolio.json:', writeError);
        }
      }
      return portfolioData;
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      throw new Error('Failed to load portfolio data');
    }
  }
  
  return jsonData;
}

// Helper to write portfolio data
function writePortfolioData(data: PortfolioData): void {
  // Ensure data directory exists
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// GET - Read portfolio data
export async function GET() {
  try {
    const data = readPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read portfolio data' }, { status: 500 });
  }
}

// POST - Update portfolio data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedData: PortfolioData = body;

    // Validate the data structure
    if (!updatedData.personalInfo || !updatedData.experience || !updatedData.education) {
      return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
    }

    writePortfolioData(updatedData);
    return NextResponse.json({ success: true, message: 'Portfolio data updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 });
  }
}

