// Description: Fetches a song from a JSON file and handles errors

fetchSong();
let songList = [];
let index = 0; // Initialize index to keep track of the current song
// let newsongList = [];
const toggleBtn = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
async function fetchSong()
{
    const response=await fetch('./song.json')
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    songList = await response.json();
    // playSong(songList[0]);
    playSong(songList[0]);
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play"); 
    
    // newsongList = [...songList];
    console.log(songList);
    displaysong(songList);
}
// playSong(songList[0]); // Play the first song by default

//Arrow function syntax
const displaysong = (songList) => {
    // const songListElement=document.getElementById('songlist');
    let  songsDisplay=document.getElementById('songListDisplayul');
    songsDisplay.innerHTML = '';
    songList.forEach((song)=>{
        const songItem=document.createElement('li');
        songItem.textContent= `${song.title} -${song.artist}`;
        const  songImage=document.createElement('img');
        songImage.className = 'song-image'; // Add a class for styling
    
        songImage.src = song.artwork;
        songImage.alt = `${song.title} cover image`;

        songsDisplay.appendChild(songItem);
        songItem.appendChild(songImage);
        songItem.addEventListener('click',(event)=>{
            event.preventDefault();
          
        
       
            playSong(song);            
        })

    })  
}
const audio = new Audio();// Creating a new audio elemnt as global varibale for use any where int the code



const playSong=(song)=>{
    console.log(`Playing song: ${song.title} by ${song.artist} -${song.url}`);
    const songImageDisplay = document.getElementById("musicimage");
    songImageDisplay.innerHTML = ""; // Clear previous image
    const songImage = document.createElement("img");

    songImage.className = "songimage"; // Add a class for styling
    songImage.src = song.artwork;
    songImageDisplay.appendChild(songImage);  
    const songDetails = document.getElementById("musicDetails");
    // songDetails.innerHTML = ""; // Clear previous details
    songDetails.innerHTML = `<h3>${song.title}</h3><h3>${song.artist}</h3>`;

    audio.src = song.url; 
    

     index=songList.indexOf(song);//finding the index of the song in the songList array// Reset icon to play state
   
        audio.play().catch((error) => {
          console.error("Error playing the song:", error);
        });
        


     
  
  
   
    // console.log(index)
    // console.log(`Index of the song in the list: ${index}`);
  
    audio.play( ).catch(error => {
        console.error('Error playing the song:', error);})

    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause"); 
   
}

const btn = document.getElementById("playbutton");
const icon = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressBar = document.getElementById("progressBar");
const durationSpan = document.getElementById("durationSpan");
const currentTimeSpan = document.getElementById("currentTime");

audio.addEventListener("loadedmetadata", () => {
  durationSpan.innerText = formatTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeSpan.innerText = formatTime(audio.currentTime);   
progressBar.value = Math.floor(audio.currentTime);
});

progressBar.addEventListener("input",()=>{  
    audio.currentTime=progressBar.value;


})

nextBtn.addEventListener("click", () => {
    console.log("Next button clicked");
    if (index >= songList.length - 1) {
        index = 0; // Reset to the first song if at the end of the list
    } else {
        index++; // Move to the next song
    }   

    playSong(songList[index])
    console.log(`Playing next song: ${songList[index].title} by ${songList[index].artist}`);
 
});
prevBtn.addEventListener("click",()=>
{
    console.log("Previous button clicked");
    if (index <= 0) {
        index = songList.length - 1; // Reset to the last song if at the beginning of the list
    } else {
        index--; // Move to the previous song
    }
    playSong(songList[index]);
    console.log(`Playing previous song: ${songList[index].title} by ${songList[index].artist}`);

}
)


 
audio.addEventListener("ended", () => {
  if (index >= songList.length-1) {
    index = 0;
  } else {
    index++;
  }
  playSong(songList[index]);
});
btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  } else {
    audio.pause();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  }
});





function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}