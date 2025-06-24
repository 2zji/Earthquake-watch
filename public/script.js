async function loadEarthquakes() {
  const ul = document.getElementById('list');
  ul.innerHTML = '<li>불러오는 중...</li>';

  try {
    const res = await fetch('/api/earthquakes');
    const data = await res.json();

    ul.innerHTML = '';

    if (!Array.isArray(data)) {
      ul.innerHTML = '<li>❌ 서버 오류로 데이터를 불러올 수 없습니다.</li>';
      console.warn('받은 데이터:', data);
      return;
    }

    if (data.length === 0) {
      ul.innerHTML = '<li>지진 정보가 없습니다.</li>';
      return;
    }

    data.forEach(e => {
      const li = document.createElement('li');
      li.textContent = `${e.date} | ${e.location} | 규모 ${e.magnitude}`;
      ul.appendChild(li);
    });
  } catch (err) {
    ul.innerHTML = '<li>❌ 데이터 로딩 실패</li>';
    console.error(err);
  }
}

loadEarthquakes();
setInterval(loadEarthquakes, 10 * 60 * 1000); // 10분마다 갱신
