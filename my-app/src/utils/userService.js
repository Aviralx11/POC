// src/utils/userService.js

// The key we'll use to store the users array in Local Storage.
const USERS_KEY = 'trainAppUsers';

/**
 * A helper function to get all users from Local Storage.
 * It handles the case where no users exist yet.
 * @returns {Array} An array of user objects.
 */
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  // If no users are stored, return an empty array.
  // Otherwise, parse the JSON string back into an array.
  return users ? JSON.parse(users) : [];
};

/**
 * Registers a new user by saving them to Local Storage.
 * @param {object} newUser - The user object with name, mobileNo, and password.
 * @returns {object} An object indicating success or failure.
 *                   { success: true } or { success: false, message: 'Error message' }
 */
export const registerUser = (newUser) => {
  const users = getUsers();

  // Check if a user with the same mobile number already exists.
  const userExists = users.some(user => user.mobileNo === newUser.mobileNo);

  if (userExists) {
    return { success: false, message: 'A user with this mobile number already exists.' };
  }

  // If the user doesn't exist, add them to the list.
  const updatedUsers = [...users, newUser];

  // Save the updated list back to Local Storage.
  // We must stringify the array because Local Storage can only store strings.
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return { success: true };
};

/**
 * Logs in a user by checking their credentials against the list in Local Storage.
 * @param {object} credentials - An object with mobileNo and password.
 * @returns {object|null} The user object if login is successful, otherwise null.
 */
export const loginUser = (credentials) => {
  const users = getUsers();

  // Find a user whose mobile number AND password match the credentials.
  const foundUser = users.find(user => 
    user.mobileNo === credentials.mobileNo && 
    user.password === credentials.password
  );

  // Return the user object if found, otherwise this will return 'undefined', which is falsy.
  return foundUser || null;
};
