// Minimal JS to load video data and render cards, supports local files and YouTube IDs/URLs
async function fetchVideos(){
  try{
    const res = await fetch('data/videos.json');
    if(!res.ok) throw new Error('Could not fetch videos.json');
    return await res.json();
  }catch(e){console.error(e);return []}
}

function createCard(video){
  const tmpl = document.getElementById('video-card-template');
  if(!tmpl) return null;
  const el = tmpl.content.cloneNode(true);
  const article = el.querySelector('.video-card');
  const img = el.querySelector('.thumb');
  const title = el.querySelector('.video-title');
  const desc = el.querySelector('.video-desc');
  const play = el.querySelector('.play-thumb');

  img.src = video.thumbnail || (video.type==='youtube' ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` : 'assets/images/video-placeholder.png');
  img.alt = video.title || '';
  title.textContent = video.title || 'Untitled';
  desc.textContent = video.description || '';

  play.addEventListener('click', ()=>openPlayer(video));
  return article ? article : el;
}

function parseYouTubeId(urlOrId){
  if(!urlOrId) return null;
  // if it's already an ID (no slashes) return
  if(!urlOrId.includes('/')) return urlOrId;
  try{
    const u = new URL(urlOrId);
    if(u.hostname.includes('youtube') || u.hostname.includes('youtu.be')){
      if(u.hostname==='youtu.be') return u.pathname.slice(1);
      return u.searchParams.get('v');
    }
  }catch(e){return null}
  return null;
}

function openPlayer(video){
  const modal = document.getElementById('player-modal');
  const playerArea = document.getElementById('player-area');
  playerArea.innerHTML = '';
  if(video.type==='local'){
    const v = document.createElement('video');
    v.controls = true; v.src = video.src; v.setAttribute('playsinline',''); v.autoplay = true;
    playerArea.appendChild(v);
  }else{
    // youtube
    const id = parseYouTubeId(video.id || video.src);
    const iframe = document.createElement('iframe');
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    playerArea.appendChild(iframe);
  }
  modal.hidden = false;
}

function closePlayer(){
  const modal = document.getElementById('player-modal');
  const playerArea = document.getElementById('player-area');
  playerArea.innerHTML = '';
  modal.hidden = true;
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const list = document.getElementById('videos-list');
  const modal = document.getElementById('player-modal');
  const close = document.getElementById('modal-close');
  if(close) close.addEventListener('click', closePlayer);
  if(modal) modal.addEventListener('click', (e)=>{ if(e.target===modal) closePlayer(); });

  const videos = await fetchVideos();
  if(!videos || !videos.length){ list.innerHTML = '<p>No videos found. Edit <code>data/videos.json</code> to add some.</p>'; return; }
  videos.forEach(v=>{
    const card = createCard(v);
    if(card) list.appendChild(card);
  });
});
