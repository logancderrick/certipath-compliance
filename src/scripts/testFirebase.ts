import { config } from 'dotenv';
import { resolve } from 'path';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function testFirebaseConnection() {
  // Log environment variables (without sensitive values)
  console.log('Checking Firebase configuration...');
  const configStatus = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '**present**' : '**missing**',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '**present**' : '**missing**',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '**present**' : '**missing**',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '**present**' : '**missing**',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '**present**' : '**missing**',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '**present**' : '**missing**'
  };
  console.log('Firebase config status:', configStatus);
  console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

  try {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    // Validate required config
    const missingVars = Object.entries(firebaseConfig)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      throw new Error(`Missing required Firebase configuration: ${missingVars.join(', ')}`);
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    console.log('Firebase initialized successfully');

    // Initialize Firestore
    const db = getFirestore(app);
    console.log('Firestore initialized');

    // Create a properly formatted test document
    const now = new Date();
    const firestoreTimestamp = Timestamp.fromDate(now);
    
    const testData = {
      title: "Test Article",
      slug: "test-article",
      excerpt: "This is a test article to verify Firestore connectivity.",
      content: "This is the main content of the test article.",
      date: now.toISOString().split('T')[0],
      category: "Test",
      source: "Test Source",
      originalUrl: "https://example.com/test",
      published: true,
      htmlContent: "<p>This is the main content of the test article.</p>",
      createdAt: firestoreTimestamp,
      updatedAt: firestoreTimestamp,
      timestamp: firestoreTimestamp.seconds
    };

    // Try to save the test document
    console.log('Attempting to save test document...');
    const articlesRef = collection(db, 'articles');
    const docRef = await addDoc(articlesRef, testData);
    console.log('Successfully saved test document with ID:', docRef.id);

    // List all documents
    console.log('\nListing all documents in collection:');
    const snapshot = await getDocs(articlesRef);
    console.log(`Found ${snapshot.size} documents in 'articles' collection.`);
    
    const articles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Log the articles data
    console.log('Articles:', JSON.stringify(articles, null, 2));

    return true;
  } catch (error) {
    console.error('Error testing Firebase connection:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return false;
  }
}

testFirebaseConnection().then(success => {
  if (!success) {
    console.log('Firebase connection test failed');
    process.exit(1);
  }
  console.log('Firebase connection test completed successfully');
}); 