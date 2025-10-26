export function setupAuth() {
  const loginPage = document.getElementById("loginPage");
  const signupPage = document.getElementById("signupPage");
  const toSignup = document.getElementById("toSignup");
  const toLogin = document.getElementById("toLogin");
  
  let showLogin = true;

  function renderPage() {
    loginPage.style.display = showLogin ? "block" : "none";
    signupPage.style.display = showLogin ? "none" : "block";
  }

  toSignup?.addEventListener("click", e => { e.preventDefault(); showLogin = false; renderPage(); });
  toLogin?.addEventListener("click", e => { e.preventDefault(); showLogin = true; renderPage(); });

  renderPage();
}
