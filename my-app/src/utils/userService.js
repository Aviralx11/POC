
const USERS_KEY = 'trainAppUsers';


const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  // If no users are stored, return an empty array.
  // Otherwise, parse the JSON string back into an array.
  return users ? JSON.parse(users) : [];
};


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
  // local storage can only store strings
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return { success: true };
};


export const loginUser = (credentials) => {
  const users = getUsers();

  // mobile number and password match the credentials.
  const foundUser = users.find(user => 
    user.mobileNo === credentials.mobileNo && 
    user.password === credentials.password
  );

  
  return foundUser || null;
};
