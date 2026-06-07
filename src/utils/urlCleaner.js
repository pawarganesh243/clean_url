export const validateUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const cleanUrl = (urlString) => {
  try {
    const urlObj = new URL(urlString);
    
    // Extensive list of tracking, session, marketing, and non-essential params
    const paramsToRemove = [
      'ref', 'source', 'campaign', 'tracking_id', 'session_click', 'click_pos',
      'fbclid', 'gclid', 'locale', 'variant', 'mc_cid', 'mc_eid', 'igshid', '_ga',
      'pd_rd_r', 'pd_rd_w', 'pd_rd_wg', 'pf_rd_p', 'pf_rd_r', 'psc'
    ];

    const keys = Array.from(urlObj.searchParams.keys());
    keys.forEach(key => {
      const lowerKey = key.toLowerCase();
      if (
        paramsToRemove.includes(lowerKey) || 
        lowerKey.startsWith('utm_') || 
        lowerKey.startsWith('si') // sometimes used for sharing IDs
      ) {
        urlObj.searchParams.delete(key);
      }
    });

    // Strip URL fragments/anchors
    urlObj.hash = '';

    return urlObj.toString();
  } catch (e) {
    return urlString;
  }
};
