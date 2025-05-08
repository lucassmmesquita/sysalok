// frontend/src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #0071e3;
    --secondary-color: #86868b;
    --dark-color: #1d1d1f;
    --light-color: #f5f5f7;
    --danger-color: #ff3b30;
    --success-color: #34c759;
    --warning-color: #ff9500;
    --background-color: #ffffff;
    --border-color: #d2d2d7;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --radius: 8px;
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--dark-color);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: var(--spacing-md);
  }

  h1 {
    font-size: 2.5rem;
    letter-spacing: -0.025em;
  }

  h2 {
    font-size: 2rem;
    letter-spacing: -0.025em;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: var(--spacing-md);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 0.8;
  }

  button, .button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--radius);
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:hover, .button:hover {
    background-color: #0062c4;
  }

  button.secondary, .button.secondary {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }

  button.secondary:hover, .button.secondary:hover {
    background-color: rgba(0, 113, 227, 0.1);
  }

  button.danger, .button.danger {
    background-color: var(--danger-color);
  }

  button.danger:hover, .button.danger:hover {
    background-color: #e0352b;
  }

  input, select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    font-family: var(--font-family);
    font-size: 14px;
    transition: border-color 0.2s ease;
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: 500;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: var(--spacing-lg) 0;
    border-radius: var(--radius);
    overflow: hidden;
  }

  table th {
    background-color: var(--light-color);
    padding: var(--spacing-md);
    text-align: left;
    font-weight: 500;
    color: var(--dark-color);
  }

  table td {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
    color: var(--dark-color);
  }

  table tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    h3 {
      font-size: 1.25rem;
    }
    
    table {
      display: block;
      overflow-x: auto;
    }
  }
`;

export default GlobalStyles;