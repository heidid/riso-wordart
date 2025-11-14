const exportGif = () => {
  const originalButtonText = exportButton.innerHTML;
  exportButton.innerHTML = "exporting…";
  exportButton.disabled = true;

  const gif = new GIF();

  let frameNumber = 1;

  const timerId = setInterval(() => {
    if (frameNumber > FRAMES_PER_CHARACTER) {
      clearInterval(timerId);

      gif.on('finished', (blob) => {
        window.open(URL.createObjectURL(blob));
        exportButton.innerHTML = originalButtonText;
        exportButton.disabled = false;
      });
      gif.render();

      return;
    }
    gif.addFrame(canvas, {
      delay: FRAME_DURATION,
      copy: true
    });
    exportButton.innerHTML = `exporting frame ${frameNumber} of ${FRAMES_PER_CHARACTER}…`;
    frameNumber++;
  }, FRAME_DURATION);
};

const exportButton = document.getElementById('export-button');
exportButton.addEventListener('click', exportGif);