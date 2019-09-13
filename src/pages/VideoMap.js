import React, {useEffect, useState, useRef} from 'react';
import {parseGps} from "../util";
import { Map, Marker, Circle, TileLayer } from 'react-leaflet';
import YouTube from 'react-youtube';

let timer = null;

export default function VideoMap({match}) {
  const videoRef = useRef(null);
  const [notFound, setNotFound] = useState(false);

  const [meta, setMeta] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState([51.505, -0.09]);

  const [currentTime, setCurrentTime] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);

  const [duration, setDuration] = useState(0);
  
  useEffect(()=>{
    fetch(`/api/${match.params.id}.gpx`).then(e => {
      return e.text();
    }).then(body => {
      // coordinates
      const parsed = parseGps(body);

      // meta
      setMeta(parsed.meta);
      
       // coordinates
      setCoordinates(parsed.coordinates);
      setCenter([parsed.coordinates[0].lat, parsed.coordinates[0].lon])
    }).catch(e => {
      setNotFound(true);
    })
  }, [match.params.id]);

  const onStateChange = (e) => {
    setDuration(e.target.getDuration());
    switch(e.data) {
      case 1:
        //start time
        timer = setInterval(()=>{
          const curTime = parseInt(e.target.getCurrentTime());
          const newGpsTime = curTime - parseInt(meta.videoTime) + parseInt(meta.gpsTime);
          const curPos = coordinates.filter(entry => newGpsTime <= entry.time);
          setCurrentPosition(curPos[0]);
          setCenter(curPos[0]);
          setCurrentTime(curTime);
        },1000);
      break;
      default:
        clearInterval(timer)
    }
  }
  const jumpToTime = (position) => {
    const newCurTime = position.time - parseInt(meta.gpsTime) + parseInt(meta.videoTime);
    setCurrentPosition(position);
    setCenter(position);
    setCurrentTime(newCurTime);
    videoRef.current.internalPlayer.seekTo(newCurTime, true)
  }
  if(notFound) {
    return <div>404</div>
  }
  return (
    <div style={{display: "grid", height: "100%", gridTemplateColumns: "1fr 1fr"}}>
      <div>
        <YouTube
          ref={videoRef}
          videoId={match.params.id}  
          className="fullwidth"
          opts={{
            height: '390',
            width: '340'
          }}                
          onStateChange={onStateChange}
          onError={()=>setNotFound(true)}
        />
        <div style={{padding: "10px"}}>
          {meta.title && <p style={{fontWeight: "bold"}}>{meta.title}</p>}
          <p><strong>Derzeitige Zeit:</strong> {currentTime} Sekunden<br/>
          <strong>Derzeitige Position:</strong> {JSON.stringify(currentPosition)}<br/>
          <strong>GPS Punkte:</strong> {coordinates.length}<br/>
          <strong>Video Länge:</strong> {duration} Sekunden</p>
        </div>
      </div>
      <div>
        <Map center={center} zoom={16}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {currentPosition && <Marker position={{lat: currentPosition.lat, lon: currentPosition.lon}} />}
          {coordinates && coordinates.map(c => (
            <Circle key={c.time} center={{lat: c.lat, lon: c.lon}} radius={1} onClick={e => jumpToTime(c)} />
          ))}
        </Map>
      </div>
    </div>
  );
}
