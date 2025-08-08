#  UI & API E2E Test Automation with Playwright

This project is an end-to-end test automation framework built using **Playwright with TypeScript**, designed to test UI interactions and (optionally) mock API responses. It follows best practices like the Page Object Model, custom fixtures, and modular design to ensure clean, scalable, and maintainable code.

##  Tech Stack

-  Playwright (TypeScript)
-  Node.js (v18+)
-  .env configuration
-  Page Object Model (POM)
-  HTML & JSON reporters
- Optional: MSW.js / Playwright `route()` for API mocking

##  Folder Structure
playwright-e2e-framework/
├── tests/ → Test specs
├── pages/ → Page Objects
├── fixtures/ → Playwright custom fixtures
├── utils/ → Helpers & test data
├── mocks/ → Mock API handlers (optional)
├── .env → Credentials & config
├── playwright.config.ts → Global Playwright config
└── README.md → This documentation

##  Test Cases Covered

### 1. **Login Workflow**
- Navigates to login page
- Enters credentials
- Asserts successful login using a UI element (`#welcome`)
- Captures a screenshot on success

### 2. **User Table Operations**
- Add a new user
- Edit an existing user
- Delete a user
- Validates all operations via UI assertions

### 3. **Search & Filter**
- Search by partial match
- Search with no match (negative scenario)
- Validates that results match search criteria

### 4. **Bonus: API Mocking**
- Uses `page.route()` to mock `/api/users` response
- Validates that mocked data is rendered in UI

##  Test Strategy & Design Reflection

###  Architecture
- Modular Page Object Model (POM) for maintainability
- Each test is isolated with its own setup
- Utilities and helpers are extracted into `utils/`

###  Selector Strategy
- Used stable CSS selectors (`#id`, `.class`, text selectors)
- Avoided brittle XPath
- Added wrapper methods for dropdowns, tables, etc.

###  Test Data Handling
- Test data managed via `testData.ts`
- Used random data generator to ensure test independence

###  Flakiness Handling
- Added necessary `await` + assertions to wait for UI state
- Used Playwright’s auto-waiting capabilities
- Implemented retries and screenshots on failure

###  Scalability
- Easy to add more test cases using reusable POMs and fixtures
- Fixtures like login are shared across tests to reduce duplication
- Supports running headless in CI with reporters

##  Environment Variables

Create a `.env` file in root:

```env
USERNAME=Admin
PASSWORD=admin123
BASE_URL=https://opensource-demo.orangehrmlive.com

## Run all test
npx playwright test

 ##Run with UI (for debugging):
 npx playwright test --headed

 ## View HTML Report:
 npx playwright show-report

 ##  Cleanup & Best Practices

- All tests are idempotent — they clean up test data
- Utility methods are isolated in helpers
- Comments added in complex workflows for clarity
- Descriptive names used for methods and selectors

##  Author

Automation Engineer Assignment Solution  
Prepared by: Shilpi Kumari  
Date: 08-08-2025  
Tech: Playwright, TypeScript, Node.js