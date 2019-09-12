export const parseGps = (body) => {
    let xmlDoc = null;
    if (window.DOMParser)
    {
        const parser = new DOMParser();
        xmlDoc= parser.parseFromString(body, "text/xml");
    }
    // meta
    const meta = {
      title: xmlDoc.getElementsByTagName("overalltitle")[0].childNodes[0].nodeValue,
      videoTime: xmlDoc.getElementsByTagName("videoTime")[0].childNodes[0].nodeValue,
      gpsTime: xmlDoc.getElementsByTagName("gpsTime")[0].childNodes[0].nodeValue
    };
    // coordinates
    const prepareCoordinates = Array.prototype.slice.call(xmlDoc.getElementsByTagName("trkpt")).map(entry => {
      const time = new Date(entry.getElementsByTagName('time')[0].childNodes[0].nodeValue);
      return{
        lat: entry.attributes['lat'].value,
        lon: entry.attributes['lon'].value,
        timestamp: entry.getElementsByTagName('time')[0].childNodes[0].nodeValue,
        time: time.getTime() / 1000
      };
    });
    return {meta: meta, coordinates: prepareCoordinates};
  }