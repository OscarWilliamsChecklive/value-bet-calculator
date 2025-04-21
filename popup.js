/**
 * Value Bet Calculator - Main JavaScript
 * 
 * Provides functionality for both manual and automatic value bet calculations,
 * as well as displaying top value bets across supported sports.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Constants
  const MAX_API_CALLS = 10; // Maximum API calls per day
  const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds
  
  // Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // Manual calculation elements
  const probabilityInput = document.getElementById('probability');
  const oddsInput = document.getElementById('odds');
  const manualCalculateBtn = document.getElementById('manual-calculate');
  const impliedProbability = document.getElementById('implied-probability');
  const manualValueResult = document.getElementById('manual-value-result');
  
  // Auto calculation elements
  const sportSelect = document.getElementById('sport-select');
  const leagueSelect = document.getElementById('league-select');
  const matchSelect = document.getElementById('match-select');
  const marketSelect = document.getElementById('market-select');
  const todayOnlyToggle = document.getElementById('today-only');
  const autoCalculateBtn = document.getElementById('auto-calculate');
  const autoOddsResult = document.getElementById('auto-odds-result');
  const autoProbabilityResult = document.getElementById('auto-probability-result');
  const autoValueResult = document.getElementById('auto-value-result');
  
  // Top bets elements
  const topBetsSport = document.getElementById('top-bets-sport');
  const refreshTopBetsBtn = document.getElementById('refresh-top-bets');
  const topBetsBody = document.getElementById('top-bets-body');
  
  // API usage elements
  const apiUsageBar = document.getElementById('api-usage-bar');
  const apiUsageCount = document.getElementById('api-usage-count');
  const refreshDataBtn = document.getElementById('refresh-data');
  const lastUpdatedElement = document.getElementById('last-updated');
  
  // Global variables
  let apiCallsRemaining = MAX_API_CALLS;
  let lastRefreshTime = 0;
  let allMatches = [];
  let allLeagues = [];
  let topValueBets = [];
  
  // Mock API data (in a real extension, this would be fetched from a real API)
  const sportsData = [
    { id: 1, name: 'Football' },
    { id: 2, name: 'Basketball' },
    { id: 3, name: 'Ice Hockey' }
  ];
  
  const leaguesData = {
    football: [
      { id: 101, name: 'Premier League' },
      { id: 102, name: 'La Liga' },
      { id: 103, name: 'Bundesliga' },
      { id: 104, name: 'Serie A' },
      { id: 105, name: 'Ligue 1' }
    ],
    basketball: [
      { id: 201, name: 'NBA' },
      { id: 202, name: 'EuroLeague' },
      { id: 203, name: 'NCAA' }
    ],
    hockey: [
      { id: 301, name: 'NHL' },
      { id: 302, name: 'KHL' },
      { id: 303, name: 'SHL' }
    ]
  };
  
  const matchesData = {
    101: [
      { id: 1001, name: 'Arsenal vs Chelsea', startTime: '2024-05-10T15:00:00Z' },
      { id: 1002, name: 'Liverpool vs Man City', startTime: '2024-05-11T12:30:00Z' },
      { id: 1003, name: 'Man Utd vs Tottenham', startTime: '2024-05-12T16:00:00Z' }
    ],
    102: [
      { id: 1004, name: 'Barcelona vs Real Madrid', startTime: '2024-05-10T19:00:00Z' },
      { id: 1005, name: 'Atletico Madrid vs Sevilla', startTime: '2024-05-11T17:00:00Z' }
    ],
    201: [
      { id: 2001, name: 'Lakers vs Warriors', startTime: '2024-05-10T23:00:00Z' },
      { id: 2002, name: 'Celtics vs Bucks', startTime: '2024-05-11T21:30:00Z' }
    ],
    301: [
      { id: 3001, name: 'Maple Leafs vs Canadiens', startTime: '2024-05-10T23:00:00Z' },
      { id: 3002, name: 'Bruins vs Rangers', startTime: '2024-05-11T19:00:00Z' }
    ]
  };
  
  const marketsData = {
    1001: [
      { id: 10011, name: 'Home Win', odds: 2.10, fairProb: 0.52 },
      { id: 10012, name: 'Draw', odds: 3.40, fairProb: 0.28 },
      { id: 10013, name: 'Away Win', odds: 3.80, fairProb: 0.20 },
      { id: 10014, name: 'Over 2.5 Goals', odds: 1.90, fairProb: 0.56 },
      { id: 10015, name: 'Under 2.5 Goals', odds: 2.00, fairProb: 0.48 }
    ],
    1002: [
      { id: 10021, name: 'Home Win', odds: 2.60, fairProb: 0.40 },
      { id: 10022, name: 'Draw', odds: 3.30, fairProb: 0.30 },
      { id: 10023, name: 'Away Win', odds: 2.80, fairProb: 0.38 }
    ],
    2001: [
      { id: 20011, name: 'Home Win', odds: 1.85, fairProb: 0.60 },
      { id: 20012, name: 'Away Win', odds: 2.10, fairProb: 0.43 },
      { id: 20013, name: 'Over 220.5 Points', odds: 1.90, fairProb: 0.56 },
      { id: 20014, name: 'Under 220.5 Points', odds: 1.95, fairProb: 0.51 }
    ],
    3001: [
      { id: 30011, name: 'Home Win', odds: 2.30, fairProb: 0.48 },
      { id: 30012, name: 'Away Win', odds: 1.75, fairProb: 0.57 },
      { id: 30013, name: 'Over 5.5 Goals', odds: 2.05, fairProb: 0.53 },
      { id: 30014, name: 'Under 5.5 Goals', odds: 1.85, fairProb: 0.50 }
    ]
  };
  
  // Tab switching
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show the selected tab pane
      tabPanes.forEach(pane => pane.classList.remove('active'));
      document.getElementById(`${tabId}-tab`).classList.add('active');
      
      // Load tab-specific data if needed
      if (tabId === 'top10') {
        loadTopValueBets();
      }
    });
  });
  
  // Manual calculation
  manualCalculateBtn.addEventListener('click', () => {
    const probability = parseFloat(probabilityInput.value) / 100;
    const odds = parseFloat(oddsInput.value);
    
    if (isNaN(probability) || isNaN(odds) || probability <= 0 || probability >= 1 || odds <= 1) {
      alert('Please enter valid values:\n- Probability between 1 and 99\n- Odds greater than 1.0');
      return;
    }
    
    // Calculate implied probability from odds
    const impliedProb = (1 / odds).toFixed(2);
    impliedProbability.textContent = `${(impliedProb * 100).toFixed(0)}%`;
    
    // Calculate value
    const value = (probability * odds - 1).toFixed(2);
    manualValueResult.textContent = `${value > 0 ? '+' : ''}${value}`;
    
    // Apply styling based on value
    if (parseFloat(value) > 0) {
      manualValueResult.className = 'result-value positive-value';
    } else {
      manualValueResult.className = 'result-value negative-value';
    }
  });
  
  // Sport selection change
  sportSelect.addEventListener('change', () => {
    const selectedSport = sportSelect.value;
    
    // Reset dependent dropdowns
    leagueSelect.innerHTML = '<option value="">Select League</option>';
    matchSelect.innerHTML = '<option value="">Select Match</option>';
    marketSelect.innerHTML = '<option value="">Select Market</option>';
    
    // Disable calculate button
    autoCalculateBtn.disabled = true;
    
    // Clear results
    clearAutoResults();
    
    if (selectedSport) {
      // Enable league dropdown
      leagueSelect.disabled = false;
      
      // Populate leagues for the selected sport
      const leagues = leaguesData[selectedSport] || [];
      leagues.forEach(league => {
        const option = document.createElement('option');
        option.value = league.id;
        option.textContent = league.name;
        leagueSelect.appendChild(option);
      });
    } else {
      leagueSelect.disabled = true;
      matchSelect.disabled = true;
      marketSelect.disabled = true;
    }
  });
  
  // League selection change
  leagueSelect.addEventListener('change', () => {
    const selectedLeague = leagueSelect.value;
    
    // Reset dependent dropdowns
    matchSelect.innerHTML = '<option value="">Select Match</option>';
    marketSelect.innerHTML = '<option value="">Select Market</option>';
    
    // Disable calculate button
    autoCalculateBtn.disabled = true;
    
    // Clear results
    clearAutoResults();
    
    if (selectedLeague) {
      // Enable match dropdown
      matchSelect.disabled = false;
      
      // Get matches for the selected league
      const matches = matchesData[selectedLeague] || [];
      
      // Filter today's matches if the toggle is on
      let filteredMatches = matches;
      if (todayOnlyToggle.checked) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        filteredMatches = matches.filter(match => {
          const matchDate = new Date(match.startTime);
          return matchDate >= today && matchDate < tomorrow;
        });
      }
      
      // Populate matches dropdown
      filteredMatches.forEach(match => {
        const option = document.createElement('option');
        option.value = match.id;
        option.textContent = match.name;
        matchSelect.appendChild(option);
      });
    } else {
      matchSelect.disabled = true;
      marketSelect.disabled = true;
    }
  });
  
  // Today only toggle change
  todayOnlyToggle.addEventListener('change', () => {
    // Re-trigger league selection to filter matches
    if (leagueSelect.value) {
      leagueSelect.dispatchEvent(new Event('change'));
    }
  });
  
  // Match selection change
  matchSelect.addEventListener('change', () => {
    const selectedMatch = matchSelect.value;
    
    // Reset market dropdown
    marketSelect.innerHTML = '<option value="">Select Market</option>';
    
    // Disable calculate button
    autoCalculateBtn.disabled = true;
    
    // Clear results
    clearAutoResults();
    
    if (selectedMatch) {
      // Enable market dropdown
      marketSelect.disabled = false;
      
      // Get markets for the selected match
      const markets = marketsData[selectedMatch] || [];
      
      // Populate markets dropdown
      markets.forEach(market => {
        const option = document.createElement('option');
        option.value = market.id;
        option.textContent = market.name;
        // Store market data for later use
        option.dataset.market = JSON.stringify(market);
        marketSelect.appendChild(option);
      });
    } else {
      marketSelect.disabled = true;
    }
  });
  
  // Market selection change
  marketSelect.addEventListener('change', () => {
    // Enable/disable calculate button based on selection
    autoCalculateBtn.disabled = !marketSelect.value;
  });
  
  // Auto calculation
  autoCalculateBtn.addEventListener('click', () => {
    const selectedOption = marketSelect.options[marketSelect.selectedIndex];
    if (!selectedOption || !selectedOption.dataset.market) {
      return;
    }
    
    // Decrease API calls remaining (simulating API usage)
    updateApiCallsRemaining();
    
    // Get market data
    const market = JSON.parse(selectedOption.dataset.market);
    
    // Display odds and probability
    autoOddsResult.textContent = market.odds.toFixed(2);
    autoProbabilityResult.textContent = `${(market.fairProb * 100).toFixed(0)}%`;
    
    // Calculate value
    const value = (market.fairProb * market.odds - 1).toFixed(2);
    autoValueResult.textContent = `${value > 0 ? '+' : ''}${value}`;
    
    // Apply styling based on value
    if (parseFloat(value) > 0) {
      autoValueResult.className = 'result-value positive-value';
    } else {
      autoValueResult.className = 'result-value negative-value';
    }
  });
  
  // Load top value bets
  function loadTopValueBets() {
    const selectedSport = topBetsSport.value;
    
    // Decrease API calls remaining (simulating API usage)
    updateApiCallsRemaining();
    
    // Clear existing rows
    topBetsBody.innerHTML = '';
    
    // Generate top value bets (in a real extension, this would be fetched from the API)
    let allBets = [];
    
    // Collect all markets from all matches
    Object.keys(marketsData).forEach(matchId => {
      const match = Object.values(matchesData)
        .flat()
        .find(m => m.id.toString() === matchId);
      
      if (!match) return;
      
      // Get the sport type from the league
      let sportType = '';
      for (const [sport, leagues] of Object.entries(leaguesData)) {
        for (const league of leagues) {
          if (Object.keys(matchesData).includes(league.id.toString())) {
            if (matchesData[league.id].some(m => m.id.toString() === matchId)) {
              sportType = sport;
              break;
            }
          }
        }
        if (sportType) break;
      }
      
      if (selectedSport !== 'all' && sportType !== selectedSport) return;
      
      marketsData[matchId].forEach(market => {
        const value = (market.fairProb * market.odds - 1);
        allBets.push({
          match: match.name,
          market: market.name,
          odds: market.odds,
          prob: market.fairProb,
          value: value,
          sportType: sportType
        });
      });
    });
    
    // Sort by value (descending) and take top 10
    const topBets = allBets
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
    
    // Populate the table
    topBets.forEach(bet => {
      const row = document.createElement('tr');
      
      const matchCell = document.createElement('td');
      matchCell.textContent = bet.match;
      
      const marketCell = document.createElement('td');
      marketCell.textContent = bet.market;
      
      const oddsCell = document.createElement('td');
      oddsCell.textContent = bet.odds.toFixed(2);
      
      const probCell = document.createElement('td');
      probCell.textContent = `${(bet.prob * 100).toFixed(0)}%`;
      
      const valueCell = document.createElement('td');
      valueCell.textContent = `${bet.value > 0 ? '+' : ''}${bet.value.toFixed(2)}`;
      valueCell.className = bet.value > 0 ? 'positive-value' : 'negative-value';
      
      row.appendChild(matchCell);
      row.appendChild(marketCell);
      row.appendChild(oddsCell);
      row.appendChild(probCell);
      row.appendChild(valueCell);
      
      topBetsBody.appendChild(row);
    });
  }
  
  // Refresh top bets button
  refreshTopBetsBtn.addEventListener('click', loadTopValueBets);
  
  // Refresh data button
  refreshDataBtn.addEventListener('click', refreshData);
  
  // Helper functions
  function clearAutoResults() {
    autoOddsResult.textContent = '-';
    autoProbabilityResult.textContent = '-';
    autoValueResult.textContent = '-';
    autoValueResult.className = 'result-value';
  }
  
  function updateApiCallsRemaining() {
    apiCallsRemaining = Math.max(0, apiCallsRemaining - 1);
    
    // Update UI
    const percentage = (apiCallsRemaining / MAX_API_CALLS) * 100;
    apiUsageBar.style.width = `${percentage}%`;
    apiUsageCount.textContent = `${apiCallsRemaining}/${MAX_API_CALLS}`;
    
    // Store in browser storage
    chrome.storage.local.set({ apiCallsRemaining });
  }
  
  function refreshData() {
    if (apiCallsRemaining <= 0) {
      alert('API call limit reached for today. Please try again tomorrow.');
      return;
    }
    
    // Simulate data refresh
    lastRefreshTime = Date.now();
    lastUpdatedElement.textContent = `Last updated: ${formatTime(new Date())}`;
    
    // Decrease API calls remaining
    updateApiCallsRemaining();
  }
  
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Load API calls remaining from storage
  function loadApiCallsRemaining() {
    chrome.storage.local.get(['apiCallsRemaining', 'lastResetDate'], (data) => {
      const today = new Date().toDateString();
      
      if (data.lastResetDate !== today) {
        // Reset the counter if it's a new day
        apiCallsRemaining = MAX_API_CALLS;
        chrome.storage.local.set({
          apiCallsRemaining: apiCallsRemaining,
          lastResetDate: today
        });
      } else if (data.apiCallsRemaining !== undefined) {
        apiCallsRemaining = data.apiCallsRemaining;
      }
      
      // Update UI
      const percentage = (apiCallsRemaining / MAX_API_CALLS) * 100;
      apiUsageBar.style.width = `${percentage}%`;
      apiUsageCount.textContent = `${apiCallsRemaining}/${MAX_API_CALLS}`;
    });
  }
  
  // Initialize
  loadApiCallsRemaining();
}); 