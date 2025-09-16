export function playBackgroundMusic() {
  if (document.getElementById('bg-audio')) return;

  const audio = document.createElement('audio');
  audio.id = 'bg-audio';
  audio.src = '/audio/end-of-line__daft-punk.mp3';
  audio.loop = true;
  audio.autoplay = true;
  audio.volume = 0.5;
  audio.style.position = 'fixed';
  audio.style.left = '-9999px';

  document.body.appendChild(audio);

  // Some browsers require user interaction before autoplay
  audio.addEventListener('canplay', () => {
    audio.play().catch(() => {});
  });
}
