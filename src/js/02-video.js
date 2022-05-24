import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

if (localStorage.getItem('videoplayer-current-time') !== '0') {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
  console.log(localStorage.getItem('videoplayer-current-time'))
};
