async function loadEarthquakes() {
  const ul = document.getElementById("list");
  ul.innerHTML = "<li>불러오는 중...</li>";

  try {
    const res = await fetch("/api/earthquakes");
    const data = await res.json();

    ul.innerHTML = "";

    if (!Array.isArray(data)) {
      ul.innerHTML = "<li>❌ 서버 오류로 데이터를 불러올 수 없습니다.</li>";
      console.warn("받은 데이터:", data);
      return;
    }

    if (data.length === 0) {
      ul.innerHTML = "<li>지진 정보가 없습니다.</li>";
      return;
    }

    data.forEach((e) => {
      const li = document.createElement("li");
      li.textContent = `${e.date} | ${e.location} | 규모 ${e.magnitude}`;
      ul.appendChild(li);

      // 지도에 마커 추가
      if (e.lat && e.lon) {
        L.marker([e.lat, e.lon])
          .addTo(map)
          .bindPopup(
            `<strong>${e.date}</strong><br>${e.location}<br>규모 ${e.magnitude}`
          );
      }
    });
  } catch (err) {
    ul.innerHTML = "<li>❌ 데이터 로딩 실패</li>";
    console.error(err);
  }
}

// 지도 초기화
const map = L.map("map").setView([36.5, 127.5], 6); // 대한민국 중앙

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// 처음 실행 + 10분마다 자동 갱신
loadEarthquakes();
setInterval(loadEarthquakes, 10 * 60 * 1000);
