/* Own implementation. MIT License. */
(() => {
  const label = document.getElementById('repo');
  const status = document.getElementById('status');
  const buttons = [...document.querySelectorAll('button')];
  let busy = false;
  async function openServices(indices) {
    if (busy) return;
    busy = true;
    buttons.forEach(button => { button.disabled = true; });
    let opened = 0;
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const repo = GitHubAI.parseRepository(tab?.url);
      if (!repo) throw new Error('请先打开一个 GitHub 仓库页面。');
      for (const index of indices) {
        const service = GitHubAI.services[index];
        await chrome.tabs.create({ url: `${service.origin}/${repo}`, active: false,
          windowId: tab.windowId, index: tab.index + 1 + opened, openerTabId: tab.id });
        opened += 1;
      }
      status.textContent = `已在后台打开 ${opened} 个新标签页。`;
    } catch (error) {
      status.textContent = `${opened ? `已打开 ${opened} 个标签页；` : ''}${error.message}`;
    } finally {
      busy = false;
      await refresh();
    }
  }
  async function refresh() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const repo = GitHubAI.parseRepository(tab?.url);
      label.textContent = repo || '请先打开 github.com/作者/仓库';
      buttons.forEach(button => { button.disabled = !repo || busy; });
    } catch {
      label.textContent = '无法读取当前标签页，请关闭弹窗后重试。';
      buttons.forEach(button => { button.disabled = true; });
    }
  }
  document.querySelectorAll('[data-service]').forEach(button => {
    button.addEventListener('click', () => openServices([Number(button.dataset.service)]));
  });
  document.getElementById('all').addEventListener('click', () => openServices([0, 1, 2]));
  refresh();
})();
