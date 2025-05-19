

let songName = document.querySelector('#song_name');
let playPauseImage = document.querySelector('#play_pause');
let songSinger = document.querySelector('#song_singer');
let songImage = document.querySelector('.song-image');
 let volumeRange = document.querySelector('#volume-range');
 let songRange = document.querySelector('#song_duration');
 let volSvg = document.querySelector('#vol-svg');
 let musicAnim = document.querySelector('#musicanim');
 let playListImage =  document.querySelector('#playlist-image');
 let playlist =  document.querySelector('.playlist');
let playlistSong = document.querySelectorAll(".playlist-song")



let index = 0;

let playingSong = false;

let track = document.createElement('audio');

let songs = [
  {
   name:'Ve kamleya',
   path:'./Assests/firstsong.mp3',
   image:'./Assests/image1.jpg',
   singer: 'Arijit singh'
  }, 

   {
     name:'Apana Bana Le',
     path:'./Assests/secondsong.mp3',
     image:'./Assests/image2.jpg',
     singer: 'Arijit singh'
  },

  {
     name:'Pehale Bhi Me',
     path:'./Assests/thirdsong.mp3',
     image:'./Assests/image3.jpg',
     singer: 'Vishal Mishra'
  },

  {
     name:'satranga',
     path:'./Assests/fourthsong.mp3',
     image:'./Assests/image4.jpg',
     singer: 'Arijit singh'
},

];

function loadTrack(index){
track.src= songs[index].path;
songName.innerHTML = songs[index].name; 
songSinger.innerHTML = songs[index].singer; 
songImage.style= `background-image: url("${songs[index].image}");`  
volume()
duration()
setInterval(() => {
songRange.max= track.duration
songRange.value = track.currentTime
},1000)
track.loop=true


track.load()
}

loadTrack(index);

function playPause(){
  if(playingSong == false){
playSong()


  }else{
    pauseSong()
  
  }
}

function playSong(){
track.play();
playingSong=true;
 playPauseImage.src= "./Assests/pause.svg"
 musicAnim.style.display = 'block'; 

}

function pauseSong(){
   track.pause();
   playingSong = false;
   playPauseImage.src= "./Assests/play.svg" 
     musicAnim.style.display = 'none';
 }

function nextSong(){
   if(index < songs.length-1){
 index++
 loadTrack(index)
 playSong()
   }else{
     index=0;
     loadTrack(index);
     playSong()
   }
}







function previousSong(){
  if(index > 0){
index--;
loadTrack(index);
playSong(); 
  } else{
    index = songs.length-1;
    loadTrack(index);
playSong(); 
  }
}

function volume(){
track.volume = volumeRange.value/100
if(volumeRange.value == 0){
volSvg.src = './Assests/mute.svg'
}else{
  volSvg.src = './Assests/Volume.svg'
}
}

function duration(){
track.currentTime = songRange.value
}



playListImage.addEventListener('click', () =>{
playlist.classList.toggle('playlist-active');

if(playlist.classList.contains('playlist-active')){
  playListImage.src= "./Assests/cross.svg";
}else{
  playListImage.src= "./Assests/playlist.svg";
}

})

playlistSong.forEach((song, index) => {
    song.addEventListener('click', () => {
        loadTrack(index);
        playSong();
        playlist.classList.remove("playlist-active");
        playListImage.src = "./Assests/playlist.svg"; // correct path and variable
    });
});







