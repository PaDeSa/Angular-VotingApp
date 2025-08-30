// Exemple de script JS si tu veux mettre à jour dynamiquement
document.addEventListener('DOMContentLoaded', () => {
  // Tu peux récupérer les données via API ici
  // Exemple fictif :
  const data = {
    voters: 12000,
    votes: 8500,
    candidates: 6
  };

  document.getElementById('voters').textContent = data.voters.toLocaleString();
  document.getElementById('votes').textContent = data.votes.toLocaleString();
  document.getElementById('candidates').textContent = data.candidates;
});
