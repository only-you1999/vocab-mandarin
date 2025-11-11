async function loadDictionary() {
  const res = await fetch('data.json');
  return await res.json();
}

document.getElementById('searchInput').addEventListener('input', async function() {
  const query = this.value.trim().toLowerCase();
  const dict = await loadDictionary();
  const resultDiv = document.getElementById('result');

  if (!query) {
    resultDiv.innerHTML = '';
    return;
  }

  const found = dict.filter(entry =>
    entry.indonesia.toLowerCase().includes(query) ||
    entry.mandarin.toLowerCase().includes(query) ||
    entry.pinyin.toLowerCase().includes(query)
  );

  if (found.length === 0) {
    resultDiv.innerHTML = '<p>Tidak ditemukan.</p>';
  } else {
    resultDiv.innerHTML = found.map(entry => `
      <div class="entry">
        <strong>${entry.mandarin}</strong> (${entry.pinyin})<br>
        ${entry.indonesia}
      </div>
      <hr>
    `).join('');
  }
});

