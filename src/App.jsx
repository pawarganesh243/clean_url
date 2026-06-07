import React, { useState, useEffect } from 'react';
import { Plus, ArrowUpRight, CheckCircle, AlertCircle, Loader2, Copy, ChevronDown } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { validateUrl, cleanUrl } from './utils/urlCleaner';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  const handleSubmit = async () => {
    if (!url.trim()) {
      setErrorMessage('Please enter a URL');
      setStatus('error');
      return;
    }

    // Auto-prepend https:// if missing
    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    if (!validateUrl(targetUrl)) {
      setErrorMessage('Please enter a valid URL (e.g., https://example.com)');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setShortenedUrl(null);
    setCopied(false);

    setTimeout(() => {
      const finalCleanUrl = cleanUrl(targetUrl);

      setStatus('success');
      setShortenedUrl(finalCleanUrl);
      setUrl('');

      setTimeout(() => {
        setStatus('idle');
      }, 3000);

    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        if (status === 'error') setStatus('idle');
      }
    } catch (err) {
      console.error('Failed to read clipboard: ', err);
    }
  };

  return (
    <div className="layout">
      {/* Soft ambient background */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <main className="main-content">
        <div className="content-wrapper">
          <h1 className="main-title">Clean Your URL</h1>
          <p className="subtext">Strip away tracking parameters and messy data in one click.</p>

          <div className={`url-input-field ${status === 'error' ? 'error-state' : ''}`}>
            <textarea
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste a long, messy link here..."
              className="textarea"
              disabled={status === 'loading'}
            ></textarea>

            <div className="icon-plus" onClick={handlePaste} title="Paste from clipboard">
              <Plus size={20} color="var(--accent-blue-1)" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === 'loading' || status === 'success'}
              className={`btn btn-submit ${status === 'success' ? 'success' : ''}`}
            >
              {status === 'loading' ? (
                <Loader2 size={18} className="spinner" />
              ) : status === 'success' ? (
                <>
                  <span>Cleaned!</span>
                  <CheckCircle size={18} />
                </>
              ) : (
                <>
                  <span>Clean URL</span>
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>
          </div>

          {status === 'error' && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {shortenedUrl && (
            <div className="result-card">
              <div className="result-label">Your original cleaned URL</div>
              <div className="result-url-container">
                <a href={shortenedUrl} target="_blank" rel="noreferrer" className="result-url">
                  {shortenedUrl}
                </a>
                <button onClick={handleCopy} className={`btn copy-btn ${copied ? 'copied' : ''}`}>
                  {copied ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {!shortenedUrl && status !== 'loading' && status !== 'error' && (
          <div className="scroll-cue">
            <ChevronDown size={24} className="bounce-animation" />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
