export const validUser = {
  username: process.env.USERNAME || 'Admin',
  password: process.env.PASSWORD || 'admin123',
};

export const newUser = {
  userRole: 'ESS',            // or 'Admin'
  status: 'Enabled',
  employeeName: 'Linda Anderson', // choose a pre-existing employee
  username: `user${Date.now()}`,
  password: 'Password@123',
  confirmPassword: 'Password@123'
};