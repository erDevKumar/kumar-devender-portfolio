import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getRemoteConfig } from 'firebase-admin/remote-config';

// Initialize Firebase Admin SDK
let adminApp: App | null = null;
let remoteConfigInstance: ReturnType<typeof getRemoteConfig> | null = null;
let initializationError: Error | null = null;

function initializeFirebaseAdmin() {
  if (adminApp) {
    return adminApp;
  }

  // Check if already initialized
  const existingApps = getApps();
  if (existingApps.length > 0) {
    adminApp = existingApps[0];
    return adminApp;
  }

  // Initialize with service account credentials from environment
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const serviceAccount = JSON.parse(serviceAccountKey);
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'erkumardevender',
      });
      console.log('✅ Firebase Admin initialized with service account');
      initializationError = null;
      return adminApp;
    } catch (error: any) {
      const err = new Error(`Invalid FIREBASE_SERVICE_ACCOUNT_KEY format: ${error.message}`);
      console.error('Error parsing service account key:', error);
      initializationError = err;
      throw err;
    }
  } else {
    // For local development, require service account key
    if (process.env.NODE_ENV !== 'production') {
      const err = new Error('FIREBASE_SERVICE_ACCOUNT_KEY is required for local development. Please add it to .env.local');
      console.error('❌ Firebase Admin: Service account key required for local development');
      initializationError = err;
      throw err;
    }
    
    // In production (Firebase Hosting/Functions), try Application Default Credentials
    try {
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'erkumardevender';
      adminApp = initializeApp({
        projectId: projectId,
      });
      console.log(`✅ Firebase Admin initialized with project ID: ${projectId}`);
      initializationError = null;
      return adminApp;
    } catch (error: any) {
      const err = new Error(`Firebase Admin initialization failed: ${error.message}`);
      console.error('Firebase Admin initialization error:', error);
      initializationError = err;
      throw err;
    }
  }
}

// Get Remote Config instance
function getRemoteConfigInstance() {
  if (initializationError) {
    throw initializationError;
  }

  if (remoteConfigInstance) {
    return remoteConfigInstance;
  }

  if (!adminApp) {
    adminApp = initializeFirebaseAdmin();
  }

  try {
    remoteConfigInstance = getRemoteConfig(adminApp);
    return remoteConfigInstance;
  } catch (error) {
    console.error('Error getting Remote Config instance:', error);
    throw error;
  }
}

// Function to get admin password from Remote Config
export async function getAdminPassword(): Promise<string | null> {
  try {
    const rc = getRemoteConfigInstance();
    const template = await rc.getTemplate();
    
    // Debug: Log template structure
    console.log('Remote Config template keys:', Object.keys(template.parameters || {}));
    
    // Get the admin_password parameter
    const adminPasswordParam = template.parameters?.admin_password;
    
    if (!adminPasswordParam) {
      console.error('❌ admin_password parameter not found in Remote Config');
      console.log('Available parameters:', Object.keys(template.parameters || {}));
      return null;
    }
    
    console.log('✅ admin_password parameter found');
    
    if (!adminPasswordParam.defaultValue) {
      console.error('❌ admin_password has no defaultValue');
      return null;
    }
    
    const defaultValue = adminPasswordParam.defaultValue;
    
    // Try different ways to access the value
    let passwordValue: string | null = null;
    
    // Method 1: Direct value property (InAppDefaultValue)
    if ('value' in defaultValue) {
      const value = (defaultValue as any).value;
      if (typeof value === 'string' && value.trim()) {
        passwordValue = value;
        console.log('✅ Found password via value property');
      }
    }
    
    // Method 2: stringValue property (RemoteConfigParameterValue)
    if (!passwordValue && 'stringValue' in defaultValue) {
      const stringValue = (defaultValue as any).stringValue;
      if (typeof stringValue === 'string' && stringValue.trim()) {
        passwordValue = stringValue;
        console.log('✅ Found password via stringValue property');
      }
    }
    
    // Method 3: Try accessing directly
    if (!passwordValue) {
      const directValue = (defaultValue as any);
      if (typeof directValue === 'string' && directValue.trim()) {
        passwordValue = directValue;
        console.log('✅ Found password via direct access');
      }
    }
    
    if (passwordValue) {
      console.log('✅ Admin password retrieved successfully from Remote Config');
      return passwordValue;
    }
    
    console.error('❌ Could not extract password value from defaultValue');
    console.log('DefaultValue structure:', JSON.stringify(defaultValue, null, 2));
    return null;
  } catch (error: any) {
    console.error('❌ Error fetching admin password from Remote Config:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
    });
    
    // Provide helpful error message
    if (error.message?.includes('ENOTFOUND metadata.google.internal') || error.code === 'app/invalid-credential') {
      throw new Error('Firebase Admin requires FIREBASE_SERVICE_ACCOUNT_KEY for local development. Please add it to .env.local');
    }
    
    return null;
  }
}

// Initialize on module load (non-blocking)
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.NODE_ENV === 'production') {
    initializeFirebaseAdmin();
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin (will retry on first use):', error);
}

export default adminApp;
