document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("Please select a file");
    return;
  }

  document.getElementById("status").innerText =
    "File '" + file.name + "' ready (connect backend to store it).";
});