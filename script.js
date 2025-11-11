let dictionary = [];

async function loadDictionary() {
  const res = await fetch('data.json');
  dictionary = await res.json();
  showResults(dictionary); // tampilkan semua saat halaman dibuka
}

function showResults(list) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = list.map(entry => `
    <div class="entry">
      <strong>${entry.mandarin}</strong> (${entry.pinyin})<br>
      ${entry.indonesia}
    </div>
    <hr>
  `).join('');
}

document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  const filtered = dictionary.filter(entry =>
    entry.indonesia.toLowerCase().includes(query) ||
    entry.mandarin.toLowerCase().includes(query) ||
    entry.pinyin.toLowerCase().includes(query)
  );
  showResults(filtered);
});

window.onload = loadDictionary;
