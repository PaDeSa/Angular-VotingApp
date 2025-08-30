function startVoting() {
  alert("Redirection vers la plateforme de vote sécurisée...");
  // Ici, tu pourrais rediriger vers une autre page : window.location.href = "/vote.html";
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Message envoyé. Nous vous répondrons sous peu !");
  this.reset();
});
