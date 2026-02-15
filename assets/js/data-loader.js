// ========================================
// DATA LOADER - Fetch and parse profile.json
// ========================================

class DataLoader {
  constructor() {
    this.data = null;
    this.loaded = false;
  }

  /**
   * Load profile data from JSON file
   * @returns {Promise<Object>} Profile data
   */
  async loadProfile() {
    try {
      const response = await fetch('./profile.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.data = await response.json();
      this.loaded = true;
      console.log('✅ Profile data loaded successfully');
      return this.data;
      
    } catch (error) {
      console.error('❌ Error loading profile data:', error);
      this.showErrorMessage();
      throw error;
    }
  }

  /**
   * Display error message to user if data fails to load
   */
  showErrorMessage() {
    const errorHTML = `
      <div class="error-container" style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(239, 68, 68, 0.1);
        border: 2px solid #ef4444;
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        z-index: 9999;
      ">
        <h2 style="color: #ef4444; margin-bottom: 1rem;">⚠️ Failed to Load Profile Data</h2>
        <p style="color: #fca5a5;">Please check your internet connection and refresh the page.</p>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', errorHTML);
  }

  /**
   * Get specific section of profile data
   * @param {string} section - Section name (e.g., 'projects', 'skills')
   * @returns {*} Section data
   */
  getSection(section) {
    if (!this.loaded) {
      console.warn('Data not loaded yet. Call loadProfile() first.');
      return null;
    }
    return this.data[section];
  }

  /**
   * Get all profile data
   * @returns {Object} Full profile data
   */
  getAllData() {
    return this.data;
  }
}

// Export singleton instance
const dataLoader = new DataLoader();
