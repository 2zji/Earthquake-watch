document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const msg = document.getElementById("message");
  if (res.ok) {
    msg.textContent = "✅ 가입 성공! 로그인 페이지로 이동합니다...";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500); // 1.5초 뒤 로그인 페이지로 이동
  } else {
    const data = await res.json();
    msg.textContent = `❌ ${data.error}`;
  }
});
