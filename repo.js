/* Own implementation. MIT License. */
(() => {
  const reserved = new Set(['settings', 'marketplace', 'topics', 'collections', 'events',
    'explore', 'search', 'orgs', 'users', 'login', 'signup', 'notifications',
    'new', 'organizations', 'account', 'codespaces', 'sponsors', 'features',
    'enterprise', 'about', 'pricing', 'security', 'apps', 'site', 'customer-stories', 'readme']);
  function parseRepository(input) {
    try {
      const url = new URL(input);
      if (url.protocol !== 'https:' || url.hostname !== 'github.com') return null;
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length < 2 || reserved.has(parts[0].toLowerCase())) return null;
      const owner = parts[0];
      const repo = parts[1].replace(/\.git$/i, '');
      if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(owner) ||
          !/^[a-z\d_.-]+$/i.test(repo) || repo === '.' || repo === '..') return null;
      return `${owner}/${repo}`;
    } catch { return null; }
  }
  globalThis.GitHubAI = Object.freeze({
    parseRepository,
    services: Object.freeze([
      { name: 'Gitingest', origin: 'https://gitingest.com' },
      { name: 'GitDiagram', origin: 'https://gitdiagram.com' },
      { name: 'DeepWiki', origin: 'https://deepwiki.com' }
    ])
  });
})();
