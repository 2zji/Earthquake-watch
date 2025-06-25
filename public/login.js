document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const msg = document.getElementById("message");
  if (res.ok) {
    msg.textContent = "✅ 로그인 성공!";
    // 이후 메인 페이지로 이동
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    const data = await res.json();
    msg.textContent = `❌ ${data.error}`;
  }
});
