import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/additional";
import { useLocation } from "react-router-dom";
import musicData from '/src/data.json';
import "./index.scss";
import { Play } from "../assets";


const Musician = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  const [musicDataState, setMusicDataState] = useState([]);
  
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedAudioName, setSelectedAudioName] = useState(null);

  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    document.title = `Rythmup - Musician`;

    setMusicDataState(musicData);

    if (user) {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    } else {
      dispatch(setLoading(true));
    }
  }, [location, user]);

  

  const playAudio = (audioPath) => {
    setSelectedAudio(audioPath);
    
  };

  const setName = (name) => {
    setSelectedAudioName(name);
  }

  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the audio file, e.g., send it to a server or process it.
    if (audioFile) {
      alert('Uploading audio file');
      // You can perform further actions here, like sending the file to a server.
    } else {
      alert('No audio file selected');
    }
  };

  return (
    <div className="account container">
      <h1>Hello {user?.name}</h1>
      <br />
      
      <div>
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Select an audio file to upload:</h3>
          <input type="file" accept="audio/*" onChange={handleFileChange} />
        </label>
          <br />
          <br />
        <button type="submit">Upload</button>
        </form>
        <br/>
        <h1>Your Uploaded Tracks</h1>
        <br/>
      <ul className="ull">
          {musicDataState.map((music, index) => (
            <div className="msc" onClick={() => { playAudio(music.fileUrl); setName(music.title)}}>
              <Play width={"16px"} height={"16px"} color={"red"}/>
              <h3 onClick={() => playAudio(music.fileUrl)}>{music.title}</h3>
              <p>{music.duration}</p>
            </div>
          
        ))}
      </ul>
      </div>
      
      {selectedAudio && (
        <div>
          <br/>
          <h3>Now playing: {selectedAudioName}</h3>
          <audio controls>
            <source src={selectedAudio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Musician;
