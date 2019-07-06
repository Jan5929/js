function updateSync() {
  for (let i = 0; i < 1000000; i++) {
    document.getElementById('output').innerHTML = i
  }
}

function updateAsync() {
  let i = 0;
  function updateLater() {
    document.getElementById('output').innerHTML = (i++)
    if (i < 11000000 ) {
      setTimeout(updateLater, 0)
    }
  }
  updateLater()
}
