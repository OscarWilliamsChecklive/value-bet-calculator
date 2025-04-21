<<<<<<< HEAD
# Value Bet Calculator

A powerful browser extension for sports bettors that helps identify profitable opportunities in football, basketball, and ice hockey markets. Calculate the true value of betting odds instantly and make smarter betting decisions.

## Overview

The Value Bet Calculator extension determines whether a bet offers "value" by comparing the true probability of an outcome with the implied probability from bookmaker odds. When the calculated value is positive, it indicates a potentially profitable betting opportunity where the odds are in your favor.

Using the formula **Value = (Probability × Odds) – 1**, this tool helps you identify bets where your estimated probability exceeds what the bookmaker is implying with their odds. This mathematical edge is the key to long-term profitability in sports betting.

## Features

- **Dual Calculation Modes**:
  - Manual mode for entering your own probability estimates
  - Auto mode with real-time odds from the Pinnacle Odds API
- **Top Value Opportunities**:
  - Daily updated list of top 10 value matches across all sports
  - Sort by value percentage to find the best opportunities
- **Sport-Specific Markets**:
  - Football (soccer) betting markets with 1X2 and total goals options
  - Basketball point spread and over/under markets
  - Ice hockey moneyline, puck line, and goal totals
- **Smart Interface**:
  - Dynamic dropdowns for filtering by sport, league, and match
  - Color-coded value display (green for positive value, red for negative)
  - Today's Matches filter to focus on current events
- **Data Management**:
  - API usage tracking with visual progress bar
  - Fallback to estimated odds when API data isn't available
  - Automatic data refresh every 15 minutes

## How To Use

### Manual Mode
1. Enter your estimated true probability as a percentage (e.g., 60%)
2. Enter the bookmaker odds (e.g., 2.00)
3. Click "Calculate Value"
4. View the result: positive values (in green) indicate value bets

### Auto Mode
1. Select a sport from the dropdown menu
2. Choose a league from the available options
3. Select a specific match
4. Pick a betting market (e.g., Home Win, Over 2.5 Goals)
5. Click "Calculate Value"
6. Review the odds, estimated probability, and calculated value

## Screenshots

*Screenshots coming soon showing:*
- *Manual calculation interface*
- *Auto mode with dropdown selections*
- *Positive and negative value displays*
- *Top 10 value bets dashboard*

## Privacy and Permissions

The Value Bet Calculator extension is designed with your privacy in mind:

- **Storage Permission**: Used only to store your preferences and track API usage limits
- **API Usage**: Connects to the Pinnacle Odds API to retrieve current betting odds
- **No Personal Data Collection**: The extension does not collect, store, or transmit any personal information
- **No Tracking**: We do not implement any analytics or user tracking functionality

## Installation

### From Browser Stores

- **Chrome**: [Chrome Web Store]([https://chromewebstore.google.com/detail/value-bet-calculator/ecpolligfbgacipimpmckmimlfnhkdff)
- **Firefox**: [Firefox Add-ons]([https://addons.mozilla.org/en-US/firefox/addon/value-bet-calculator/)
- **Microsoft Edge**: [Edge Add-ons]([https://microsoftedge.microsoft.com/addons/detail/value-bet-calculator/ohfhmlekaeelkepncjafikpnbdfeegpj)


### Manual Installation

1. Download the latest release ZIP file from the [releases page](https://github.com/OscarWilliamsChecklive/value-bet-calculator/releases)
2. Extract the ZIP file to a folder on your computer
3. In your browser, navigate to the extensions page:
   - Chrome: [Chrome Web Store]([https://chromewebstore.google.com/detail/value-bet-calculator/ecpolligfbgacipimpmckmimlfnhkdff)
   - Firefox: [Firefox Add-ons]([https://addons.mozilla.org/en-US/firefox/addon/value-bet-calculator/)
   - Edge: [Edge Add-ons]([https://microsoftedge.microsoft.com/addons/detail/value-bet-calculator/ohfhmlekaeelkepncjafikpnbdfeegpj)
   - Opera: `opera://extensions`
4. Enable "Developer Mode"
5. Click "Load unpacked" (or equivalent) and select the extracted folder

## Development

This extension is built with vanilla JavaScript, HTML, and CSS, requiring no build system or dependencies.

If you want to contribute to or modify the extension:

1. Clone the repository
   ```
   git clone https://github.com/OscarWilliamsChecklive/value-bet-calculator.git
   ```
2. Make your changes to the source files
3. Test locally using the manual installation steps above
4. Create a pull request with your improvements

The project structure is straightforward:
- `popup.html` - The main extension interface
- `src/js/` - JavaScript files for calculation logic and API interactions
- `src/css/` - Styling for the extension
- `src/icons/` - Extension icons in various sizes

## Sports Resources

Looking to improve your betting knowledge in specific sports? Check out these resources:

- [Football Livescore](https://checklive.com/sport-football) - Learn about value betting in football markets
- [Basketball Livescore](https://checklive.com/sport-basketball) - Expected value concepts for basketball betting
- [Ice Hockey Livescore](https://checklive.com/sport-ice-hockey) - Finding value in hockey odds

## License

This project is licensed under the MIT License:

```
MIT License

Copyright (c) 2024 Oscar Williams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Support

If you have questions, encounter issues, or want to provide feedback:

- **Website**: [https://checklive.com](https://checklive.com)
- **Email**: support@checklive.com
- **GitHub Issues**: Please submit bugs or feature requests through the [issue tracker](https://github.com/OscarWilliamsChecklive/value-bet-calculator/issues)

## Version History

- **1.0.3**: Performance improvements and bug fixes
- **1.0.2**: Added extension ID compatibility for Firefox
- **1.0.1**: Implemented smart rate limiting for API requests
- **1.0.0**: Initial release with manual and auto calculation modes 
=======
# value-bet-calculator
Browser extension for calculating value bets in football, basketball, and hockey
>>>>>>> 779fee041a1f976efe2156c725f4033ba7aa827b
