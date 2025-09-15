import { User } from '../types';

// This is a mock user database. In a real application, you would query a database.
const MOCK_USER_DB = {
  id: '1',
  email: 'demo@smartcanvas.ai',
  password: 'password', // In a real app, this would be a hash
  name: 'Demo User',
};

/**
 * Simulates a login API call.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A Promise that resolves with the User object on success, or rejects with an Error on failure.
 */
export const login = (email?: string, password?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === MOCK_USER_DB.email && password === MOCK_USER_DB.password) {
        const user: User = {
          id: MOCK_USER_DB.id,
          email: MOCK_USER_DB.email,
          name: MOCK_USER_DB.name,
        };
        resolve(user);
      } else {
        reject(new Error('Invalid email or password. Please try again.'));
      }
    }, 1500); // Simulate network delay
  });
};

/**
 * Simulates a registration API call.
 * @param name The user's full name.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A Promise that resolves with the new User object on success, or rejects with an Error on failure.
 */
export const register = (name?: string, email?: string, password?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!name || !email || !password) {
        reject(new Error('All fields are required.'));
        return;
      }
      if (email === MOCK_USER_DB.email) {
        reject(new Error('An account with this email already exists.'));
        return;
      }
      // In a real app, you would create the user in the database.
      // Here, we'll just return a new user object.
      const newUser: User = {
        id: Date.now().toString(), // simple unique ID for mock
        name,
        email,
      };
      resolve(newUser);
    }, 1500); // Simulate network delay
  });
};